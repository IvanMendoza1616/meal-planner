"use client";
import createRecipe from "@/app/actions/createRecipe";
import Ingredients from "@/app/components/profile/recipes/edit-recipe/Ingredients";
import Button from "@/app/components/UI/Button";
import SelectInput from "@/app/components/UI/inputs/SelectInput";
import TextAreaInput from "@/app/components/UI/inputs/TextAreaInput";
import TextInput from "@/app/components/UI/inputs/TextInput";
import { IngredientOption } from "@/app/types/IngredientOption";
import { Ingredient } from "@/app/types/Recipe";
import { useState } from "react";

type Props = {
  user: string;
  ingredientOptions: IngredientOption[];
};

export default function CreateRecipeForm({ user, ingredientOptions }: Props) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  return (
    <form
      action={(formData) => {
        createRecipe(formData, user, ingredients);
      }}
      className="mb-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-3"
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={"add image"}
          alt={"add image"}
          className="aspect-square h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 flex h-1/2 w-full items-end justify-center bg-gradient-to-t from-[rgba(0,0,0,0.5)] pb-4">
          <Button type={"button"} variant="secondary">
            Cambiar imagen
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:col-span-2">
        <TextInput label="Nombre" name="name" id="name" required />
        <SelectInput
          label="Categoría"
          name={"category"}
          id={"category"}
          className="w-full sm:w-auto"
          required
        >
          <option value=""></option>
          <option value="desayuno">Desayuno</option>
          <option value="comida">Comida</option>
          <option value="cena">Cena</option>
          <option value="postre">Postre</option>
          <option value="bebida">Bebida</option>
        </SelectInput>
        <div className="grid grid-cols-2 items-end gap-x-6">
          <TextInput
            label="Porciones"
            name="servings"
            id="servings"
            type="number"
            required
          />
          <TextInput
            label="Preparación (minutos)"
            name="preparation-minutes"
            id="preparation-minutes"
            type="number"
          />
        </div>
      </div>
      <div className="col-span-full flex flex-col gap-6">
        <Ingredients
          recipeId=""
          ingredients={ingredients}
          setIngredients={setIngredients}
          ingredientOptions={ingredientOptions}
        />
        <TextAreaInput
          label={"Instrucciones"}
          placeholder={"Agrega los pasos para preparar la receta..."}
          name={"preparation"}
          id={"preparation"}
          rows={4}
        />
        <div>
          <Button type="submit">Crear Receta</Button>
        </div>
      </div>
    </form>
  );
}
