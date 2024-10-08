"use client";
import { useQueryParams } from "@/app/hooks/useQueryParams";
import RecipesGrid from "../../recipes/RecipesGrid";
import SearchRecipe from "./SearchRecipe";

/*
const recipes = [
  {
    id: 1,
    name: "Quesadillas",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/75/Quesadilla_2.jpg",
    description: "Ricas Quesadillas",
    category: "Desayuno",
    ingredients: [
      { name: "Queso", unit: "gramo", quantity: 100 },
      { name: "Tortilla de harina", unit: "pieza", quantity: 4 },
    ],
    preparation: "Pon la tortilla y el queso en el sarten y listo",
    servings: "2",
    preparationMinutes: 20,
    user: "imendoza1616@gmail.com",
    createdAt: new Date("2024-09-30"),
  },
  {
    id: 2,
    name: "Picadillo",
    image:
      "https://www.unileverfoodsolutions.com.mx/dam/global-ufs/mcos/NOLA/calcmenu/recipes/MX-recipes/In-Development/FULL-PICADILLO.png",
    description: "Picadillo sabroso",
    category: "Comida",
    ingredients: [
      { name: "Carne molida", unit: "gramo", quantity: 400 },
      { name: "Papa", unit: "pieza", quantity: 2 },
      { name: "Zanahoria", unit: "pieza", quantity: 2 },
    ],
    preparation: "Frita la carne y agrega papa y zanahoria",
    servings: "4",
    preparationMinutes: 50,
    user: "imendoza1616@gmail.com",
    createdAt: new Date("2024-10-01"),
  },
  {
    id: 3,
    name: "Tostaditas de Tinga de Pollo",
    image:
      "https://i.blogs.es/6226ec/tinga-de-pollo-con-chipotle-casera-5-/450_1000.jpg",
    description: "Tostadas de tinga de pollo sabrosas",
    category: "Comida",
    ingredients: [
      { name: "Pollo", unit: "gramo", quantity: 400 },
      { name: "Cebolla", unit: "pieza", quantity: 1 / 4 },
      { name: "Chipotle", unit: "pieza", quantity: 1 },
    ],
    preparation: "Agrega el pollo y el recaudo con tinga.",
    servings: "2",
    preparationMinutes: 35,
    user: "imendoza1616@gmail.com",
    createdAt: new Date("2024-10-02"),
  },
  {
    id: 4,
    name: "Limonada",
    image:
      "https://t1.uc.ltmcdn.com/es/posts/7/6/6/como_hacer_limonada_7667_600.jpg",
    description: "Limonada fresca",
    category: "Bebida",
    ingredients: [{ name: "Limón", unit: "pieza", quantity: 4 }],
    preparation: "Agrega el limón con agua y azúcar",
    servings: "10",
    preparationMinutes: 10,
    user: "imendoza1616@gmail.com",
    createdAt: new Date("2024-10-03"),
  },
];
*/

export default function MyRecipes() {
  const { queryParams, setQueryParams } = useQueryParams();
  return (
    <>
      <SearchRecipe queryParams={queryParams} setQueryParams={setQueryParams} />
      <RecipesGrid queryParams={queryParams} setQueryParams={setQueryParams} />
    </>
  );
}
