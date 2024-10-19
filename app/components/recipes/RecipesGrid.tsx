import RecipeCard from "./RecipeCard";
import { QueryParams } from "@/app/types/QueryParams";
import { useEffect, useState } from "react";
import { RecipesResponse } from "@/app/types/RecipesResponse";
import axios from "axios";
import getQueryString from "@/app/utils/queryParams/getQueryString";
import Pagination from "../UI/Pagination";
import RecipesNotFoundMessage from "./RecipesNotFoundMessage";
import RecipesResultMessage from "./RecipesResultMessage";

type Props = {
  queryParams: QueryParams;
  setQueryParams: (newParams: Record<string, string>) => string;
};

const initialResponse = {
  success: false,
  data: [],
  pagination: {
    currentPage: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
  },
};

export default function RecipesGrid({ queryParams, setQueryParams }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] =
    useState<RecipesResponse>(initialResponse);

  useEffect(() => {
    const getRecipes = async () => {
      setIsLoading(true);
      const queryString = getQueryString().fromObject(queryParams);
      try {
        const response = await axios.get(`/api/get-recipes?${queryString}`);
        setDataFetched(response.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setDataFetched(initialResponse);
      }
      setIsLoading(false);
    };
    getRecipes();
  }, [queryParams]);

  if (isLoading)
    return (
      <div className="flex h-[300px] items-center justify-center rounded-md border p-4">
        Cargando...
      </div>
    );

  if (!dataFetched.success && !isLoading)
    return (
      <div className="flex h-[300px] items-center justify-center rounded-md border p-4">
        Hubo un error al buscar las recetas.
      </div>
    );

  if (dataFetched.pagination.totalCount === 0)
    return (
      <div className="flex h-[300px] items-center justify-center rounded-md border p-4">
        <RecipesNotFoundMessage
          search={queryParams.search}
          category={queryParams.category}
        />
      </div>
    );

  return (
    <>
      <RecipesResultMessage
        currentPage={dataFetched.pagination.currentPage}
        pageSize={dataFetched.pagination.pageSize}
        totalCount={dataFetched.pagination.totalCount}
        search={queryParams.search}
        category={queryParams.category}
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-8">
        {dataFetched.data.map((recipe) => (
          <RecipeCard key={recipe._id.toString()} recipe={recipe} />
        ))}
      </div>
      <Pagination
        currentPage={dataFetched.pagination.currentPage}
        totalPages={dataFetched.pagination.totalPages}
        setQueryParams={setQueryParams}
      />
    </>
  );
}
