import { ObjectId } from "mongodb";

export type IngredientOption = {
  _id: ObjectId | string;
  name: string;
  category: string;
  units: string[];
  conversionValues: Record<string, number>;
};
