import { beforeEach, describe, expect, it, vi } from "vitest";
import { useQueryParams } from "./useQueryParams";
import { renderHook, act } from "@testing-library/react";
import { useRouter } from "next/navigation";

// Mock Next.js hooks using Vitest's `vi`
vi.mock("next/navigation", () => ({
  /*
  useRouter: vi.fn(() => ({
    replace: vi.fn(),
  })),
  */
  useRouter: vi.fn().mockReturnValue({ replace: vi.fn() }),
  usePathname: vi.fn().mockReturnValue("/current-path"),
  useSearchParams: vi.fn().mockReturnValue(
    new URLSearchParams({
      search: "test",
      page: "1",
    })
  ),
}));

describe("useQueryParams()", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  it("should return the current query parameters", () => {
    const { result } = renderHook(() => useQueryParams());
    const queryParams = result.current.queryParams;
    expect(queryParams.search).toEqual("test");
    expect(queryParams.page).toEqual("1");
  });

  it("should update the current query parameters", () => {
    const expectedUrl = "/current-path?search=new-search&page=2";
    const { result } = renderHook(() => useQueryParams());
    act(() => {
      const queryUrl = result.current.setQueryParams({
        search: "new-search",
        page: "2",
      });
      expect(queryUrl).toBe(expectedUrl);
    });
    expect(useRouter().replace).toHaveBeenCalledWith(expectedUrl);
  });

  it("should add a new query parameter", () => {
    const expectedUrl =
      "/current-path?search=test&page=1&category=test-category";
    const { result } = renderHook(() => useQueryParams());
    act(() => {
      const queryUrl = result.current.setQueryParams({
        category: "test-category",
      });
      expect(queryUrl).toBe(expectedUrl);
    });
    expect(useRouter().replace).toHaveBeenCalledWith(expectedUrl);
  });

  it("should remove a query parameter when its value is empty", () => {
    const expectedUrl = "/current-path?page=1";
    const { result } = renderHook(() => useQueryParams());
    act(() => {
      const queryUrl = result.current.setQueryParams({
        search: "",
        page: "1",
      });
      expect(queryUrl).toBe(expectedUrl);
    });
    expect(useRouter().replace).toHaveBeenCalledWith(expectedUrl);
  });

  it("should return no query params if all params are empty", () => {
    const expectedUrl = "/current-path";
    const { result } = renderHook(() => useQueryParams());
    act(() => {
      const queryUrl = result.current.setQueryParams({
        search: "",
        page: "",
      });
      expect(queryUrl).toBe(expectedUrl);
    });
    expect(useRouter().replace).toHaveBeenCalledWith(expectedUrl);
    expect(useRouter().replace).toBeCalledTimes(1);
  });
});
