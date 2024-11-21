import { ObjectId } from "mongodb";
import { Ingredient } from "./Recipe";

export type ShoppingList = {
  _id: ObjectId | string;
  shoppingList: List[];
  extra: string[];
  user: string;
  createdAt: Date;
};

type List = {
  category: string;
  items: string[];
};

export type ShoppingListCategory = {
  category: string;
  ingredients: Ingredient[];
};
