import convertToNumber from "../convertToNumber";

export const addPlural = (number: string) => {
  if (convertToNumber(number) > 1) return "s";
  return "";
};
