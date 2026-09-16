import { beforeEach, describe, expect, it, vi } from "vitest";

import { RETENTION_YEARS, retentionCutoff } from "@/lib/retention";

/**
 * The Sanity write client is mocked, so nothing here can delete a real
 * submission — which is exactly the behaviour that is hardest to test by hand
 * and worst to get wrong.
 */
const fetchMock = vi.fn();
const deleteMock = vi.fn();
const commitMock = vi.fn();
const getWriteClientMock = vi.fn();

vi.mock("@/sanity/writeClient", () => ({
  getWriteClient: () => getWriteClientMock(),
}));

const { POST } = await import("@/app/api/retention/route");

const SECRET = "s3cret-value";

function post(
  { secret, dryRun }: { secret?: string; dryRun?: boolean } = { secret: SECRET },
) {
  return new Request(
    `http://localhost/api/retention${dryRun ? "?dryRun=1" : ""}`,
    {
      method: "POST",
      headers: secret ? { Authorization: `Bearer ${secret}` } : {},
    },
  );
}

/** A transaction whose `delete` chains, like the real client's. */
function transaction() {
  const tx = { delete: deleteMock, commit: commitMock };
  deleteMock.mockReturnValue(tx);
  return tx;
}

/** The query projects `{ _id }`, so the client returns documents, not ids. */
function rows(...ids: string[]) {
  return ids.map((_id) => ({ _id }));
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("RETENTION_SECRET", SECRET);
  commitMock.mockResolvedValue({});
  fetchMock.mockResolvedValue([]);
  getWriteClientMock.mockReturnValue({
    fetch: fetchMock,
    transaction: () => transaction(),
  });
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "info").mockImplementation(() => {});
});

describe("POST /api/retention", () => {
  it("deletes every submission the query returns as expired", async () => {
    fetchMock.mockResolvedValue(rows("sub_1", "sub_2", "sub_3"));

    const res = await POST(post());

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({
      ok: true,
      deleted: 3,
      more: false,
      retentionYears: RETENTION_YEARS,
    });
    expect(deleteMock.mock.calls.map(([id]) => id)).toEqual([
      "sub_1",
      "sub_2",
      "sub_3",
    ]);
    expect(commitMock).toHaveBeenCalledOnce();
  });

  it("asks for submissions older than the published retention period", async () => {
    await POST(post());

    const [, params] = fetchMock.mock.calls[0];
    const asked = new Date(params.cutoff).getTime();
    const expected = retentionCutoff().getTime();
    // Allow for the clock moving between the call and the assertion.
    expect(Math.abs(asked - expected)).toBeLessThan(5_000);
  });

  it("commits nothing when there is nothing expired", async () => {
    fetchMock.mockResolvedValue([]);

    const res = await POST(post());

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ ok: true, deleted: 0 });
    expect(commitMock).not.toHaveBeenCalled();
  });

  it("reports more work when a run fills the per-run cap", async () => {
    fetchMock.mockResolvedValue(
      rows(...Array.from({ length: 100 }, (_, i) => `sub_${i}`)),
    );

    const res = await POST(post());

    await expect(res.json()).resolves.toMatchObject({ deleted: 100, more: true });
    // The cap has to reach Sanity, or the transaction grows without bound.
    expect(fetchMock.mock.calls[0][0]).toContain("[0...100]");
  });

  it("deletes nothing on a dry run, but still reports what is due", async () => {
    fetchMock.mockResolvedValue(rows("sub_1", "sub_2"));

    const res = await POST(post({ secret: SECRET, dryRun: true }));

    await expect(res.json()).resolves.toMatchObject({
      ok: true,
      dryRun: true,
      due: 2,
    });
    expect(deleteMock).not.toHaveBeenCalled();
    expect(commitMock).not.toHaveBeenCalled();
  });

  it("rejects a call with the wrong secret, without querying anything", async () => {
    const res = await POST(post({ secret: "not-the-secret" }));

    expect(res.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a call with no Authorization header", async () => {
    const res = await POST(post({}));

    expect(res.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("refuses to run when no secret is configured, rather than running open", async () => {
    vi.stubEnv("RETENTION_SECRET", "");

    const res = await POST(post());

    expect(res.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reports a failure when the write token is missing", async () => {
    getWriteClientMock.mockReturnValue(null);

    const res = await POST(post());

    expect(res.status).toBe(503);
    await expect(res.json()).resolves.toMatchObject({ error: "not_configured" });
  });

  /**
   * A failed sweep has to go red: the cron run is the only thing watching, and
   * a 200 would tell it the promise in the Privacy Policy was kept.
   */
  it("fails loudly when the delete transaction throws", async () => {
    fetchMock.mockResolvedValue(rows("sub_1"));
    commitMock.mockRejectedValue(new Error("network"));

    const res = await POST(post());

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toMatchObject({ error: "delete_failed" });
  });

  it("fails loudly when the query throws", async () => {
    fetchMock.mockRejectedValue(new Error("network"));

    const res = await POST(post());

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toMatchObject({ error: "query_failed" });
  });
});

describe("retentionCutoff", () => {
  it("goes back four calendar years", () => {
    expect(retentionCutoff(new Date("2026-09-16T12:00:00Z")).toISOString()).toBe(
      "2022-09-16T12:00:00.000Z",
    );
  });

  /**
   * Calendar arithmetic, not 4 × 365 days: a fixed day count would land on
   * 29 February + 1 and shave a day off the period the policy promises.
   */
  it("does not drift across leap years", () => {
    const cutoff = retentionCutoff(new Date("2028-02-29T00:00:00Z"));
    expect(cutoff.toISOString()).toBe("2024-02-29T00:00:00.000Z");
  });

  it("leaves the caller's date untouched", () => {
    const now = new Date("2026-09-16T12:00:00Z");
    retentionCutoff(now);
    expect(now.toISOString()).toBe("2026-09-16T12:00:00.000Z");
  });
});
