type Props = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  search: string | null;
  category: string | null;
};

export default function RecipesResultMessage({
  currentPage,
  pageSize,
  totalCount,
  search,
  category,
}: Props) {
  const startingValue = (currentPage - 1) * pageSize + 1;

  const endingValue =
    currentPage * pageSize < totalCount ? currentPage * pageSize : totalCount;

  return (
    <div className="mb-4">
      <p>
        Mostrando {startingValue} - {endingValue} de {totalCount} resultados
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
    </div>
  );
}
