import { Recipe } from "./Recipe";

export type RecipesResponse = {
  success: boolean;
  data: Recipe[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
};
