"use client";
import { updateRecipeField } from "@/app/actions/updateRecipeField";
import TextInput from "../../UI/inputs/TextInput";
import { useState } from "react";
import {
  CheckIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import TextAreaInput from "../../UI/inputs/TextAreaInput";

type Props = {
  recipeId: string;
  inputType?: "input" | "textArea";
  label?: string;
  placeholder?: string;
  name: string;
  id: string;
  className?: string;
  type?: string;
  initialValue?: string;
  required?: boolean;
};

export default function EditRecipeInput({
  recipeId,
  inputType = "input",
  label,
  placeholder,
  name,
  id,
  className,
  type,
  initialValue,
  required,
}: Props) {
  const [value, setValue] = useState(initialValue);
  const [prevValue, setPrevValue] = useState(initialValue);
  const [editMode, setEditMode] = useState(false);

  if (!editMode)
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{label}</p>
          <button
            type="button"
            className="flex items-center justify-center rounded-md p-1"
            onClick={() => {
              setPrevValue(value);
              setEditMode(true);
            }}
          >
            <PencilSquareIcon className="h-4 w-4" />
          </button>
        </div>

        <p className="border border-transparent p-2">{value}</p>
      </div>
    );

  return (
    <form
      className="flex flex-col gap-1"
      action={async (formData: FormData) => {
        const value = formData.get(name) as string;
        await updateRecipeField(recipeId, name, value);
        setEditMode(false);
      }}
    >
      <p className="font-semibold">{label}</p>
      <div
        className={`flex items-center gap-2 ${inputType === "textArea" ? "flex-col" : ""}`}
      >
        {inputType === "input" ? (
          <TextInput
            placeholder={placeholder}
            className={className}
            type={type}
            label=""
            name={name}
            id={id}
            value={value}
            required={required}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        ) : (
          <TextAreaInput
            label=""
            placeholder={placeholder}
            name={name}
            id={id}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            rows={4}
          />
        )}

        <div className="flex gap-2">
          <button
            className="flex items-center justify-center rounded-md border p-3"
            type="button"
            onClick={() => {
              setValue(prevValue);
              setEditMode(false);
            }}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </button>
          <button
            className="flex items-center justify-center rounded-md bg-primary p-3 text-white"
            type="submit"
          >
            <CheckIcon className="h-4 w-4 stroke-2" />
          </button>
        </div>
      </div>
    </form>
  );
}
