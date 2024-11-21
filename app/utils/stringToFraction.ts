export const stringToFraction = (value: string) => {
  if (value === "0.5") return "1/2";
  if (value === "0.33") return "1/3";
  if (value === "0.66") return "2/3";
  if (value === "0.25") return "1/4";
  if (value === "0.75") return "3/4";
  return value;
};
