import { Recipe } from "@/app/types/Recipe";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Button from "../../../UI/Button";
import { categoryObjectSort } from "@/app/utils/sort/categoryObjectSort";

export type Servings = {
  [recipeId: string]: string;
};

type Props = {
  recipes: Recipe[];
  initialServings: Servings;
  calculateIngredients: (servings: Servings) => void;
};

export default function RecipesServings({
  recipes,
  initialServings,
  calculateIngredients,
}: Props) {
  const [servings, setServings] = useState(initialServings);

  const addServing = (recipeId: string) => {
    setServings((prevState) => ({
      ...prevState,
      [recipeId]: (+prevState[recipeId] + 1).toString(),
    }));
  };

  const substractServing = (recipeId: string) => {
    setServings((prevState) => ({
      ...prevState,
      [recipeId]:
        +prevState[recipeId] - 1 < 1
          ? "1"
          : (+prevState[recipeId] - 1).toString(),
    }));
  };

  const sortedRecipes = categoryObjectSort(recipes);

  if (recipes.length === 0) return <p>No tienes recetas seleccionadas</p>;

  return (
    <div className="flex flex-col gap-12">
      {Object.entries(sortedRecipes).map(([category, recipes]) => {
        if (recipes.length)
          return (
            <div key={category}>
              <h3 className="mb-4 text-2xl font-semibold">{category}s</h3>
              {
                <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-8">
                  {recipes.map((recipe) => (
                    <li
                      key={recipe._id.toString()}
                      className="flex flex-col justify-between overflow-hidden rounded-lg border pb-4"
                    >
                      <div>
                        <img
                          className="aspect-[4/3] w-full object-cover"
                          src={recipe.image}
                        />
                        <h3 className="px-4 py-2 text-lg font-semibold">
                          {recipe.name}
                        </h3>
                      </div>
                      <div className="flex flex-col gap-2 px-4 py-2">
                        <p>Porciones:</p>
                        <div className="flex gap-1">
                          <button
                            className="flex items-center justify-center rounded-md bg-primary px-2 text-white"
                            onClick={() => {
                              substractServing(recipe._id.toString());
                            }}
                          >
                            <MinusIcon className="h-5 w-5" />
                          </button>
                          <p className="w-10 rounded-md border py-1 text-center">
                            {servings[recipe._id.toString()]}
                          </p>

                          <button
                            className="flex items-center justify-center rounded-md bg-primary px-2 text-white"
                            onClick={() => {
                              addServing(recipe._id.toString());
                            }}
                          >
                            <PlusIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              }
            </div>
          );
      })}
      <div>
        <Button
          type="button"
          onClick={() => {
            calculateIngredients(servings);
          }}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
