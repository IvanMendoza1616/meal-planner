// Select.test.tsx
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import SelectInput from "./SelectInput";

describe("Select Component", () => {
  afterEach(cleanup);

  it("should render with label", () => {
    render(
      <SelectInput label="Test Label" name="test" id="test">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </SelectInput>
    );
    expect(screen.getByLabelText("Test Label")).toBeDefined();
  });

  it("should not render label when not provided", () => {
    render(
      <SelectInput name="test" id="test">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </SelectInput>
    );
    expect(screen.queryByLabelText("Test Label")).toBeFalsy();
  });

  it("should call onChange when the value changes", () => {
    const handleChange = vi.fn(); // Mock function
    render(
      <SelectInput name="test" id="test" onChange={handleChange}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </SelectInput>
    );
    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
    // Change the value of the select element, combobox is default for select inputs
    fireEvent.change(selectElement, { target: { value: "2" } });
    // Check if the mock function was called
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(selectElement.value).toBe("2");
  });

  it("should render with the correct initial value", () => {
    render(
      <SelectInput name="test" id="test" value="2">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </SelectInput>
    );
    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
    expect(selectElement.value).toBe("2");
  });

  it("should be required if the attribute has been added", () => {
    render(
      <SelectInput name="test" id="test" required>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </SelectInput>
    );
    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
    expect(selectElement.required).toBe(true);
  });
});
