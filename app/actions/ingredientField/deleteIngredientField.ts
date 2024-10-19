"use server";
import client from "@/app/lib/db";
import { Ingredient, Recipe } from "@/app/types/Recipe";
import { ObjectId } from "mongodb";

export async function deleteIngredientField(
  recipeId: string,
  ingredient: Ingredient,
) {
  await client
    .db("mealPlanner")
    .collection<Recipe>("recipes")
    .updateOne(
      {
        _id: new ObjectId(recipeId),
      },
      {
        $pull: {
          ingredients: { id: ingredient.id },
        },
      },
    );
}
