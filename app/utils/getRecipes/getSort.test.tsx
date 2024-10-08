import { describe, expect, it } from "vitest";
import getSort from "./getSort";

describe("getSort()", () => {
  it("should return selected sort object", () => {
    const queryParams = {
      search: null,
      page: "1",
      category: "null",
      sort: "oldest",
    };
    const expectedResult = { createdAt: 1 };
    const result = getSort(queryParams);
    expect(result).toStrictEqual(expectedResult);
  });

  it("should return the default sort object if no sort selected", () => {
    const queryParams = {
      search: null,
      page: "1",
      category: "null",
      sort: null,
    };
    const expectedResult = { createdAt: -1 };
    const result = getSort(queryParams);
    expect(result).toStrictEqual(expectedResult);
  });

  it("should return the default sort object if invalid sort", () => {
    const queryParams = {
      search: null,
      page: "1",
      category: "null",
      sort: "invalid-sort",
    };
    const expectedResult = { createdAt: -1 };
    const result = getSort(queryParams);
    expect(result).toStrictEqual(expectedResult);
  });
});
