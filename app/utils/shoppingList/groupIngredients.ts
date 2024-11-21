import { Ingredient } from "@/app/types/Recipe";
import sortAlphabetically from "../sort/sortAlphabetically";
import { roundDecimals } from "../roundDecimals";

export default function groupIngredients(ingredients: Ingredient[]) {
  //Group ingredients by category and sum quantities where name & unit match
  const groupedByCategory = ingredients.reduce<{
    [category: string]: { [key: string]: Ingredient };
  }>((acc, ingredient) => {
    const { category, name, unit } = ingredient;
    const key = `${name}-${unit}`;

    // Ensure category exists
    if (!acc[category]) {
      acc[category] = {};
    }

    // If ingredient with the same name and unit exists, sum the quantity
    if (!acc[category][key]) {
      acc[category][key] = { ...ingredient };
    } else {
      acc[category][key].quantity = roundDecimals(
        +acc[category][key].quantity + +ingredient.quantity,
      ).toString();
    }

    return acc;
  }, {});

  //Transform the grouped object into an array of categories with ingredients
  return Object.entries(groupedByCategory).map(([category, ingredients]) => ({
    category,
    ingredients: sortAlphabetically(
      Object.values(ingredients),
      "name",
    ) as Ingredient[],
  }));
}
