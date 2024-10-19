import convertToNumber from "@/app/utils/convertToNumber";
import { RefObject } from "react";

export default function validateInput(
  inputRef: RefObject<HTMLInputElement | HTMLSelectElement>,
  type: "string" | "quantity",
) {
  if (inputRef.current) {
    const validationType =
      type === "quantity"
        ? convertToNumber(inputRef.current.value)
        : inputRef.current.value.trim();

    if (validationType) return true;

    inputRef.current.setCustomValidity("Ingresa un valor válido.");
    inputRef.current.reportValidity();
  }
  return false;
}
