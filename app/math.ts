export function add(numbers: number[]) {
  if (numbers.length === 1 && numbers[0] === 0) throw new Error("empty array");

  let sum = 0;
  for (const number of numbers) {
    sum += number;
  }
  return sum;
}
