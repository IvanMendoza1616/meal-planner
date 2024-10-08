type Ingredient = {
  name: string;
  unit: string;
  quantity: number;
};

export type Recipe = {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  ingredients: Ingredient[];
  preparation: string;
  servings: string;
  preparationMinutes: number;
  user: string;
  createdAt: Date;
};
