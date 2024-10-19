import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useRef, useState } from "react";
import { QueryParams } from "@/app/types/QueryParams";

type Props = {
  queryParams: QueryParams;
  setQueryParams: (newParams: Record<string, string>) => string;
};

export default function SearchRecipe({ queryParams, setQueryParams }: Props) {
  const [search, setSearch] = useState(queryParams.search?.toString() || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) inputRef.current.blur();
    setQueryParams({ search, page: "1" });
  };

  return (
    <form
      className="flex items-center w-full rounded-md border overflow-hidden focus-within:outline focus-within:outline-primary"
      onSubmit={handleSubmit}
    >
      <FontAwesomeIcon className="w-4 h-4 mx-4 text-gray-400" icon={faSearch} />
      <input
        placeholder="Buscar recetas..."
        name="search"
        id="search"
        className="pr-2 py-2 w-full focus:outline-none"
        ref={inputRef}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {search && (
        <FontAwesomeIcon
          className="w-4 h-4 mx-4 text-gray-400"
          icon={faXmark}
          onClick={() => {
            setSearch("");
            setQueryParams({ search: "", page: "" });
          }}
        />
      )}
    </form>
  );
}
