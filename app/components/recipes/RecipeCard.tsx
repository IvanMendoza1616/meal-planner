import { Recipe } from "@/app/types/Recipe";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  return (
    <div className="relative overflow-hidden rounded-lg pb-4 shadow-md">
      <p className="absolute left-0 top-0 rounded-br-lg bg-primary px-4 py-1 text-white">
        {recipe.category}
      </p>
      <div className="absolute right-1 top-1 rounded-full bg-primary p-2 text-white">
        <Link
          href={`/profile/recipes/edit-recipe/${recipe.slug}`}
          className="flex h-5 w-5 items-center justify-center"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
      </div>
      <img className="h-[200px] w-full object-cover" src={recipe.image} />
      <div className="px-3 py-2">
        <h3 className="mb-2 text-2xl font-semibold">{recipe.name}</h3>
        <div className="flex justify-between text-gray-600">
          <span className="flex items-center gap-1">
            <FontAwesomeIcon className="h-4 w-4" icon={faClock} />
            {recipe.preparationMinutes} minutos
          </span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon className="h-4 w-4" icon={faUserGroup} />
            {recipe.servings} porciones
          </span>
        </div>
      </div>
    </div>
  );
}
