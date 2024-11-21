import ProfileContainer from "@/app/components/profile/ProfileContainer";
import client from "@/app/lib/db";
import { ShoppingList } from "@/app/types/ShoppingList";
import { getFormattedDate } from "@/app/utils/textManipulation/getFormattedDate";
import getSession from "@/app/utils/getSession";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObjectId } from "mongodb";
import Link from "next/link";
import ShoppingListElement from "@/app/components/profile/shopping-lists/list/ShoppingListElement";

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
    <div>
      <Link
        href="/profile/shopping-lists"
        className="mb-2 flex w-20 items-center gap-1 px-2"
      >
        <FontAwesomeIcon className="mt-0.5 h-2 w-2" icon={faChevronLeft} />
        <span>Volver</span>
      </Link>
      <ProfileContainer>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">Mi lista del super</h3>
          <p className="text-sm text-gray-500">
            Creada el {getFormattedDate(shoppingList.createdAt)}
          </p>
        </div>
        <ShoppingListElement initialShoppingList={shoppingList} />
      </ProfileContainer>
    </div>
  );
}
