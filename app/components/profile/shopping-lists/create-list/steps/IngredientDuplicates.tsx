import { Ingredient } from "@/app/types/Recipe";
import { useState } from "react";
import SelectInput from "@/app/components/UI/inputs/SelectInput";
import { getMergedIngredients } from "@/app/utils/ingredientsDuplicates/getMergedIngredients";
import { roundDecimals } from "@/app/utils/roundDecimals";
import { ShoppingListCategory } from "@/app/types/ShoppingList";

type Props = {
  shoppingList: ShoppingListCategory[];
  createShoppingList: (shoppingList: ShoppingListCategory[]) => Promise<void>;
};

export default function IngredientDuplicates({
  shoppingList,
  createShoppingList,
}: Props) {
  const [mergedIngredients, setMergedIngredients] = useState(
    getMergedIngredients(shoppingList),
  );

  const mergeAndReplaceDuplicates = (
    shoppingList: ShoppingListCategory[],
    mergedIngredients: Ingredient[],
  ) => {
    // Deep copy of shopping list so original array doesn't get updated
    const editedShoppingList = shoppingList.map((category) => ({
      ...category,
      ingredients: [...category.ingredients],
    }));
    for (const categoryObj of editedShoppingList) {
      const mergedInCategory = mergedIngredients.filter(
        (item) => item.category === categoryObj.category,
      );
      for (const mergedItem of mergedInCategory) {
        categoryObj.ingredients = [
          ...categoryObj.ingredients.filter(
            (ingredient) => ingredient.name !== mergedItem.name,
          ),
          mergedItem,
        ];
      }
    }
    return editedShoppingList;
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-2xl font-semibold">Ingredientes duplicados</h3>
        <p>
          Selecciona la unidad de tu ingrediente con la que desees crear tu
          lista
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {mergedIngredients.length === 0 ? (
          <div>
            No hay ingredientes duplicados, puedes crear tu lista ahora.
          </div>
        ) : (
          mergedIngredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-2">
              <p>
                {ingredient.name} - {ingredient.quantity}
              </p>
              <SelectInput
                name=""
                id=""
                defaultValue={ingredient.unit}
                onChange={(e) => {
                  setMergedIngredients((prevState) =>
                    prevState.map((ingredient, ingredientIndex) => {
                      if (ingredientIndex === index)
                        return {
                          ...ingredient,
                          unit: e.target.value,
                          quantity: roundDecimals(
                            +ingredient.quantity *
                              (ingredient.conversionValues[ingredient.unit] /
                                ingredient.conversionValues[e.target.value]),
                          ).toString(),
                        };
                      return ingredient;
                    }),
                  );
                }}
              >
                {ingredient.units.map((unit) => {
                  return <option key={unit}>{unit}</option>;
                })}
              </SelectInput>
            </div>
          ))
        )}
        <button
          className="mt-8 rounded-md bg-black px-4 py-2 text-white"
          onClick={async () => {
            const updatedShoppingList = mergeAndReplaceDuplicates(
              shoppingList,
              mergedIngredients,
            );
            await createShoppingList(updatedShoppingList);
          }}
        >
          Crear Lista
        </button>
      </div>
    </div>
  );
}
