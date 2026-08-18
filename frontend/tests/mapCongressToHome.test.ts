import { describe, expect, it } from "vitest";
import {
  listUpcomingCongresses,
  mapCongressToHomeProps,
  pickUpcomingCongress,
} from "@/lib/mapCongressToHome";
import type { Congress } from "@/lib/types";

const NOW = new Date("2026-08-17T12:00:00Z");

function congress(
  _id: string,
  startDate: string | null,
  endDate?: string | null,
  extra: Partial<Congress> = {},
): Congress {
  return { _id, title: _id, startDate, endDate, ...extra } as Congress;
}

const PAST = congress("past", "2024-09-14T00:00:00Z", "2024-09-17T00:00:00Z");
const ONGOING = congress("ongoing", "2026-08-16T00:00:00Z", "2026-08-19T00:00:00Z");
const SOON = congress("soon", "2026-09-14T00:00:00Z", "2026-09-17T00:00:00Z");
const LATER = congress("later", "2028-09-14T00:00:00Z", "2028-09-17T00:00:00Z");

describe("listUpcomingCongresses", () => {
  it("returns every congress that has not finished, soonest first", () => {
    const ids = listUpcomingCongresses([LATER, PAST, SOON, ONGOING], NOW).map(
      (c) => c._id,
    );
    expect(ids).toEqual(["ongoing", "soon", "later"]);
  });

  /**
   * The regression this whole helper exists for: `past` used to be derived
   * independently as `startDate <= now`, so a second future congress belonged
   * to neither list and vanished from the Conferences page.
   */
  it("leaves no congress unaccounted for when several are in the future", () => {
    const all = [PAST, ONGOING, SOON, LATER];
    const upcoming = listUpcomingCongresses(all, NOW);
    const upcomingIds = new Set(upcoming.map((c) => c._id));
    const past = all.filter((c) => !upcomingIds.has(c._id));

    expect(upcoming.length + past.length).toBe(all.length);
    expect(past.map((c) => c._id)).toEqual(["past"]);
  });

  it("treats a congress in progress as upcoming, not past", () => {
    expect(listUpcomingCongresses([ONGOING], NOW).map((c) => c._id)).toEqual([
      "ongoing",
    ]);
  });

  it("falls back to startDate when there is no endDate", () => {
    const noEnd = congress("no-end", "2026-08-16T00:00:00Z");
    expect(listUpcomingCongresses([noEnd], NOW)).toEqual([]);

    const noEndFuture = congress("no-end-future", "2026-08-18T00:00:00Z");
    expect(listUpcomingCongresses([noEndFuture], NOW)).toHaveLength(1);
  });

  it("skips congresses with a missing or unparseable start date", () => {
    expect(
      listUpcomingCongresses(
        [congress("none", null), congress("junk", "not a date")],
        NOW,
      ),
    ).toEqual([]);
  });

  it("does not mutate the array it is given", () => {
    const all = [LATER, PAST, SOON];
    const before = all.map((c) => c._id);
    listUpcomingCongresses(all, NOW);
    expect(all.map((c) => c._id)).toEqual(before);
  });
});

describe("pickUpcomingCongress", () => {
  it("picks the soonest congress that has not finished", () => {
    expect(pickUpcomingCongress([LATER, SOON, ONGOING], NOW)?._id).toBe("ongoing");
  });

  it("returns null when everything is over", () => {
    expect(pickUpcomingCongress([PAST], NOW)).toBeNull();
  });

  it("returns null for an empty list", () => {
    expect(pickUpcomingCongress([], NOW)).toBeNull();
  });
});

describe("mapCongressToHomeProps", () => {
  it("builds location and date from the CMS fields", () => {
    const props = mapCongressToHomeProps(
      congress("c", "2026-09-14T00:00:00Z", "2026-09-17T00:00:00Z", {
        title: "12th i-FAB Congress",
        city: "Lisbon",
        country: "Portugal",
      }),
    );
    expect(props.name).toBe("12th i-FAB Congress");
    expect(props.location).toBe("Lisbon, Portugal");
    expect(props.date).toBe("September 14–17, 2026");
  });

  it("falls back to an em dash when location and date are missing", () => {
    const props = mapCongressToHomeProps(congress("c", null, null, { title: "X" }));
    expect(props.location).toBe("—");
    expect(props.date).toBe("—");
  });

  it("only forwards a non-empty trimmed description", () => {
    const blank = mapCongressToHomeProps(
      congress("c", "2026-09-14T00:00:00Z", null, { title: "X", description: "   " }),
    );
    expect(blank.description).toBeUndefined();

    const filled = mapCongressToHomeProps(
      congress("c", "2026-09-14T00:00:00Z", null, { title: "X", description: " hello " }),
    );
    expect(filled.description).toBe("hello");
  });
});
