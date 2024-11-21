//Round up to two decimals
export const roundDecimals = (number: number) => {
  return Math.round(number * 100) / 100;
};
