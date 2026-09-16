import { describe, expect, it } from "vitest";

import {
  DEFAULT_PURPOSE,
  PURPOSES,
  PURPOSE_LABEL,
  parsePurpose,
  requiresMessage,
} from "@/lib/purpose";

describe("parsePurpose", () => {
  it.each(PURPOSES)("keeps the known purpose %s", (purpose) => {
    expect(parsePurpose(purpose)).toBe(purpose);
  });

  /**
   * The form is the only caller, but it posts JSON that anybody can craft.
   * Falling back beats rejecting: the rest of the submission is still good.
   */
  it.each([
    ["nonsense"],
    [""],
    [null],
    [undefined],
    [42],
    [{ purpose: "contact" }],
    [["contact"]],
    ["CONTACT"],
  ])("falls back to the default for %s", (raw) => {
    expect(parsePurpose(raw)).toBe(DEFAULT_PURPOSE);
  });

  it("defaults to membership interest, which is what the form was before", () => {
    expect(DEFAULT_PURPOSE).toBe("join");
  });
});

describe("requiresMessage", () => {
  it("requires a message when writing to the board", () => {
    expect(requiresMessage("contact")).toBe(true);
  });

  it("leaves the message optional for membership interest", () => {
    expect(requiresMessage("join")).toBe(false);
  });
});

describe("PURPOSE_LABEL", () => {
  it("labels every purpose the form can offer", () => {
    for (const purpose of PURPOSES) {
      expect(PURPOSE_LABEL[purpose]).toBeTruthy();
    }
  });
});
