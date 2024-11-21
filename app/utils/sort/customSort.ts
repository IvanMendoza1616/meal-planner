export default function customSort(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  array: Record<string, any>[],
  customOrder: string[],
  key: string,
) {
  return array.sort((a, b) => {
    const indexA = customOrder.indexOf(a[key]);
    const indexB = customOrder.indexOf(b[key]);

    // Categories not in customOrder will be placed after the ordered categories
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
}
