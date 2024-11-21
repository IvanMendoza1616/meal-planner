import { Recipe } from "@/app/types/Recipe";
import { categoryObjectSort } from "@/app/utils/sort/categoryObjectSort";

type Props = {
  recipes: Recipe[];
};

export default function MealSortedRecipes({ recipes }: Props) {
  const sortedRecipes = categoryObjectSort(recipes);

  if (recipes.length === 0) return <p>No tienes recetas seleccionadas</p>;

  return (
    <>
      {Object.entries(sortedRecipes).map(([category, recipes]) => {
        if (recipes.length)
          return (
            <div key={category}>
              <h3 className="font-semibold">{category}</h3>
              {
                <ul>
                  {recipes.map((recipe, index) => (
                    <li key={index}>• {recipe.name}</li>
                  ))}
                </ul>
              }
            </div>
          );
      })}
    </>
  );
}
