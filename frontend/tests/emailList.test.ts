import { describe, expect, it } from "vitest";
import { parseEmailList, RESEND_MAX_RECIPIENTS } from "@/lib/emailList";

describe("parseEmailList", () => {
  it("splits a comma-separated list and trims each entry", () => {
    expect(parseEmailList("a@x.com, b@y.com ,c@z.com")).toEqual([
      "a@x.com",
      "b@y.com",
      "c@z.com",
    ]);
  });

  it("returns an empty list for undefined, empty or whitespace input", () => {
    expect(parseEmailList(undefined)).toEqual([]);
    expect(parseEmailList("")).toEqual([]);
    expect(parseEmailList("   ")).toEqual([]);
  });

  it("drops empty entries from stray commas", () => {
    expect(parseEmailList("a@x.com,,b@y.com,")).toEqual(["a@x.com", "b@y.com"]);
  });

  it("keeps a single address", () => {
    expect(parseEmailList(" solo@x.com ")).toEqual(["solo@x.com"]);
  });

  it("matches the recipient cap the API routes enforce", () => {
    expect(RESEND_MAX_RECIPIENTS).toBe(50);
  });
});
