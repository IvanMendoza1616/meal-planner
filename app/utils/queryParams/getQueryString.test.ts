import { describe, expect, it } from "vitest";
import getQueryString from "./getQueryString";

describe("getQueryString().fromURL()", () => {
  it("should return the searchParams as string", () => {
    const queryParams = new URLSearchParams({ search: "test", page: "1" });
    const updatedParams = {};
    const expectedResult = "search=test&page=1";
    const result = getQueryString().fromURLSearchParams(
      queryParams,
      updatedParams
    );
    expect(result).toBe(expectedResult);
  });

  it("should return the searchParams as string with a new param", () => {
    const queryParams = new URLSearchParams({ search: "test", page: "1" });
    const updatedParams = { category: "test-category" };
    const expectedResult = "search=test&page=1&category=test-category";
    const result = getQueryString().fromURLSearchParams(
      queryParams,
      updatedParams
    );
    expect(result).toBe(expectedResult);
  });

  it("should return the trimmed params", () => {
    const queryParams = new URLSearchParams({
      search: "  test  ",
      page: "1",
    });
    const updatedParams = {
      category: " test-category  ",
    };
    const expectedResult = "search=test&page=1&category=test-category";
    const result = getQueryString().fromURLSearchParams(
      queryParams,
      updatedParams
    );
    expect(result).toBe(expectedResult);
  });

  it("should return the searchParams with the updated param", () => {
    const queryParams = new URLSearchParams({ search: "test", page: "1" });
    const updatedParams = {
      page: "2",
    };
    const expectedResult = "search=test&page=2";
    const result = getQueryString().fromURLSearchParams(
      queryParams,
      updatedParams
    );
    expect(result).toBe(expectedResult);
  });

  it("should not consider properties that are not on params", () => {
    const queryParams = new URLSearchParams({ search: "test", page: "1" });
    const updatedParams = {
      unknownProperty: "test-property",
      category: "test-category",
    };
    const expectedResult = "search=test&page=1&category=test-category";
    const result = getQueryString().fromURLSearchParams(
      queryParams,
      updatedParams
    );
    expect(result).toBe(expectedResult);
  });

  it("should not consider empty properties", () => {
    const queryParams = new URLSearchParams({ search: "test", page: "1" });
    const updatedParams = {
      search: "   ",
      category: "",
      sort: null,
    };
    const expectedResult = "page=1";
    const result = getQueryString().fromURLSearchParams(
      queryParams,
      updatedParams
    );
    expect(result).toBe(expectedResult);
  });
});

describe("getQueryString().fromObject()", () => {
  it("should return the queryParams as string", () => {
    const queryParams = {
      search: "test",
      page: "1",
      category: "test-category",
      sort: "newest",
    };
    const expectedResult =
      "search=test&page=1&category=test-category&sort=newest";
    const result = getQueryString().fromObject(queryParams);
    expect(result).toBe(expectedResult);
  });

  it("should return the trimmed properties", () => {
    const queryParams = {
      search: "  test  ",
      page: "1",
      category: null,
      sort: "",
    };
    const expectedResult = "search=test&page=1";
    const result = getQueryString().fromObject(queryParams);
    expect(result).toBe(expectedResult);
  });

  it("should not consider empty properties", () => {
    const queryParams = {
      search: "     ",
      page: "1",
      category: null,
      sort: "",
    };
    const expectedResult = "page=1";
    const result = getQueryString().fromObject(queryParams);
    expect(result).toBe(expectedResult);
  });
});
