"use client";
import { useQueryParams } from "@/app/hooks/useQueryParams";
import RecipesGrid from "../../../recipes/RecipesGrid";
import Controls from "../../recipes/controls/Controls";
import { useState } from "react";
import { Recipe } from "@/app/types/Recipe";
import RecipesServings, { Servings } from "./RecipesServings";
import groupIngredients from "@/app/utils/shoppingList/groupIngredients";
import customSort from "@/app/utils/sort/customSort";
import IngredientDuplicates from "./steps/IngredientDuplicates";
import Steps from "./steps/Steps";
import { ShoppingListCategory } from "@/app/types/ShoppingList";
import createShoppingList from "@/app/actions/createShoppingList";
import scaleIngredients from "@/app/utils/shoppingList/scaleIngredients";
import { useRouter } from "next/navigation";

type Props = {
  user: string;
};

export default function CreateListSteps({ user }: Props) {
  const { queryParams, setQueryParams } = useQueryParams();
  const [recipesList, setRecipesList] = useState<Recipe[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingListCategory[]>([]);
  const [servings, setServings] = useState<Servings>({});
  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();

  const saveRecipesList = (recipes: Recipe[]) => {
    setRecipesList(recipes);
    const initialServings: Servings = {};
    for (const recipe of recipes) {
      initialServings[recipe._id.toString()] = recipe.servings;
    }
    setServings(initialServings);
    setCurrentStep(2);
  };

  const calculateIngredients = (servings: Servings) => {
    //Extract and scale ingredients from recipesList
    const scaledIngredients = scaleIngredients(recipesList, servings);

    //-------------------------------------------------------------------
    //NEED TO DIVIDE INTO TWO FUNCTIONS
    //-------------------------------------------------------------------

    //Group ingredients by category and sum quantities where name & unit match
    const groupedIngredients = groupIngredients(scaledIngredients);

    //Define the custom order for sorting categories
    const customOrder = ["Frutas y Verduras", "Carnes", "Lácteos"];

    //Sort the result based on the custom order
    const sortedIngredientsCategories = customSort(
      groupedIngredients,
      customOrder,
      "category",
    ) as ShoppingListCategory[];

    setShoppingList(sortedIngredientsCategories);
    setServings(servings);
    setCurrentStep(3);
  };

  const handleCreateShoppingList = async (
    shoppingList: ShoppingListCategory[],
  ) => {
    await createShoppingList(user, shoppingList);
    router.push("/profile/shopping-lists");
  };

  return (
    <div className="flex flex-col gap-4">
      <Steps step={currentStep} />
      {currentStep === 1 && (
        <>
          <div className="mb-12">
            <h1 className="text-2xl font-semibold">Nueva Lista</h1>
            <p className="text-gray-500">
              Selecciona las recetas con las que deseas hacer tu lista del
              super.
            </p>
          </div>
          <Controls queryParams={queryParams} setQueryParams={setQueryParams} />
          <RecipesGrid
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            recipesList={recipesList}
            saveRecipesList={saveRecipesList}
          />
        </>
      )}
      {currentStep === 2 && (
        <>
          <button
            type="button"
            className="self-start"
            onClick={() => {
              setCurrentStep(1);
            }}
          >
            Volver
          </button>
          <div className="mb-12">
            <h1 className="text-2xl font-semibold">Porciones</h1>
            <p className="text-gray-500">
              Modifica las porciones que necesites de tus recetas.
            </p>
          </div>
          <RecipesServings
            recipes={recipesList}
            initialServings={servings}
            calculateIngredients={calculateIngredients}
          />
        </>
      )}

      {currentStep === 3 && (
        <>
          <button
            type="button"
            className="self-start"
            onClick={() => {
              setCurrentStep(2);
            }}
          >
            Volver
          </button>
          <IngredientDuplicates
            shoppingList={shoppingList}
            createShoppingList={handleCreateShoppingList}
          />
        </>
      )}
    </div>
  );
}
