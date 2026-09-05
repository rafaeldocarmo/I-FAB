import { beforeEach, describe, expect, it, vi } from "vitest";

const verifyMock = vi.fn();
const forwardMock = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    webhooks = { verify: verifyMock };
    emails = { receiving: { forward: forwardMock } };
  },
}));

const { POST } = await import("@/app/api/inbound/route");

function post(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/inbound", {
    method: "POST",
    headers: {
      "svix-id": "msg_1",
      "svix-timestamp": "1755000000",
      "svix-signature": "v1,sig",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const RECEIVED = {
  type: "email.received",
  data: { email_id: "inb_1", from: "someone@university.edu" },
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("RESEND_WEBHOOK_SECRET", "whsec_test");
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("RESEND_FROM_EMAIL", "i-FAB <noreply@ifabweb.org>");
  vi.stubEnv("JOIN_NOTIFICATION_TO", "a@uw.edu, b@ior.it");
  vi.stubEnv("INBOUND_FORWARD_TO", "");
  verifyMock.mockReturnValue(RECEIVED);
  forwardMock.mockResolvedValue({ error: null });
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("POST /api/inbound", () => {
  it("forwards a received email to every configured mailbox", async () => {
    const res = await POST(post(RECEIVED));
    expect(res.status).toBe(200);
    expect(forwardMock).toHaveBeenCalledWith({
      emailId: "inb_1",
      to: ["a@uw.edu", "b@ior.it"],
      from: "i-FAB <noreply@ifabweb.org>",
    });
  });

  it("verifies the signature against the raw body, not a re-serialised copy", async () => {
    const raw = JSON.stringify(RECEIVED);
    await POST(post(raw));
    expect(verifyMock.mock.calls[0][0].payload).toBe(raw);
    expect(verifyMock.mock.calls[0][0].headers).toEqual({
      id: "msg_1",
      timestamp: "1755000000",
      signature: "v1,sig",
    });
  });

  /**
   * Regression: the route first read only `webhook-*`, the spelling the SDK
   * uses internally. Resend sends `svix-*`, so every real delivery arrived
   * with empty signing values and was rejected.
   */
  it("reads the svix-* headers Resend actually sends", async () => {
    await POST(post(RECEIVED));
    expect(verifyMock.mock.calls[0][0].headers).toEqual({
      id: "msg_1",
      timestamp: "1755000000",
      signature: "v1,sig",
    });
  });

  it("still accepts the standard webhook-* spelling", async () => {
    const req = new Request("http://localhost/api/inbound", {
      method: "POST",
      headers: {
        "webhook-id": "msg_2",
        "webhook-timestamp": "1755000001",
        "webhook-signature": "v1,other",
      },
      body: JSON.stringify(RECEIVED),
    });
    await POST(req);
    expect(verifyMock.mock.calls[0][0].headers).toEqual({
      id: "msg_2",
      timestamp: "1755000001",
      signature: "v1,other",
    });
  });

  it("rejects an unverified payload without forwarding", async () => {
    verifyMock.mockImplementation(() => {
      throw new Error("bad signature");
    });
    const res = await POST(post(RECEIVED));
    expect(res.status).toBe(401);
    expect(forwardMock).not.toHaveBeenCalled();
  });

  it("acknowledges other event types without forwarding", async () => {
    verifyMock.mockReturnValue({ type: "email.delivered", data: {} });
    const res = await POST(post({}));
    expect(res.status).toBe(200);
    expect(forwardMock).not.toHaveBeenCalled();
  });

  /** A bounce landing back here must not start an endless round trip. */
  it("ignores mail sent from our own domain", async () => {
    verifyMock.mockReturnValue({
      type: "email.received",
      data: { email_id: "inb_2", from: "noreply@ifabweb.org" },
    });
    const res = await POST(post({}));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ ignored: "loop_guard" });
    expect(forwardMock).not.toHaveBeenCalled();
  });

  it("prefers INBOUND_FORWARD_TO when it is set", async () => {
    vi.stubEnv("INBOUND_FORWARD_TO", "privacy@ifabweb.org");
    await POST(post(RECEIVED));
    expect(forwardMock.mock.calls[0][0].to).toEqual(["privacy@ifabweb.org"]);
  });

  it("reports not_configured only when both recipient lists are empty", async () => {
    vi.stubEnv("JOIN_NOTIFICATION_TO", "");
    expect((await POST(post(RECEIVED))).status).toBe(503);
    expect(forwardMock).not.toHaveBeenCalled();
  });

  it.each(["RESEND_WEBHOOK_SECRET", "RESEND_API_KEY", "RESEND_FROM_EMAIL"])(
    "reports not_configured when %s is missing",
    async (key) => {
      vi.stubEnv(key, "");
      const res = await POST(post(RECEIVED));
      expect(res.status).toBe(503);
      expect(forwardMock).not.toHaveBeenCalled();
    },
  );

  /** Non-2xx is how Resend is told to try again. */
  it("asks for a retry when forwarding fails", async () => {
    forwardMock.mockResolvedValue({ error: { message: "upstream" } });
    expect((await POST(post(RECEIVED))).status).toBe(500);

    forwardMock.mockRejectedValue(new Error("network"));
    expect((await POST(post(RECEIVED))).status).toBe(500);
  });
});
