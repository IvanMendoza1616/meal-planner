import { describe, expect, it } from "vitest";
import validateForm from "./validateForm";

describe("validateForm()", () => {
  it("should return an object with the form data if all required fields are valid", () => {
    const requiredFields = ["name", "email", "address"];
    const formData = new FormData();
    formData.set("name", "Test Name");
    formData.set("email", "test@example.com");
    formData.set("address", "Test Street #10");
    const result = validateForm(formData, requiredFields);
    expect(result).toStrictEqual({
      name: "Test Name",
      email: "test@example.com",
      address: "Test Street #10",
    });
  });

  it("should return an object will all strings trimmed", () => {
    const requiredFields = ["name", "email", "address"];
    const formData = new FormData();
    formData.set("name", "   Test Name");
    formData.set("email", "test@example.com      ");
    formData.set("address", "Test Street #10");
    const result = validateForm(formData, requiredFields);
    expect(result).toStrictEqual({
      name: "Test Name",
      email: "test@example.com",
      address: "Test Street #10",
    });
  });

  it("should return null if any required field is missing", () => {
    const requiredFields = ["name", "email", "address"];
    const formData = new FormData();
    formData.set("email", "test@example.com");
    formData.set("address", "Test Street #10");
    const result = validateForm(formData, requiredFields);
    expect(result).toBeNull();
  });

  it("should return null if any required field is an empty string", () => {
    const requiredFields = ["name", "email", "address"];
    const formData = new FormData();
    formData.set("name", "");
    formData.set("email", "test@example.com");
    formData.set("address", "Test Street #10");
    const result = validateForm(formData, requiredFields);
    expect(result).toBeNull();
  });

  it("should return null if any required field is a string with just spaces", () => {
    const requiredFields = ["name", "email", "address"];
    const formData = new FormData();
    formData.set("name", "  ");
    formData.set("email", "test@example.com");
    formData.set("address", "Test Street #10");
    const result = validateForm(formData, requiredFields);
    expect(result).toBeNull();
  });
});
