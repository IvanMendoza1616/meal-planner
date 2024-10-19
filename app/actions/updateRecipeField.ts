"use server";
import { ObjectId } from "mongodb";
import client from "../lib/db";

export async function updateRecipeField(
  id: string,
  key: string,
  value: string,
) {
  await client
    .db("mealPlanner")
    .collection("recipes")
    .updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: { [key]: value } },
    );
}
