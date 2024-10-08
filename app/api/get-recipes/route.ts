import client from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { parseQueryParams } from "@/app/utils/queryParams/parseQueryParams";
import getFilters from "@/app/utils/getRecipes/getFilters";
import getSort from "@/app/utils/getRecipes/getSort";
import getPipeline from "@/app/utils/getRecipes/getPipeline";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  const pageSize = 1;
  const searchParams = request.nextUrl.searchParams;

  const session = await auth();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const queryParams = parseQueryParams(searchParams);
  const filter = getFilters(queryParams, session.user.email);
  const sort = getSort(queryParams);

  const pipeline = getPipeline(filter, sort, queryParams, pageSize);

  try {
    const [response] = await client
      .db("mealPlanner")
      .collection("recipes")
      .aggregate(pipeline)
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: response.data,
        pagination: {
          totalCount: response.totalCount || 0,
          currentPage: +(queryParams.page || 1),
          pageSize,
          totalPages: Math.ceil(response.totalCount / pageSize) || 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
