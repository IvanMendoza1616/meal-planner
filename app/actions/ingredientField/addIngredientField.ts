"use server";
import { ObjectId } from "mongodb";
import client from "../../lib/db";
import { Ingredient, Recipe } from "../../types/Recipe";

export async function addIngredientField(
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
        $push: {
          ingredients: { ...ingredient },
        },
      },
    );
}
