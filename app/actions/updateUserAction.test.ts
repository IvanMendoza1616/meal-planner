import { MongoClient } from "mongodb";
import { it, expect, describe, vi } from "vitest";
import { updateUserAction } from "./updateUserAction";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(), // Mock revalidatePath
}));

describe("updateUserAction()", () => {
  it("should update user successfully", async () => {
    const client = new MongoClient(globalThis.__MONGO_URI__);
    await client.connect();
    const db = client.db("mealPlanner");

    // Insert a test user
    await db
      .collection("users")
      .insertOne({ email: "test@example.com", name: "Old Name" });

    const formData = new FormData(); // No name field
    formData.set("name", "Updated Name");
    const prevState = {
      success: false,
      message: "",
      email: "test@example.com",
    };

    const result = await updateUserAction(prevState, formData, client);
    expect(result.success).toBe(true);
    expect(result.message).toBe("Info updated successfully!");

    // Verify the user was updated
    const updatedUser = await db
      .collection("users")
      .findOne({ email: "test@example.com" });
    expect(updatedUser).toHaveProperty("name", "Updated Name");
    await client.close(); // Close the client after the test
  });

  it("should return error if name not in formData", async () => {
    const client = new MongoClient(globalThis.__MONGO_URI__);
    await client.connect();

    const formData = new FormData(); // No name field
    const prevState = {
      success: false,
      message: "",
      email: "",
    };
    const result = await updateUserAction(prevState, formData, client);
    expect(result.success).toBe(false);
    expect(result.message).toBe("Please add all required fields");
    await client.close();
  });

  it("should return error if user not in database", async () => {
    const client = new MongoClient(globalThis.__MONGO_URI__);
    await client.connect();
    const db = client.db("mealPlanner");

    // Insert a test user
    await db
      .collection("users")
      .insertOne({ email: "test@example.com", name: "Test Name" });

    const formData = new FormData();
    formData.set("name", "Test Name");
    const prevState = {
      success: false,
      message: "",
      email: "nouser@example.com",
    };
    const result = await updateUserAction(prevState, formData, client);
    expect(result.success).toBe(false);
    expect(result.message).toBe("The user was not found");
    await client.close();
  });
});
