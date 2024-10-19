import Button from "@/app/components/UI/Button";
import { Ingredient } from "@/app/types/Recipe";
import { Dispatch, SetStateAction } from "react";

type Props = {
  recipeId: string;
  ingredient: Ingredient;
  setIngredients: Dispatch<SetStateAction<Ingredient[]>>;
  setDeletingId: Dispatch<SetStateAction<number>>;
  deleteIngredientField?: (
    recipeId: string,
    ingredient: Ingredient,
  ) => Promise<void>;
};

export default function DeleteIngredient({
  recipeId,
  ingredient,
  setIngredients,
  setDeletingId,
  deleteIngredientField,
}: Props) {
  const handleDeleteIngredient = () => {
    setIngredients((prevState) =>
      prevState.filter(
        (ingredientState) => ingredientState.id !== ingredient.id,
      ),
    );
    if (recipeId && deleteIngredientField) {
      deleteIngredientField(recipeId, ingredient);
    }
  };

  return (
    <div className="flex w-full items-center justify-center gap-8 rounded-lg bg-gray-100 p-4">
      ¿Borrar {ingredient.name}?
      <div className="flex items-center gap-4">
        <Button type="button" onClick={handleDeleteIngredient}>
          Borrar
        </Button>
        <Button
          type="button"
          onClick={() => {
            setDeletingId(0);
          }}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
