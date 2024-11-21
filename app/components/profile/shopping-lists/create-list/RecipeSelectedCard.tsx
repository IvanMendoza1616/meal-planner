import { Recipe } from "@/app/types/Recipe";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  recipe: Recipe;
  selectedRecipes: Recipe[];
  onSelectedRecipe: (recipe: Recipe) => void;
};

export default function RecipeSelectedCard({
  recipe,
  selectedRecipes,
  onSelectedRecipe,
}: Props) {
  const selected = selectedRecipes.find(
    (selectedRecipe) => selectedRecipe._id === recipe._id,
  );

  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-lg pb-4 shadow-md`}
      onClick={() => {
        onSelectedRecipe(recipe);
      }}
    >
      <p className="absolute left-0 top-0 rounded-br-lg bg-primary px-4 py-1 text-white">
        {recipe.category}
      </p>
      {selected && (
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full rounded-lg border-4 border-primary" />
      )}
      <div>
        <img className="aspect-[4/3] w-full object-cover" src={recipe.image} />
        <h3 className="mb-2 px-4 py-2 text-lg font-semibold">{recipe.name}</h3>
      </div>

      <div className="flex px-4 py-2">
        <button
          type="button"
          className={`flex w-full items-center justify-center gap-2 self-end rounded-md border py-2 ${selected ? "bg-gray-100" : "border-transparent bg-black text-white"}`}
        >
          {selected ? (
            <>
              <CheckCircleIcon className="h-5 w-5" />
              Agregado
            </>
          ) : (
            "+ Agregar"
          )}
        </button>
      </div>
    </div>
  );
}
