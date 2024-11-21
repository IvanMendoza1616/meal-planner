import { Servings } from "@/app/components/profile/shopping-lists/create-list/RecipesServings";
import { Recipe } from "@/app/types/Recipe";
import convertToNumber from "../convertToNumber";
import { roundDecimals } from "../roundDecimals";

export default function scaleIngredients(
  recipesList: Recipe[],
  servings: Servings,
) {
  return recipesList
    .map((recipe) => {
      const scale = +servings[recipe._id.toString()] / +recipe.servings;
      const ingredients = recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        quantity: roundDecimals(
          convertToNumber(ingredient.quantity) * scale,
        ).toString(),
      }));
      return ingredients;
    })
    .flat();
}
