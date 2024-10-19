import { beforeEach } from "node:test";
import { describe, expect, it, vi } from "vitest";
import validateInput from "./validateInput";
import { RefObject } from "react";

describe("validateInput()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should validate string fraction", () => {
    const inputRef = {
      current: {
        value: "2/3",
        setCustomValidity: vi.fn(),
        reportValidity: vi.fn(),
      },
    } as unknown as RefObject<HTMLInputElement>;
    const result = validateInput(inputRef, "quantity");
    expect(result).toBe(true);
    expect(inputRef.current!.setCustomValidity).not.toHaveBeenCalled();
  });

  it("should validate string input", () => {
    const inputRef = {
      current: {
        value: "test string",
        setCustomValidity: vi.fn(),
        reportValidity: vi.fn(),
      },
    } as unknown as RefObject<HTMLInputElement>;
    const result = validateInput(inputRef, "string");
    expect(result).toBe(true);
    expect(inputRef.current!.setCustomValidity).not.toHaveBeenCalled();
  });

  it("should not validate empty string", () => {
    const inputRef = {
      current: {
        value: "",
        setCustomValidity: vi.fn(),
        reportValidity: vi.fn(),
      },
    } as unknown as RefObject<HTMLInputElement>;
    const result1 = validateInput(inputRef, "string");
    expect(result1).toBe(false);
    const result2 = validateInput(inputRef, "quantity");
    expect(result2).toBe(false);
    expect(inputRef.current!.setCustomValidity).toHaveBeenCalledTimes(2);
  });

  it("should not validate non-quantity string when type is quantity", () => {
    const inputRef = {
      current: {
        value: "test string",
        setCustomValidity: vi.fn(),
        reportValidity: vi.fn(),
      },
    } as unknown as RefObject<HTMLInputElement>;
    const result = validateInput(inputRef, "quantity");
    expect(result).toBe(false);
    expect(inputRef.current!.setCustomValidity).toHaveBeenCalledTimes(1);
  });
});
