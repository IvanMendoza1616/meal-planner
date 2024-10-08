import { describe, expect, it } from "vitest";
import { parseQueryParams } from "./parseQueryParams";
import { QueryParams } from "@/app/types/QueryParams";

describe("parseQueryParams()", () => {
  it("should return the searchParams as a valid object", () => {
    const searchParams = {
      search: "test",
      page: "1",
      category: "test-category",
      sort: "newest",
    };
    const expectedObject: QueryParams = {
      search: "test",
      page: "1",
      category: "test-category",
      sort: "newest",
    };
    const queryParams = new URLSearchParams(searchParams);
    const result = parseQueryParams(queryParams);
    expect(result).toStrictEqual(expectedObject);
  });

  it("should return an object with missing properties as null", () => {
    const searchParams = { search: "test", page: "1" };
    const expectedObject: QueryParams = {
      search: "test",
      page: "1",
      category: null,
      sort: null,
    };
    const queryParams = new URLSearchParams(searchParams);
    const result = parseQueryParams(queryParams);
    expect(result).toStrictEqual(expectedObject);
  });

  it("should return an object with only null properties", () => {
    const expectedObject: QueryParams = {
      search: null,
      page: null,
      category: null,
      sort: null,
    };
    const queryParams = new URLSearchParams();
    const result = parseQueryParams(queryParams);
    expect(result).toStrictEqual(expectedObject);
  });

  it("should ignore params not defined on the params list", () => {
    const searchParams = {
      search: "test",
      page: "1",
      newProperty: "test",
    };
    const expectedObject: QueryParams = {
      search: "test",
      page: "1",
      category: null,
      sort: null,
    };
    const queryParams = new URLSearchParams(searchParams);
    const result = parseQueryParams(queryParams);
    expect(result).toStrictEqual(expectedObject);
  });
});
