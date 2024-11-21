import { IngredientOption } from "./app/types/IngredientOption";

export const ingredientOptions: IngredientOption[] = [
  {
    _id: "11653510365",
    name: "Salchicha",
    category: "Embutidos",
    units: ["kilo", "pieza"],
    conversionValues: {
      kilo: 1,
      pieza: 0.05,
    },
  },
  {
    _id: "45453354",
    name: "Queso",
    category: "Lácteos",
    units: ["kilo", "pieza"],
    conversionValues: {
      kilo: 1,
      pieza: 0.05,
    },
  },
  {
    _id: "4568798465",
    name: "Pollo",
    category: "Carnes",
    units: ["kilo", "pieza", "milanesa"],
    conversionValues: {
      kilo: 1,
      pieza: 0.05,
      milanesa: 0.5,
    },
  },
  {
    _id: "2665646226",
    name: "Chipotle",
    category: "Enlatados",
    units: ["gramo", "lata"],
    conversionValues: {
      lata: 1,
      gramo: 0.01,
    },
  },
  {
    _id: "654854616",
    name: "Carne de Res",
    category: "Carnes",
    units: ["kilo", "pieza", "gramo"],
    conversionValues: {
      kilo: 1,
      gramo: 0.001,
      pieza: 0.2,
    },
  },
  {
    _id: "656562255",
    name: "Tortilla de Maíz",
    category: "Panadería",
    units: ["kilo", "pieza", "gramo"],
    conversionValues: {
      kilo: 1,
      gramo: 0.001,
      pieza: 0.05,
    },
  },
  {
    _id: "78945156165",
    name: "Limón",
    category: "Frutas y Verduras",
    units: ["kilo", "pieza", "gramo"],
    conversionValues: {
      kilo: 1,
      gramo: 0.001,
      pieza: 0.01,
    },
  },
  {
    _id: "897413",
    name: "Cebolla",
    category: "Frutas y Verduras",
    units: ["kilo", "pieza", "gramo"],
    conversionValues: {
      kilo: 1,
      gramo: 0.001,
      pieza: 0.25,
    },
  },
  {
    _id: "4896455",
    name: "Carne Molida",
    category: "Carnes",
    units: ["kilo", "gramo"],
    conversionValues: {
      kilo: 1,
      gramo: 0.001,
    },
  },
  {
    _id: "5615651",
    name: "Papa",
    category: "Frutas y Verduras",
    units: ["kilo", "gramo", "pieza"],
    conversionValues: {
      kilo: 1,
      gramo: 0.001,
      pieza: 0.15,
    },
  },
  {
    _id: "98815468",
    name: "Zanahoria",
    category: "Frutas y Verduras",
    units: ["kilo", "gramo", "pieza"],
    conversionValues: {
      kilo: 1,
      gramo: 0.001,
      pieza: 0.15,
    },
  },
  {
    _id: "2165156",
    name: "Tortilla de Harina",
    category: "Panadería",
    units: ["kilo", "gramo", "pieza"],
    conversionValues: {
      kilo: 1,
      gramo: 0.001,
      pieza: 0.03,
    },
  },
];
