export default function sortAlphabetically(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  array: Record<string, any>[],
  key: string,
) {
  return array.sort((a, b) => {
    const value1 = a[key].toLowerCase();
    const value2 = b[key].toLowerCase();
    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  });
}
