import ProfileContainer from "@/app/components/profile/ProfileContainer";
import MyRecipes from "@/app/components/profile/recipes/MyRecipes";
import Link from "next/link";

//import client from "@/app/lib/db";

export default async function Page() {
  /*
  client
    .db("mealPlanner")
    .collection("recipes")
    .insertMany([]]);
  */

  return (
    <ProfileContainer>
      <div className="mb-12">
        <h1 className="text-2xl font-semibold">Mis Recetas</h1>
        <p className="text-gray-500">Crea y edita tus recetas</p>
      </div>
      <div className="mb-4 flex items-center justify-start">
        <Link
          href="/profile/recipes/create-recipe"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          + Crear receta
        </Link>
      </div>
      <MyRecipes />
    </ProfileContainer>
  );
}
