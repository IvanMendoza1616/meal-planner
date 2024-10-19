"use server";
import client from "../lib/db";
import { Ingredient } from "../types/Recipe";
import { generateSlug } from "../utils/generateSlug";
import validateForm from "./utils/validateForm";

export default async function createRecipe(
  formData: FormData,
  user: string,
  ingredients: Ingredient[],
) {
  const requiredFields = validateForm(formData, [
    "name",
    "category",
    "servings",
  ]);
  if (!requiredFields) return; //Do something if not all required fields are filled

  const preparation = formData.get("preparation");
  const preparationMinutes = formData.get("preparation-minutes");

  // Need to upload image
  const image =
    "https://theme-assets.getbento.com/sensei/959dc04.sensei/assets/images/catering-item-placeholder-704x520.png";
  const createdAt = new Date();

  //Create recipe
  const response = await client
    .db("mealPlanner")
    .collection("recipes")
    .insertOne({
      ...requiredFields,
      image,
      ingredients,
      preparation,
      preparationMinutes,
      user,
      createdAt,
      slug: "",
    });

  //Update slug with newly created recipe id
  await client
    .db("mealPlanner")
    .collection("recipes")
    .updateOne(
      {
        _id: response.insertedId,
      },
      {
        $set: {
          slug: `${generateSlug(requiredFields.name as string)}-${response.insertedId.toString()}`,
        },
      },
    );
}
