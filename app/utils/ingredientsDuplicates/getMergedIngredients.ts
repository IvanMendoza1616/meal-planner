import { Ingredient } from "@/app/types/Recipe";
import { roundDecimals } from "../roundDecimals";
import { ShoppingListCategory } from "@/app/types/ShoppingList";

export const getMergedIngredients = (shoppingList: ShoppingListCategory[]) => {
  const ingredientsArray = shoppingList.reduce<Ingredient[][]>(
    (acc, category) => {
      // Step 1: Group ingredients by name within the current category
      const ingredientGroups = category.ingredients.reduce<
        Record<string, Ingredient[]>
      >((groupAcc, ingredient) => {
        if (!groupAcc[ingredient.name]) {
          groupAcc[ingredient.name] = [];
        }
        groupAcc[ingredient.name].push(ingredient);
        return groupAcc;
      }, {});

      // Step 2: Filter groups that have more than one instance (duplicates) and add each group as a sub-array
      const duplicates = Object.values(ingredientGroups).filter(
        (group) => group.length > 1,
      );

      // Append each group of duplicates as a sub-array
      return acc.concat(duplicates);
    },
    [],
  );

  const result = ingredientsArray.reduce((acc, ingredientDuplicates) => {
    const unit = ingredientDuplicates[0].unit;

    const mergedIngredient = ingredientDuplicates.reduce((acc, ingredient) => {
      const newQuantity = roundDecimals(
        +acc.quantity +
          +ingredient.quantity *
            (ingredient.conversionValues[ingredient.unit] /
              ingredient.conversionValues[unit]),
      );
      return {
        ...acc,
        quantity: newQuantity.toString(),
      };
    });

    acc.push(mergedIngredient);
    return acc;
  }, []);

  return result;
};
