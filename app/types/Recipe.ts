import { ObjectId } from "mongodb";

export type Ingredient = {
  name: string;
  unit: string;
  quantity: string;
  category: string;
  id: number;
  units: string[];
  conversionValues: Record<string, number>;
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
