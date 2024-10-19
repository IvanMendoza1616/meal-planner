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
  setEditingId: Dispatch<SetStateAction<number>>;
  ingredient: Ingredient;
  setIngredients: Dispatch<SetStateAction<Ingredient[]>>;
  updateIngredientField?: (
    recipeId: string,
    ingredient: Ingredient,
  ) => Promise<void>;
  ingredientOptions: IngredientOption[];
};

const emptyOption = {
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
  updateIngredientField,
  ingredientOptions,
}: Props) {
  const [selectedIngredient, setSelectedIngredient] = useState<Option>(
    ingredientOptions.find((option) => option.name === ingredient.name) ||
      emptyOption,
  );
  const [quantity, setQuantity] = useState(ingredient.quantity);
  const [unit, setUnit] = useState(ingredient.unit);

  const nameRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLSelectElement>(null);

  const handleEditIngredient = async () => {
    if (
      !validateInput(nameRef, "string") ||
      !validateInput(quantityRef, "quantity") ||
      !validateInput(unitRef, "string")
    )
      return;
    setIngredients((prevState) =>
      prevState.map((ingredientState) => {
        if (ingredientState.id === ingredient.id)
          return {
            ...ingredientState,
            name: selectedIngredient.name,
            quantity,
            unit,
            category: selectedIngredient.category,
          };
        return ingredientState;
      }),
    );
    //If editing existing recipe
    if (recipeId && updateIngredientField) {
      await updateIngredientField(recipeId, {
        ...ingredient,
        name: selectedIngredient.name,
        quantity,
        unit,
        category: selectedIngredient.category,
      });
    }
    setEditingId(0);
  };

  const handleCancelEdit = () => {
    setEditingId(0);
  };

  return (
    <div className="flex w-full flex-col justify-between gap-2 rounded-lg bg-gray-100 p-4 sm:flex-row sm:items-center">
      <div className="flex flex-col gap-2 sm:flex-row">
        <SelectSearchInput
          label=""
          name="ingredient-edit"
          id="ingredient-edit"
          options={ingredientOptions}
          value={selectedIngredient}
          inputRef={nameRef}
          onChange={(selectedOption) => {
            setSelectedIngredient(selectedOption);
            setUnit("");
          }}
        />
        <TextInput
          placeholder="Cantidad"
          name="quantity-edit"
          id="quantity-edit"
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
          label=""
          name="unit-edit"
          id="unit-edit"
          value={unit}
          inputRef={unitRef}
          onChange={(e) => {
            unitRef.current?.setCustomValidity("");
            setUnit(e.target.value);
          }}
        >
          <option value="" disabled className="text-gray-500"></option>
          {selectedIngredient.units.map((unit: string) => (
            <option value={unit} key={unit}>
              {unit}
            </option>
          ))}
        </SelectInput>
      </div>

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
          onClick={handleEditIngredient}
        >
          <CheckIcon className="h-4 w-4 stroke-2" />
        </button>
      </div>
    </div>
  );
}

/*
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
  setEditingId: Dispatch<SetStateAction<number>>;
  ingredient: Ingredient;
  setIngredients: Dispatch<SetStateAction<Ingredient[]>>;
  updateIngredientField?: (
    recipeId: string,
    ingredient: Ingredient,
  ) => Promise<void>;
  ingredientOptions: IngredientOption[];
};

const emptyOption = {
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
  updateIngredientField,
  ingredientOptions,
}: Props) {
  const [selectedIngredient, setSelectedIngredient] = useState<Option>(
    ingredientOptions.find((option) => option.name === ingredient.name) ||
      emptyOption,
  );
  const [quantity, setQuantity] = useState(ingredient.quantity);
  const [unit, setUnit] = useState(ingredient.unit);

  const nameRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLSelectElement>(null);

  const handleEditIngredient = async () => {
    if (
      !validateInput(nameRef, "string") ||
      !validateInput(quantityRef, "quantity") ||
      !validateInput(unitRef, "string")
    )
      return;
    setIngredients((prevState) =>
      prevState.map((ingredientState) => {
        if (ingredientState.id === ingredient.id)
          return {
            ...ingredientState,
            name: selectedIngredient.name,
            quantity,
            unit,
            category: selectedIngredient.category,
          };
        return ingredientState;
      }),
    );
    //If editing existing recipe
    if (recipeId && updateIngredientField) {
      await updateIngredientField(recipeId, {
        ...ingredient,
        name: selectedIngredient.name,
        quantity,
        unit,
        category: selectedIngredient.category,
      });
    }
    setEditingId(0);
  };

  const handleCancelEdit = () => {
    setEditingId(0);
  };

  return (
    <div className="flex w-full flex-col justify-between gap-2 rounded-lg bg-gray-100 p-4 sm:flex-row sm:items-center">
      <div className="flex flex-col gap-2 sm:flex-row">
        <SelectSearchInput
          label=""
          name="ingredient-edit"
          id="ingredient-edit"
          options={ingredientOptions}
          value={selectedIngredient}
          inputRef={nameRef}
          onChange={(selectedOption) => {
            setSelectedIngredient(selectedOption);
            setUnit("");
          }}
        />
        <TextInput
          placeholder="Cantidad"
          name="quantity-edit"
          id="quantity-edit"
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
          label=""
          name="unit-edit"
          id="unit-edit"
          value={unit}
          inputRef={unitRef}
          onChange={(e) => {
            unitRef.current?.setCustomValidity("");
            setUnit(e.target.value);
          }}
        >
          <option value="" disabled className="text-gray-500"></option>
          {selectedIngredient.units.map((unit: string) => (
            <option value={unit} key={unit}>
              {unit}
            </option>
          ))}
        </SelectInput>
      </div>

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
          onClick={handleEditIngredient}
        >
          <CheckIcon className="h-4 w-4 stroke-2" />
        </button>
      </div>
    </div>
  );
}
*/
