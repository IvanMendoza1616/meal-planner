"use client";
import { Dispatch, SetStateAction, useState } from "react";
//import AddIngredient from "./ingredients/AddIngredient";
//import EditIngredient from "./ingredients/EditIngredient";
import IngredientElement from "./ingredients/IngredientElement";
import { Ingredient } from "@/app/types/Recipe";
import DeleteIngredient from "./ingredients/DeleteIngredient";
//import { updateIngredientField } from "@/app/actions/ingredientField/updateIngredientField";
import { deleteIngredientField } from "@/app/actions/ingredientField/deleteIngredientField";
//import { addIngredientField } from "@/app/actions/ingredientField/addIngredientField";
import { IngredientOption } from "@/app/types/IngredientOption";
import IngredientForm from "./ingredients/IngredientForm";

type Props = {
  recipeId: string;
  ingredients: Ingredient[];
  setIngredients: Dispatch<SetStateAction<Ingredient[]>>;
  ingredientOptions: IngredientOption[];
};

export default function Ingredients({
  recipeId,
  ingredients,
  setIngredients,
  ingredientOptions,
}: Props) {
  const [editingId, setEditingId] = useState(0);
  const [deletingId, setDeletingId] = useState(0);

  return (
    <div>
      <p className="col-span-full mb-1 font-semibold">Ingredientes</p>
      <div className="grid grid-cols-1 flex-col gap-6">
        <div className="flex flex-col gap-3">
          {ingredients.map((ingredient) =>
            editingId === ingredient.id ? (
              /*
                 <EditIngredient
                key={ingredient.id}
                recipeId={recipeId}
                setEditingId={setEditingId}
                ingredient={ingredient}
                setIngredients={setIngredients}
                updateIngredientField={updateIngredientField}
                ingredientOptions={ingredientOptions}
              />
                */
              <IngredientForm
                key={ingredient.id}
                recipeId={recipeId}
                setIngredients={setIngredients}
                ingredientOptions={ingredientOptions}
                setEditingId={setEditingId}
                ingredient={ingredient}
              />
            ) : deletingId === ingredient.id ? (
              <DeleteIngredient
                key={ingredient.id}
                recipeId={recipeId}
                ingredient={ingredient}
                setDeletingId={setDeletingId}
                setIngredients={setIngredients}
                deleteIngredientField={deleteIngredientField}
              />
            ) : (
              <IngredientElement
                key={ingredient.id}
                ingredient={ingredient}
                setEditingId={setEditingId}
                setDeletingId={setDeletingId}
              />
            ),
          )}
        </div>
        <IngredientForm
          recipeId={recipeId}
          setIngredients={setIngredients}
          ingredientOptions={ingredientOptions}
        />
        {/*
         <AddIngredient
          recipeId={recipeId}
          setIngredients={setIngredients}
          addIngredientField={addIngredientField}
          ingredientOptions={ingredientOptions}
        />
        */}
      </div>
    </div>
  );
}
