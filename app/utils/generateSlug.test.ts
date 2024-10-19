import { describe, expect, it } from "vitest";
import { generateSlug } from "./generateSlug";

describe("generateSlug()", () => {
  it("should create a slug", () => {
    const expectedResult = "test-slug";
    const result = generateSlug("Test Slug");
    expect(result).toBe(expectedResult);
  });

  it("should convert letters with accent to normal letters", () => {
    const expectedResult = "ivan-mendoza";
    const result = generateSlug("Iván Mendoza");
    expect(result).toBe(expectedResult);
  });

  it("should ignore special characters", () => {
    const expectedResult = "test-slug";
    const result = generateSlug("Test & Slug!");
    expect(result).toBe(expectedResult);
  });
});
