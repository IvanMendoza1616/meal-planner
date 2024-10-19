import Button from "@/app/components/UI/Button";
import SelectInput from "@/app/components/UI/inputs/SelectInput";
import SelectSearchInput, {
  Option,
} from "@/app/components/UI/inputs/SelectSearchInput";
import TextInput from "@/app/components/UI/inputs/TextInput";
import { IngredientOption } from "@/app/types/IngredientOption";
import { Ingredient } from "@/app/types/Recipe";
import validateInput from "@/app/utils/validation/validateInput";
import { Dispatch, SetStateAction, useRef, useState } from "react";

type Props = {
  recipeId: string;
  setIngredients: Dispatch<SetStateAction<Ingredient[]>>;
  addIngredientField?: (
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

export default function AddIngredient({
  recipeId,
  setIngredients,
  addIngredientField,
  ingredientOptions,
}: Props) {
  const [selectedIngredient, setSelectedIngredient] =
    useState<Option>(emptyOption);
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLSelectElement>(null);

  const handleAddIngredient = () => {
    if (
      !validateInput(nameRef, "string") ||
      !validateInput(quantityRef, "quantity") ||
      !validateInput(unitRef, "string")
    )
      return;

    const ingredientId = Date.now();
    setIngredients((prevState) => [
      ...prevState,
      {
        name: selectedIngredient.name,
        quantity,
        unit,
        category: selectedIngredient.category,
        id: ingredientId,
      },
    ]);
    if (recipeId && addIngredientField) {
      addIngredientField(recipeId, {
        name: selectedIngredient.name,
        quantity,
        unit,
        category: selectedIngredient.category,
        id: ingredientId,
      });
    }
    setSelectedIngredient(emptyOption);
    setQuantity("");
    setUnit("");
  };

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-gray-100 p-4 sm:flex-row">
      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <SelectSearchInput
          options={ingredientOptions}
          label="Ingrediente"
          name="ingredient-search"
          id="ingredient-search"
          inputRef={nameRef}
          value={selectedIngredient}
          onChange={(selectedOption) => {
            setSelectedIngredient(selectedOption);
            setUnit("");
          }}
        />
        <TextInput
          label="Cantidad"
          name="quantity"
          id="quantity"
          placeholder="ej. 1/2, 4, 2.5"
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
          label="Unidad"
          name="unit"
          id="unit"
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
      <div className="self-start sm:self-end">
        <Button type="button" variant="secondary" onClick={handleAddIngredient}>
          + Agregar Ingrediente
        </Button>
      </div>
    </div>
  );
}
