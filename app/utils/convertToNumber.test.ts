import { describe, expect, it } from "vitest";
import convertToNumber from "./convertToNumber";

describe("convertToNumber()", () => {
  it("should return a string to number", () => {
    const expectedResult = 1;
    const result = convertToNumber("1");
    expect(result).toBe(expectedResult);
  });

  it("should return a decimal number", () => {
    const expectedResult = 0.8;
    const result = convertToNumber("0.8");
    expect(result).toBe(expectedResult);
  });

  it("should round a decimal number to two digits", () => {
    const expectedResult = 4.81;
    const result = convertToNumber("4.811111");
    expect(result).toBe(expectedResult);
  });

  it("should return a fraction to decimal number", () => {
    const expectedResult = 0.5;
    const result = convertToNumber("1/2");
    expect(result).toBe(expectedResult);
  });

  it("should return 0 if it is not a valid string to convert", () => {
    const result1 = convertToNumber("not a number");
    expect(result1).toBe(0);
    const result2 = convertToNumber("1//2");
    expect(result2).toBe(0);
    const result3 = convertToNumber("1/number");
    expect(result3).toBe(0);
    const result4 = convertToNumber("1/4/8");
    expect(result4).toBe(0);
    const result5 = convertToNumber("");
    expect(result5).toBe(0);
    const result6 = convertToNumber("1/");
    expect(result6).toBe(0);

    //Specific case hardcoded
    const result7 = convertToNumber("2.");
    expect(result7).toBe(0);
  });
});
