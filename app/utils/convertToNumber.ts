import { roundDecimals } from "./roundDecimals";

export default function convertToNumber(value: string) {
  const number = value.split("/");

  //Hardcoding specific case where there is a decimal point at the end
  if (value[value.length - 1] === ".") return 0;

  if (number.length === 1 && +number[0]) return +(+number[0]).toFixed(2);
  if (number.length === 2 && +number[0] && +number[1])
    return roundDecimals(+number[0] / +number[1]);
  return 0;
}
