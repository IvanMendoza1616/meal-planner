import { Filter } from "@/app/types/Filter";
import { QueryParams } from "@/app/types/QueryParams";

export default function getFilters(queryParams: QueryParams, user: string) {
  const filter: Filter = {
    user,
  };

  //Category
  if (queryParams.category) {
    filter.category = queryParams.category;
  }

  return filter;
}
