import { describe, expect, it } from "vitest";
import { toOrdinal } from "@/lib/ordinal";

describe("toOrdinal", () => {
  it.each([
    [1, "1st"],
    [2, "2nd"],
    [3, "3rd"],
    [4, "4th"],
    [10, "10th"],
  ])("formats %i as %s", (n, expected) => {
    expect(toOrdinal(n)).toBe(expected);
  });

  // The teens are the classic trap: 11/12/13 take "th", not "st"/"nd"/"rd".
  it.each([
    [11, "11th"],
    [12, "12th"],
    [13, "13th"],
    [111, "111th"],
    [112, "112th"],
    [113, "113th"],
  ])("formats the teen %i as %s", (n, expected) => {
    expect(toOrdinal(n)).toBe(expected);
  });

  it.each([
    [21, "21st"],
    [22, "22nd"],
    [23, "23rd"],
    [101, "101st"],
  ])("formats %i as %s past the teens", (n, expected) => {
    expect(toOrdinal(n)).toBe(expected);
  });

  it("handles zero", () => {
    expect(toOrdinal(0)).toBe("0th");
  });
});
