"use client";
import TextInput from "../../UI/inputs/TextInput";
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
    <form className="flex gap-4 items-center mb-4" onSubmit={handleSubmit}>
      <p>Search:</p>
      <TextInput
        label=""
        placeholder="Add a recipe name"
        name="search"
        id="search"
        inputRef={inputRef}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </form>
  );
}
