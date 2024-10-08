import { QueryParams } from "@/app/types/QueryParams";
import { Sort } from "@/app/types/Sort";

export default function getSort(queryParams: QueryParams) {
  const sort: Sort = {};

  if (queryParams.sort) {
    if (queryParams.sort === "newest") sort.createdAt = -1;
    else if (queryParams.sort === "oldest") sort.createdAt = 1;
    else sort.createdAt = -1;
  } else {
    sort.createdAt = -1;
  }

  return sort;
}
