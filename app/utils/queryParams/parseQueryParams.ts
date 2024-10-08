import { params, QueryParams } from "@/app/types/QueryParams";

//Create an object from the params array as keys and assign the value from searchParams
export function parseQueryParams(searchParams: URLSearchParams) {
  return Object.assign(
    {},
    ...params.map((key) => ({ [key]: searchParams.get(key) }))
  ) as QueryParams;
}
