import { Filter } from "@/app/types/Filter";
import { QueryParams } from "@/app/types/QueryParams";
import { Sort } from "@/app/types/Sort";
import { Document } from "mongodb"; // MongoDB type

export default function getPipeline(
  filter: Filter,
  sort: Sort,
  queryParams: QueryParams,
  pageSize: number
) {
  // Build the query pipeline
  const pipeline: Document[] = [
    { $match: filter },
    { $sort: sort },
    {
      $facet: {
        totalCount: [{ $count: "totalCount" }], // Get the total count of matching documents
        data: [
          {
            $skip: queryParams.page ? (+queryParams.page - 1) * pageSize : 0,
          }, // Apply skip
          { $limit: pageSize }, // Apply limit
        ],
      },
    },
    {
      $project: {
        totalCount: { $arrayElemAt: ["$totalCount.totalCount", 0] }, // Extract the total count
        data: 1, // Include the results
      },
    },
  ];

  //Search, added at the beginning of pipeline
  if (queryParams.search)
    pipeline.unshift({
      $search: {
        index: "searchRecipe",
        text: {
          query: queryParams.search,
          path: {
            wildcard: "*",
          },
        },
      },
    });

  return pipeline;
}
