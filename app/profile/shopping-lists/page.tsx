import ProfileContainer from "@/app/components/profile/ProfileContainer";
import ListCard from "@/app/components/profile/shopping-lists/ListCard";
import Button from "@/app/components/UI/Button";
import client from "@/app/lib/db";
import { ShoppingList } from "@/app/types/ShoppingList";
import getSession from "@/app/utils/getSession";
import Link from "next/link";

export default async function Page() {
  const session = await getSession("/profile/shopping-lists");

  const result = (await client
    .db("mealPlanner")
    .collection("shoppingLists")
    .find({ user: session.user.email })
    .sort({ createdAt: -1 })
    .toArray()) as unknown as ShoppingList[];

  const shoppingLists = result.map((shoppingList) => ({
    ...shoppingList,
    _id: shoppingList._id.toString(),
  }));

  return (
    <ProfileContainer>
      <div className="mb-12">
        <h1 className="text-2xl font-semibold">Mis Listas de Compras</h1>
        <p className="text-gray-500">Crea y edita tus listas de compras</p>
      </div>
      <Link
        className="mb-8 flex justify-self-start"
        href="/profile/shopping-lists/create-list"
      >
        <Button type="button">+ Nueva Lista</Button>
      </Link>
      <div className="grid grid-cols-3 gap-4">
        {shoppingLists.map((shoppingList) => (
          <ListCard
            key={shoppingList._id.toString()}
            shoppingList={shoppingList}
          />
        ))}
      </div>
    </ProfileContainer>
  );
}
