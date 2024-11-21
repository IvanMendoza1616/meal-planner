import ProfileContainer from "@/app/components/profile/ProfileContainer";
import client from "@/app/lib/db";
import { ShoppingList } from "@/app/types/ShoppingList";
import { addPlural } from "@/app/utils/textManipulation/addPlural";
import getSession from "@/app/utils/getSession";
import { ObjectId } from "mongodb";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getSession("/profile/recipes");

  const [result] = (await client
    .db("mealPlanner")
    .collection("shoppingLists")
    .find({ _id: new ObjectId(params.id), user: session.user.email })
    .toArray()) as unknown as ShoppingList[];

  //Converting ObjectId to string
  const shoppingList = {
    ...result,
    _id: result._id.toString(),
  };

  console.log(shoppingList);

  return (
    <ProfileContainer>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold">Mi lista del super</h3>
        <p>Esta lista se creo en {shoppingList.createdAt.toDateString()}</p>
      </div>
      <div className="flex flex-col gap-4">
        {shoppingList.shoppingList.map((categoryList) => (
          <div key={categoryList.category}>
            <h3 className="mb-1 text-xl font-semibold">
              {categoryList.category}
            </h3>
            {categoryList.ingredients.map((ingredient) => (
              <div key={ingredient.id} className="flex items-center gap-2">
                <input type="checkbox" name="" id="" />
                <p>
                  {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                  {addPlural(ingredient.quantity)}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </ProfileContainer>
  );
}
