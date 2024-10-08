import { it, expect, describe } from "vitest";
import { add } from "./math";

describe("add()", () => {
  it("should add all numbers inside array", () => {
    const numbers = [1, 2, 3];
    const result = add(numbers);
    const expectedResult = numbers.reduce(
      (prevValue, currValue) => prevValue + currValue,
      0
    );
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error if the array only has an element and is 0, [0]", () => {
    const numbers = [0];
    const resultFn = () => {
      add(numbers);
    };
    expect(resultFn).toThrow(/empty array/);
  });
});
