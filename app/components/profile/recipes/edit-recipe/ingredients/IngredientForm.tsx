import { addIngredientField } from "@/app/actions/ingredientField/addIngredientField";
import { updateIngredientField } from "@/app/actions/ingredientField/updateIngredientField";
import Button from "@/app/components/UI/Button";
import SelectInput from "@/app/components/UI/inputs/SelectInput";
import SelectSearchInput, {
  Option,
} from "@/app/components/UI/inputs/SelectSearchInput";
import TextInput from "@/app/components/UI/inputs/TextInput";
import { IngredientOption } from "@/app/types/IngredientOption";
import { Ingredient } from "@/app/types/Recipe";
import validateInput from "@/app/utils/validation/validateInput";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useRef, useState } from "react";

type Props = {
  recipeId: string;
  setIngredients: Dispatch<SetStateAction<Ingredient[]>>;
  ingredientOptions: IngredientOption[];
  setEditingId?: Dispatch<SetStateAction<number>>;
  ingredient?: Ingredient;
};

const emptyIngredientOption = {
  _id: "",
  name: "",
  category: "",
  units: [],
};

export default function EditIngredient({
  recipeId,
  setEditingId,
  ingredient,
  setIngredients,
  ingredientOptions,
}: Props) {
  const [selectedIngredientOption, setSelectedIngredientOption] =
    useState<Option>(
      ingredientOptions.find((option) => option.name === ingredient?.name) ||
        emptyIngredientOption,
    );
  const [quantity, setQuantity] = useState(
    ingredient ? ingredient.quantity : "",
  );
  const [unit, setUnit] = useState(ingredient ? ingredient.unit : "");

  const nameRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLSelectElement>(null);

  const handleSaveIngredient = async () => {
    if (
      !validateInput(nameRef, "string") ||
      !validateInput(quantityRef, "quantity") ||
      !validateInput(unitRef, "string")
    )
      return;

    const createdIngredient = {
      id: ingredient ? ingredient.id : Date.now(),
      name: selectedIngredientOption.name,
      quantity,
      unit,
      category: selectedIngredientOption.category,
    };

    //If editing ingredient
    if (ingredient) {
      setIngredients((prevState) =>
        prevState.map((ingredientState) => {
          if (ingredientState.id === ingredient.id) return createdIngredient;
          return ingredientState;
        }),
      );
      //If editing ingredient on existing recipe
      if (recipeId) {
        await updateIngredientField(recipeId, createdIngredient);
      }
      handleCancelEdit();
    }
    //If creating ingredient
    else {
      setIngredients((prevState) => [...prevState, createdIngredient]);
      //If creating ingredient on existing recipe
      if (recipeId) {
        await addIngredientField(recipeId, createdIngredient);
      }
      setSelectedIngredientOption(emptyIngredientOption);
      setQuantity("");
      setUnit("");
    }
  };

  const handleCancelEdit = () => {
    if (setEditingId) setEditingId(0);
  };

  return (
    <div className="flex w-full flex-col justify-between gap-2 rounded-lg bg-gray-100 p-4 sm:flex-row sm:items-center">
      <div className="flex flex-col gap-2 sm:flex-row">
        <SelectSearchInput
          label={ingredient ? "" : "Ingrediente"}
          name={`ingredient${ingredient ? "-editing" : ""}`}
          id={`ingredient${ingredient ? "-editing" : ""}`}
          options={ingredientOptions}
          value={selectedIngredientOption}
          inputRef={nameRef}
          onChange={(selectedOption) => {
            setSelectedIngredientOption(selectedOption);
            setUnit("");
          }}
        />
        <TextInput
          label={ingredient ? "" : "Cantidad"}
          placeholder="Cantidad"
          name={`quantity${ingredient ? "-editing" : ""}`}
          id={`quantity${ingredient ? "-editing" : ""}`}
          value={quantity}
          inputRef={quantityRef}
          onChange={(e) => {
            quantityRef.current?.setCustomValidity("");
            const regex = /^$|^(\d+(\.\d*)?|\d+\/\d*)$/;
            if (regex.test(e.target.value)) setQuantity(e.target.value);
          }}
        />
        <SelectInput
          className="min-w-[100px]"
          label={ingredient ? "" : "Unidad"}
          name={`unit${ingredient ? "-editing" : ""}`}
          id={`unit${ingredient ? "-editing" : ""}`}
          value={unit}
          inputRef={unitRef}
          onChange={(e) => {
            unitRef.current?.setCustomValidity("");
            setUnit(e.target.value);
          }}
        >
          <option value="" disabled className="text-gray-500"></option>
          {selectedIngredientOption.units.map((unit: string) => (
            <option value={unit} key={unit}>
              {unit}
            </option>
          ))}
        </SelectInput>
      </div>

      {ingredient ? (
        //Edit Ingredient
        <div className="flex gap-2">
          <button
            className="flex items-center justify-center rounded-md border bg-white p-3"
            type="button"
            onClick={handleCancelEdit}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </button>
          <button
            className="flex items-center justify-center rounded-md bg-primary p-3 text-white"
            type="button"
            onClick={handleSaveIngredient}
          >
            <CheckIcon className="h-4 w-4 stroke-2" />
          </button>
        </div>
      ) : (
        //Add Ingredient
        <div className="self-start sm:self-end">
          <Button
            type="button"
            variant="secondary"
            onClick={handleSaveIngredient}
          >
            + Agregar Ingrediente
          </Button>
        </div>
      )}
    </div>
  );
}
