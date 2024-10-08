import ProfileContainer from "@/app/components/profile/ProfileContainer";
import MyRecipes from "@/app/components/profile/recipes/MyRecipes";
//import client from "@/app/lib/db";
import getSession from "@/app/utils/getSession";

export default async function Page() {
  const session = await getSession("/profile/recipes");

  /*
  client
    .db("mealPlanner")
    .collection("recipes")
    .insertMany([]]);
  */

  return (
    <ProfileContainer>
      <div className="mb-12">
        <h1 className="text-2xl font-semibold">My Recipes</h1>
        <p className="text-gray-500">View and edit your recipes</p>
      </div>
      <MyRecipes />
    </ProfileContainer>
  );
}
