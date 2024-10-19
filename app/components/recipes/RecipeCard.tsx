import { Recipe } from "@/app/types/Recipe";
import capitalizeFirstLetter from "@/app/utils/capitalizeFirsLetter";
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
    <div className="relative rounded-lg overflow-hidden shadow-md pb-4">
      <p className="absolute top-0 left-0 bg-primary text-white px-4 py-1 rounded-br-lg">
        {capitalizeFirstLetter(recipe.category)}
      </p>
      <div className="absolute top-1 right-1 bg-primary text-white p-2 rounded-full">
        <Link
          href={`/profile/recipes/edit-recipe/${recipe.slug}`}
          className="w-5 h-5 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
      </div>
      <img className="h-[200px] w-full object-cover" src={recipe.image} />
      <div className="px-3 py-2">
        <h3 className="font-semibold text-2xl mb-2">{recipe.name}</h3>
        <div className="flex justify-between text-gray-600">
          <span className="flex items-center gap-1">
            <FontAwesomeIcon className="w-4 h-4" icon={faClock} />
            {recipe.preparationMinutes} minutos
          </span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon className="w-4 h-4" icon={faUserGroup} />
            {recipe.servings} porciones
          </span>
        </div>
      </div>
    </div>
  );
}
