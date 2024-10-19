"use client";
import { QueryParams } from "@/app/types/QueryParams";
import SearchRecipe from "./inputs/SearchRecipe";
import CategorySelect from "./inputs/CategorySelect";
import SortSelect from "./inputs/SortSelect";

type Props = {
  queryParams: QueryParams;
  setQueryParams: (newParams: Record<string, string>) => string;
};

export default function Controls({ queryParams, setQueryParams }: Props) {
  return (
    <div className="flex flex-col items-start mb-8 md:flex-row md:gap-8 gap-4">
      <SearchRecipe queryParams={queryParams} setQueryParams={setQueryParams} />
      <div className="flex items-center flex-col md:w-auto sm:justify-between sm:flex-row sm:gap-8 gap-4 w-full">
        <CategorySelect
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
        <SortSelect queryParams={queryParams} setQueryParams={setQueryParams} />
      </div>
    </div>
  );
}
