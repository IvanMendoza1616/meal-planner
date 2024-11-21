import { categories } from "@/app/types/MealCategory";
import { Recipe } from "@/app/types/Recipe";

export const categoryObjectSort = (recipes: Recipe[]) => {
  return recipes.reduce(
    (acc, recipe) => {
      acc[recipe.category as keyof typeof acc] = [
        ...(acc[recipe.category as keyof typeof acc] || []),
        recipe,
      ];
      return acc;
    },
    //Determines order of meal type
    categories.reduce(
      (acc, category) => {
        acc[category] = [] as Recipe[];
        return acc;
      },
      {} as Record<string, Recipe[]>,
    ),
  );
};
