"use server";
import { revalidatePath } from "next/cache";
import client from "../lib/db";
import validateForm from "./utils/validateForm";

export async function updateUserAction(
  prevState: { success: boolean; message: string; email: string },
  formData: FormData,
  dbClient = client
) {
  const requiredFields = validateForm(formData, ["name"]);

  if (!requiredFields)
    return {
      ...prevState,
      success: false,
      message: "Please add all required fields",
    };
  const response = await dbClient
    .db("mealPlanner")
    .collection("users")
    .updateOne(
      {
        email: prevState.email,
      },
      { $set: { ...requiredFields } }
    );
  if (response.modifiedCount === 0 && response.matchedCount === 0)
    return { ...prevState, success: false, message: "The user was not found" };
  revalidatePath("/profile/info");
  return {
    ...prevState,
    success: true,
    message: "Info updated successfully!",
  };
}
