/*

import { params } from "@/app/types/QueryParams";

export default function getQueryString(
  searchParams: URLSearchParams,
  newParams: Record<string, string>
) {
  const query = new URLSearchParams();

  //Loop through searchParams using params array to get current params
  params.forEach((param) => {
    const paramValue = searchParams.get(param);
    if (paramValue) query.set(param, paramValue.toString() || "");
  });

  //Add new params to query
  Object.keys(newParams).forEach((key) => {
    //Type assertion to key so Typescript considers it as valid. includes() will actually determine if it's valid or not
    if (params.includes(key as (typeof params)[number])) {
      if (newParams[key]) {
        query.set(key, newParams[key]);
      } else {
        query.delete(key);
      }
    }
  });

  return query.toString();
}

*/

import { params, QueryParams } from "@/app/types/QueryParams";

export default function getQueryString() {
  return {
    fromURLSearchParams: (
      searchParams: URLSearchParams,
      newParams: Record<string, string | null>
    ) => {
      const query = new URLSearchParams();

      //Loop through searchParams using params array to get current params
      params.forEach((param) => {
        const paramValue = searchParams.get(param);
        if (paramValue && paramValue.trim())
          query.set(param, paramValue.toString().trim() || "");
      });

      //Add new params to query
      Object.keys(newParams).forEach((key) => {
        //Type assertion to key so Typescript considers it as valid. includes() will actually determine if it's valid or not
        if (params.includes(key as (typeof params)[number])) {
          // Only set the key if the value is a valid string
          if (newParams[key] && newParams[key].trim()) {
            query.set(key, newParams[key].trim());
          } else {
            query.delete(key);
          }
        }
      });
      return query.toString();
    },

    fromObject: (queryParams: QueryParams) => {
      const query = new URLSearchParams();
      for (const [key, value] of Object.entries(queryParams)) {
        // Only set the key if the value is a valid string
        if (value && value.trim()) {
          query.set(key, value.trim()); // Add the key-value pair to the URLSearchParams
        }
      }
      return query.toString();
    },
  };
}
