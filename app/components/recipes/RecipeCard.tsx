import { Recipe } from "@/app/types/Recipe";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md pb-4">
      <p className="absolute top-0 left-0 bg-primary text-white px-4 py-1 rounded-br-lg">
        {recipe.category}
      </p>
      <img className="h-[200px] w-full object-cover" src={recipe.image} />
      <div className="px-3 py-2">
        <h3 className="font-semibold text-2xl mb-2">{recipe.name}</h3>
        <div className="flex justify-between text-gray-600">
          <span className="flex items-center gap-1">
            <FontAwesomeIcon className="w-4 h-4" icon={faClock} />
            {recipe.preparationMinutes} minutes
          </span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon className="w-4 h-4" icon={faUserGroup} />
            {recipe.servings} servings
          </span>
        </div>
      </div>
    </div>
  );
}
