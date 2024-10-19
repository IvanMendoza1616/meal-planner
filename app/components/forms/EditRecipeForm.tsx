"use client";
import Ingredients from "@/app/components/profile/recipes/edit-recipe/Ingredients";
import Button from "@/app/components/UI/Button";
import SelectInput from "@/app/components/UI/inputs/SelectInput";
import { Recipe } from "@/app/types/Recipe";
import { useState } from "react";
import EditRecipeInput from "./editRecipe/EditRecipeInput";
import { updateRecipeField } from "@/app/actions/updateRecipeField";
import { IngredientOption } from "@/app/types/IngredientOption";

type Props = {
  recipe: Recipe;
  ingredientOptions: IngredientOption[];
};

export default function EditRecipeForm({ recipe, ingredientOptions }: Props) {
  const [ingredients, setIngredients] = useState(recipe.ingredients);

  return (
    <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="aspect-square h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 flex h-1/2 w-full items-end justify-center bg-gradient-to-t from-[rgba(0,0,0,0.5)] pb-4">
          <Button type={"button"} variant="secondary">
            Cambiar imagen
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:col-span-2">
        <EditRecipeInput
          recipeId={recipe._id.toString()}
          label="Nombre"
          name="name"
          id="name"
          className="w-full"
          initialValue={recipe.name}
          required
        />
        <SelectInput
          label="Categoría"
          name={"category"}
          id={"category"}
          className="w-full sm:w-auto"
          defaultValue={recipe.category}
          onChange={(e) => {
            updateRecipeField(
              recipe._id.toString(),
              "category",
              e.target.value,
            );
            e.target.blur();
          }}
          required
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          <option value="desayuno">Desayuno</option>
          <option value="comida">Comida</option>
          <option value="cena">Cena</option>
          <option value="postre">Postre</option>
          <option value="bebida">Bebida</option>
        </SelectInput>
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-2">
          <EditRecipeInput
            recipeId={recipe._id.toString()}
            label="Porciones"
            name="servings"
            id="servings"
            type="number"
            initialValue={recipe.servings}
            required
          />
          <EditRecipeInput
            recipeId={recipe._id.toString()}
            label="Preparación (minutos)"
            name="preparationMinutes"
            id="preparationMinutes"
            type="number"
            initialValue={recipe.preparationMinutes}
            required
          />
        </div>
      </div>
      <div className="col-span-full flex flex-col gap-6">
        <Ingredients
          recipeId={recipe._id.toString()}
          ingredients={ingredients}
          setIngredients={setIngredients}
          ingredientOptions={ingredientOptions}
        />
        <EditRecipeInput
          recipeId={recipe._id.toString()}
          inputType="textArea"
          label={"Instrucciones"}
          placeholder={"Agrega los pasos para preparar la receta..."}
          name={"preparation"}
          id={"preparation"}
          initialValue={recipe.preparation}
        />
      </div>
    </div>
  );
}
