export const params = ["search", "category", "sort", "page"] as const;

export type QueryParamsKeys = (typeof params)[number];

export type QueryParams = Record<QueryParamsKeys, string | null>;
