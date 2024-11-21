type Props = {
  search: string | null;
  category: string | null;
};

export default function RecipesNotFoundMessage({ search, category }: Props) {
  return (
    <p>
      No se encontraron recetas
      {search && (
        <span>
          {" "}
          para <span className="font-bold">&quot;{search}&quot;</span>
        </span>
      )}
      {category && (
        <span>
          {" "}
          en la categoría <span className="font-bold">{category}</span>
        </span>
      )}
    </p>
  );
}
