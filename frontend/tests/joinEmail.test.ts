import { describe, expect, it } from "vitest";
import { escapeHtml } from "@/lib/emailLayout";
import {
  buildJoinNotificationHtml,
  buildJoinNotificationText,
  type JoinPayload,
} from "@/lib/joinEmail";
import { ALLOWED_JOIN_ROLES, JOIN_ROLES, joinRoleLabel } from "@/lib/joinRoles";

const WHEN = new Date("2026-08-17T14:32:00Z");

const payload = (extra: Partial<JoinPayload> = {}): JoinPayload => ({
  fullName: "Ana Ribeiro",
  email: "ana@universidade.pt",
  employer: "Universidade de Lisboa",
  city: "Lisboa",
  country: "Portugal",
  mainRole: "academic",
  otherRole: "",
  ...extra,
});

describe("escapeHtml", () => {
  it("escapes every character that could break out of markup", () => {
    expect(escapeHtml(`<script>alert("x") & 'y'</script>`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;) &amp; &#39;y&#39;&lt;/script&gt;",
    );
  });

  it("escapes ampersands before the entities it introduces", () => {
    expect(escapeHtml("&lt;")).toBe("&amp;lt;");
  });

  it("leaves ordinary text alone", () => {
    expect(escapeHtml("Ana Ribeiro — Lisboa")).toBe("Ana Ribeiro — Lisboa");
  });
});

describe("buildJoinNotificationHtml", () => {
  it("includes every submitted value", () => {
    const html = buildJoinNotificationHtml(payload(), WHEN);
    expect(html).toContain("Ana Ribeiro");
    expect(html).toContain("ana@universidade.pt");
    expect(html).toContain("Universidade de Lisboa");
    expect(html).toContain("Lisboa, Portugal");
    expect(html).toContain("Academic");
    expect(html).toContain("2026-08-17 14:32 UTC");
  });

  /** The submitter controls every one of these fields. */
  it("escapes hostile input rather than emitting it as markup", () => {
    const html = buildJoinNotificationHtml(
      payload({
        fullName: "<script>alert(1)</script>",
        employer: '"><img src=x onerror=alert(1)>',
        otherRole: "O'Brien & sons",
        mainRole: "other",
      }),
      WHEN,
    );

    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("O&#39;Brien &amp; sons");
  });

  it("shows an em dash for fields left empty", () => {
    const html = buildJoinNotificationHtml(
      payload({ employer: "", city: "", country: "" }),
      WHEN,
    );
    expect(html).toContain("—");
  });

  it("appends the free-text role when the main role is 'other'", () => {
    const html = buildJoinNotificationHtml(
      payload({ mainRole: "other", otherRole: "Orthotics designer" }),
      WHEN,
    );
    expect(html).toContain("Orthotics designer");
  });

  it("produces a self-contained HTML document", () => {
    const html = buildJoinNotificationHtml(payload(), WHEN);
    expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
    expect(html).toContain("</html>");
  });

  /**
   * Email clients block remote content by default and Outlook drops modern
   * layout, so the template must not reintroduce either.
   */
  it("avoids layout and assets that email clients strip", () => {
    const html = buildJoinNotificationHtml(payload(), WHEN);
    expect(html).not.toMatch(/display:\s*flex/);
    expect(html).not.toMatch(/display:\s*grid/);
    expect(html).not.toMatch(/linear-gradient/);
    expect(html).not.toMatch(/<img[^>]+src="http/);
  });
});

describe("buildJoinNotificationText", () => {
  it("carries the same values as the HTML version", () => {
    const text = buildJoinNotificationText(payload(), WHEN);
    expect(text).toContain("Ana Ribeiro");
    expect(text).toContain("ana@universidade.pt");
    expect(text).toContain("Academic");
    expect(text).toContain("Lisboa, Portugal");
    expect(text).toContain("2026-08-17 14:32 UTC");
  });

  it("contains no markup", () => {
    expect(buildJoinNotificationText(payload(), WHEN)).not.toMatch(/<[a-z]/i);
  });
});

describe("joinRoles", () => {
  it("keeps the allow-list in step with the offered options", () => {
    expect([...ALLOWED_JOIN_ROLES].sort()).toEqual(
      JOIN_ROLES.map((r) => r.value).sort(),
    );
  });

  it("labels every known role", () => {
    expect(joinRoleLabel("academic")).toBe("Academic");
    expect(joinRoleLabel("clinician")).toBe("Clinician");
  });

  it("falls back to the raw value for anything unknown", () => {
    expect(joinRoleLabel("astronaut")).toBe("astronaut");
  });
});
