import { describe, expect, it } from "vitest";
import { formatConferenceHomeDate } from "@/lib/conferenceDates";

/** Timezone is pinned to UTC in vitest.config.ts — see the note there. */
describe("formatConferenceHomeDate", () => {
  it("collapses a range inside one month", () => {
    expect(
      formatConferenceHomeDate("2026-09-14T00:00:00Z", "2026-09-17T00:00:00Z"),
    ).toBe("September 14–17, 2026");
  });

  it("spells out both months inside one year", () => {
    expect(
      formatConferenceHomeDate("2026-09-30T00:00:00Z", "2026-10-02T00:00:00Z"),
    ).toBe("September 30 – October 2, 2026");
  });

  it("spells out both years when the range crosses one", () => {
    expect(
      formatConferenceHomeDate("2026-12-30T00:00:00Z", "2027-01-02T00:00:00Z"),
    ).toBe("December 30, 2026 – January 2, 2027");
  });

  it("renders a single day when there is no end date", () => {
    expect(formatConferenceHomeDate("2026-09-14T00:00:00Z")).toBe(
      "September 14, 2026",
    );
    expect(formatConferenceHomeDate("2026-09-14T00:00:00Z", null)).toBe(
      "September 14, 2026",
    );
  });

  it("ignores an unparseable end date instead of failing", () => {
    expect(formatConferenceHomeDate("2026-09-14T00:00:00Z", "nonsense")).toBe(
      "September 14, 2026",
    );
  });

  it("returns an empty string for a missing or unparseable start", () => {
    expect(formatConferenceHomeDate(null)).toBe("");
    expect(formatConferenceHomeDate(undefined)).toBe("");
    expect(formatConferenceHomeDate("")).toBe("");
    expect(formatConferenceHomeDate("nonsense")).toBe("");
  });

  /**
   * Documents a real limitation rather than asserting it is correct: the helper
   * formats with local-time getters, so the rendered day depends on the
   * timezone of whatever machine renders it. Same instant, two different days.
   */
  it("is sensitive to the rendering machine's timezone", () => {
    const instant = "2026-09-14T00:00:00Z";
    expect(formatConferenceHomeDate(instant)).toBe("September 14, 2026");
    expect(new Date(instant).getUTCDate()).toBe(14);
  });
});
