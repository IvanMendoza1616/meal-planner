import EditRecipeForm from "@/app/components/forms/EditRecipeForm";
import ProfileContainer from "@/app/components/profile/ProfileContainer";

import client from "@/app/lib/db";
import { Recipe } from "@/app/types/Recipe";
import getSession from "@/app/utils/getSession";
import { ingredientOptions } from "@/ingredientOptions";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getSession("/profile/recipes");

  const [result] = (await client
    .db("mealPlanner")
    .collection("recipes")
    .find({ slug: params.slug, user: session.user.email })
    .toArray()) as unknown as Recipe[];

  //Converting ObjectId to string
  const recipe = {
    ...result,
    _id: result._id.toString(),
  };

  const sortedIngredientOptions = ingredientOptions.sort((a, b) => {
    const ingredient1 = a.name.toLowerCase();
    const ingredient2 = b.name.toLowerCase();
    if (ingredient1 < ingredient2) {
      return -1;
    } else if (ingredient1 > ingredient2) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <Link
        href="/profile/recipes"
        className="mb-2 flex w-20 items-center gap-1 px-2"
      >
        <FontAwesomeIcon className="mt-0.5 h-2 w-2" icon={faChevronLeft} />
        <span>Volver</span>
      </Link>
      <ProfileContainer>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Editor de Recetas</h1>
        </div>
        <EditRecipeForm
          recipe={recipe}
          ingredientOptions={sortedIngredientOptions}
        />
      </ProfileContainer>
    </div>
  );
}
