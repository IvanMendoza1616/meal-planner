"use server";
import { revalidatePath } from "next/cache";
import client from "../lib/db";
import { ShoppingListCategory } from "../types/ShoppingList";
import { stringToFraction } from "../utils/stringToFraction";
import { addPlural } from "../utils/textManipulation/addPlural";

export default async function createShoppingList(
  user: string,
  shoppingList: ShoppingListCategory[],
) {
  if (shoppingList.length === 0) return; //Do something if not all required fields are filled

  const formattedShoppingList = shoppingList.map((listCategory) => {
    const list = listCategory.ingredients.map(
      (ingredient) =>
        `${ingredient.name} - ${stringToFraction(ingredient.quantity)} ${ingredient.unit}${addPlural(ingredient.quantity)}`,
    );
    return { category: listCategory.category, items: list };
  });

  //Create shopping list
  await client.db("mealPlanner").collection("shoppingLists").insertOne({
    shoppingList: formattedShoppingList,
    extra: [],
    user,
    createdAt: new Date(),
  });
  revalidatePath("/profile/shopping-lists");
}
