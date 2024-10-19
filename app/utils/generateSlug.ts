export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD") // Decompose accents from characters
    .replace(/[\u0300-\u036f]/g, "") // Remove the decomposed accent marks
    .replace(/[^a-z0-9 ]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}
