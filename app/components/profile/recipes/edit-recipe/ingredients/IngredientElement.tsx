import { Ingredient } from "@/app/types/Recipe";
import { addPlural } from "@/app/utils/textManipulation/addPlural";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";

type Props = {
  ingredient: Ingredient;
  setEditingId: Dispatch<SetStateAction<number>>;
  setDeletingId: Dispatch<SetStateAction<number>>;
};

export default function IngredientElement({
  ingredient,
  setEditingId,
  setDeletingId,
}: Props) {
  return (
    <div
      className="flex w-full items-center justify-between gap-4 rounded-lg bg-gray-100 px-4"
      key={ingredient.id}
    >
      <span className="flex items-center gap-1 py-4">
        {ingredient.name} - {ingredient.quantity} {ingredient.unit}
        {addPlural(ingredient.quantity)}
      </span>
      <div className="flex items-center gap-4">
        <button
          className="px-2 py-4"
          onClick={() => {
            setEditingId(ingredient.id);
          }}
        >
          <FontAwesomeIcon className="h-4 w-4" icon={faPen} />
        </button>
        <button
          className="px-2 py-4"
          onClick={() => {
            setDeletingId(ingredient.id);
          }}
        >
          <FontAwesomeIcon className="h-4 w-4" icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
