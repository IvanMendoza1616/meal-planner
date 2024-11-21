"use client";
import { useQueryParams } from "@/app/hooks/useQueryParams";
import RecipesGrid from "../../recipes/RecipesGrid";
import Controls from "./controls/Controls";

export default function MyRecipes() {
  const { queryParams, setQueryParams } = useQueryParams();
  return (
    <>
      <Controls queryParams={queryParams} setQueryParams={setQueryParams} />
      <RecipesGrid queryParams={queryParams} setQueryParams={setQueryParams} />
    </>
  );
}
