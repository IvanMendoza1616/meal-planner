import CreateRecipeForm from "@/app/components/forms/CreateRecipeForm";
import ProfileContainer from "@/app/components/profile/ProfileContainer";
import getSession from "@/app/utils/getSession";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function Page() {
  const session = await getSession("/profile/recipes");

  const ingredientOptions = [
    {
      _id: "11653510365",
      name: "Salchicha",
      category: "Embutidos",
      units: ["kilo", "pieza"],
    },
    {
      _id: "45453354",
      name: "Queso",
      category: "Lácteos",
      units: ["kilo", "pieza"],
    },
    {
      _id: "4568798465",
      name: "Pollo",
      category: "Carnes",
      units: ["kilo", "pieza", "milanesa"],
    },
    {
      _id: "2665646226",
      name: "Chipotle",
      category: "Enlatados",
      units: ["gramo", "lata"],
    },
    {
      _id: "654854616",
      name: "Carne de Res",
      category: "Carnes",
      units: ["kilo", "pieza", "gramo"],
    },
    {
      _id: "656562255",
      name: "Tortilla de Maíz",
      category: "Panadería",
      units: ["kilo", "pieza", "gramo"],
    },
    {
      _id: "78945156165",
      name: "Limón",
      category: "Frutas y Verduras",
      units: ["kilo", "pieza", "gramo"],
    },
    {
      _id: "897413",
      name: "Cebolla",
      category: "Frutas y Verduras",
      units: ["kilo", "pieza", "gramo"],
    },
    {
      _id: "4896455",
      name: "Carne Molida",
      category: "Carnes",
      units: ["kilo", "gramo"],
    },
    {
      _id: "5615651",
      name: "Papa",
      category: "Frutas y Verduras",
      units: ["kilo", "gramo"],
    },
    {
      _id: "98815468",
      name: "Zanahoria",
      category: "Frutas y Verduras",
      units: ["kilo", "gramo", "pieza"],
    },
    {
      _id: "2165156",
      name: "Tortilla de Harina",
      category: "Panadería",
      units: ["kilo", "gramo", "pieza"],
    },
  ];

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
        <CreateRecipeForm
          user={session.user.email}
          ingredientOptions={sortedIngredientOptions}
        />
      </ProfileContainer>
    </div>
  );
}
