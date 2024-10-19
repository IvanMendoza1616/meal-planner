"use server";
import { ObjectId } from "mongodb";
import client from "../../lib/db";
import { Ingredient } from "../../types/Recipe";

export async function updateIngredientField(
  recipeId: string,
  ingredient: Ingredient,
) {
  await client
    .db("mealPlanner")
    .collection("recipes")
    .updateOne(
      {
        _id: new ObjectId(recipeId),
        "ingredients.id": ingredient.id,
      },
      {
        $set: {
          "ingredients.$.name": ingredient.name,
          "ingredients.$.quantity": ingredient.quantity,
          "ingredients.$.unit": ingredient.unit,
          "ingredients.$.category": ingredient.category,
        },
      },
    );
}
