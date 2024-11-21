import { Recipe } from "@/app/types/Recipe";
import Button from "../../../UI/Button";
import MealSortedRecipes from "./MealSortedRecipes";
import { useState } from "react";
import { addPlural } from "@/app/utils/textManipulation/addPlural";

type Props = {
  selectedRecipes: Recipe[];
  saveRecipesList: (recipes: Recipe[]) => void;
};

export default function RecipesList({
  selectedRecipes,
  saveRecipesList,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const content = (
    <div className="flex flex-col gap-4">
      <h2 className="text-nowrap text-xl font-semibold">
        Mis recetas seleccionadas:
      </h2>
      <MealSortedRecipes recipes={selectedRecipes} />
      <div className="mt-8 flex items-center gap-8">
        <Button
          type="button"
          onClick={() => {
            saveRecipesList(selectedRecipes);
          }}
          disabled={selectedRecipes.length === 0}
        >
          Continuar
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden rounded-lg bg-gray-100 p-6 md:block">
        {content}
      </div>
      <div className="block md:hidden">
        {isOpen ? (
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div
              className="absolute h-full w-full bg-black opacity-50"
              onClick={() => {
                setIsOpen(false);
              }}
            />
            <div className="relative max-h-[90vh] w-full overflow-y-scroll rounded-lg bg-white p-4 shadow-xl">
              {content}
            </div>
          </div>
        ) : (
          <div className="fixed bottom-0 left-0 flex w-full items-center justify-center border bg-white py-4">
            {selectedRecipes.length > 0 ? (
              <Button
                type="button"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Continuar con {selectedRecipes.length} receta
                {addPlural(selectedRecipes.length.toString())}
              </Button>
            ) : (
              <p>Selecciona una receta para continuar</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
