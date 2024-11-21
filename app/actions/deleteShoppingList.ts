"use server";
import { ObjectId } from "mongodb";
import client from "../lib/db";

export default async function createShoppingList(listId: string) {
  //Delete shopping list
  await client
    .db("mealPlanner")
    .collection("shoppingLists")
    .deleteOne({
      _id: new ObjectId(listId),
    });
}
