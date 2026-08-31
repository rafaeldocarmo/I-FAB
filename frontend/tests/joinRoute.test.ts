import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Resend and the Sanity write client are mocked, so these tests never send an
 * email or touch the dataset — the whole point is to exercise the route
 * without the side effects that make it awkward to test by hand.
 */
const sendMock = vi.fn();
const createMock = vi.fn();
const getWriteClientMock = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

vi.mock("@/sanity/writeClient", () => ({
  getWriteClient: () => getWriteClientMock(),
}));

const { POST } = await import("@/app/api/join/route");

const VALID = {
  fullName: "Ana Ribeiro",
  email: "ana@universidade.pt",
  employer: "Universidade de Lisboa",
  city: "Lisboa",
  country: "Portugal",
  mainRole: "Clinician",
  researchLine: "Foot kinematics",
  message: "Looking forward to the next congress.",
};

function post(body: unknown, contentType = "application/json") {
  return new Request("http://localhost/api/join", {
    method: "POST",
    headers: { "Content-Type": contentType },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("RESEND_API_KEY", "test-key");
  vi.stubEnv("RESEND_FROM_EMAIL", "i-FAB <noreply@ifabweb.org>");
  vi.stubEnv("JOIN_NOTIFICATION_TO", "board@ifabweb.org");
  vi.stubEnv("JOIN_NOTIFICATION_CC", "");
  vi.stubEnv("JOIN_NOTIFICATION_BCC", "");
  sendMock.mockResolvedValue({ error: null });
  createMock.mockResolvedValue({ _id: "doc" });
  getWriteClientMock.mockReturnValue({ create: createMock });
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("POST /api/join — rejected input", () => {
  it("rejects a non-JSON content type", async () => {
    const res = await POST(post(VALID, "text/plain"));
    expect(res.status).toBe(415);
    expect(sendMock).not.toHaveBeenCalled();
    expect(createMock).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    expect((await POST(post("{oops"))).status).toBe(400);
  });

  it.each([[[]], [null], ["\"a string\""]])("rejects a non-object body", async (body) => {
    expect((await POST(post(body))).status).toBe(400);
  });

  it.each(["fullName", "email", "mainRole"])("requires %s", async (field) => {
    const res = await POST(post({ ...VALID, [field]: "" }));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toMatchObject({ error: "Missing fields" });
  });

  it.each(["nope", "a@b", "@b.co", "a b@c.co"])("rejects the address %s", async (email) => {
    const res = await POST(post({ ...VALID, email }));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toMatchObject({ error: "Invalid email" });
  });

  it("accepts any non-empty role, now that it is free text", async () => {
    const res = await POST(post({ ...VALID, mainRole: "Biomechanics engineer" }));
    expect(res.status).toBe(200);
    expect(createMock.mock.calls[0][0].mainRole).toBe("Biomechanics engineer");
  });

  it("never sends or stores anything for rejected input", async () => {
    await POST(post({ ...VALID, email: "nope" }));
    await POST(post({ ...VALID, mainRole: "" }));
    expect(sendMock).not.toHaveBeenCalled();
    expect(createMock).not.toHaveBeenCalled();
  });
});

describe("POST /api/join — misconfiguration", () => {
  it.each(["RESEND_API_KEY", "RESEND_FROM_EMAIL", "JOIN_NOTIFICATION_TO"])(
    "reports not_configured when %s is missing",
    async (key) => {
      vi.stubEnv(key, "");
      const res = await POST(post(VALID));
      expect(res.status).toBe(503);
      await expect(res.json()).resolves.toMatchObject({ error: "not_configured" });
    },
  );

  it("refuses to exceed the Resend recipient cap", async () => {
    vi.stubEnv(
      "JOIN_NOTIFICATION_TO",
      Array.from({ length: 51 }, (_, i) => `p${i}@x.com`).join(","),
    );
    expect((await POST(post(VALID))).status).toBe(503);
    expect(sendMock).not.toHaveBeenCalled();
  });
});

describe("POST /api/join — accepted submission", () => {
  it("stores the submission and sends the notification", async () => {
    const res = await POST(post(VALID));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock.mock.calls[0][0]).toMatchObject({
      _type: "joinSubmission",
      fullName: "Ana Ribeiro",
      email: "ana@universidade.pt",
      mainRole: "Clinician",
      researchLine: "Foot kinematics",
      message: "Looking forward to the next congress.",
    });
    expect(createMock.mock.calls[0][0].submittedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);

    expect(sendMock).toHaveBeenCalledTimes(1);
    const sent = sendMock.mock.calls[0][0];
    expect(sent.to).toEqual(["board@ifabweb.org"]);
    expect(sent.replyTo).toBe("ana@universidade.pt");
    expect(sent.subject).toContain("Ana Ribeiro");
    expect(sent.html).toContain("Ana Ribeiro");
    expect(sent.text).toContain("Ana Ribeiro");
  });

  it("trims input and caps over-long fields", async () => {
    await POST(post({ ...VALID, fullName: `  ${"a".repeat(600)}  ` }));
    expect(createMock.mock.calls[0][0].fullName).toHaveLength(500);
  });

  it("gives the message a much larger cap than the single-line fields", async () => {
    await POST(post({ ...VALID, message: "m".repeat(6000) }));
    expect(createMock.mock.calls[0][0].message).toHaveLength(5000);
  });

  it("accepts a submission with no message", async () => {
    const res = await POST(post({ ...VALID, message: "" }));
    expect(res.status).toBe(200);
    expect(createMock.mock.calls[0][0].message).toBe("");
  });

  it("omits cc and bcc when they are not configured", async () => {
    await POST(post(VALID));
    expect(sendMock.mock.calls[0][0]).not.toHaveProperty("cc");
    expect(sendMock.mock.calls[0][0]).not.toHaveProperty("bcc");
  });

  it("passes cc and bcc through when configured", async () => {
    vi.stubEnv("JOIN_NOTIFICATION_CC", "cc@x.com, cc2@x.com");
    vi.stubEnv("JOIN_NOTIFICATION_BCC", "bcc@x.com");
    await POST(post(VALID));
    expect(sendMock.mock.calls[0][0].cc).toEqual(["cc@x.com", "cc2@x.com"]);
    expect(sendMock.mock.calls[0][0].bcc).toEqual(["bcc@x.com"]);
  });
});

describe("POST /api/join — degradation", () => {
  /** Persistence is best-effort: losing the Studio record must not lose the email. */
  it("still emails when the Sanity token is missing", async () => {
    getWriteClientMock.mockReturnValue(null);
    const res = await POST(post(VALID));
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("still emails when the Sanity write throws", async () => {
    createMock.mockRejectedValue(new Error("sanity down"));
    const res = await POST(post(VALID));
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("reports email_failed when Resend returns an error", async () => {
    sendMock.mockResolvedValue({ error: { message: "nope" } });
    const res = await POST(post(VALID));
    expect(res.status).toBe(502);
    await expect(res.json()).resolves.toMatchObject({ error: "email_failed" });
  });
});
