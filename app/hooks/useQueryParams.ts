import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseQueryParams } from "../utils/queryParams/parseQueryParams";
import getQueryString from "../utils/queryParams/getQueryString";

export function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();

  const queryParams = parseQueryParams(searchParams);

  const setQueryParams = (newParams: Record<string, string>) => {
    const queryString = getQueryString().fromURLSearchParams(
      searchParams,
      newParams
    );

    // Push the new query parameters to the URL
    //Using replace instead of push because when going back to old route, filters are not reset
    const url = `${path}${queryString && `?${queryString}`}`;
    router.replace(url);
    return url;
  };

  return { queryParams, setQueryParams };
}
