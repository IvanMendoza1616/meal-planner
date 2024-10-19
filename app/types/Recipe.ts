import { ObjectId } from "mongodb";

export type Ingredient = {
  name: string;
  unit: string;
  quantity: string;
  category: string;
  id: number;
};

export type Recipe = {
  _id: ObjectId | string;
  name: string;
  slug: string;
  image: string;
  category: string;
  ingredients: Ingredient[];
  preparation: string;
  servings: string;
  preparationMinutes: string;
  user: string;
  createdAt: Date;
};
