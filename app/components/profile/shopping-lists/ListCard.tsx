"use client";
import { ShoppingList } from "@/app/types/ShoppingList";
import { getFormattedDate } from "@/app/utils/textManipulation/getFormattedDate";
import Link from "next/link";
import Button from "../../UI/Button";
import { TrashIcon } from "@heroicons/react/24/solid";
import deleteShoppingList from "@/app/actions/deleteShoppingList";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  shoppingList: ShoppingList;
};

export default function ListCard({ shoppingList }: Props) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <div
      key={shoppingList._id.toString()}
      className="relative flex flex-col gap-4 overflow-hidden rounded-md border p-4 pr-12 shadow-md"
    >
      {isRemoving ? (
        <div>
          <p className="mb-4">¿Seguro que deseas eliminar esta lista?</p>
          <div className="flex items-center justify-center gap-8">
            <button
              className="rounded-md border px-4 py-[7px]"
              onClick={() => {
                setIsRemoving(false);
              }}
            >
              Cancelar
            </button>
            <Button
              type="button"
              onClick={async () => {
                setIsLoading(false);
                await deleteShoppingList(shoppingList._id.toString());
                setIsLoading(true);
                router.refresh();
              }}
            >
              Borrar
            </Button>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={() => {
              setIsRemoving(true);
            }}
            className="absolute right-2 top-2 flex items-center justify-center rounded-full bg-gray-100 p-2"
          >
            <TrashIcon className="h-4 w-4" />
          </button>

          <p>Lista del {getFormattedDate(shoppingList.createdAt)}</p>
          <Link
            href={`/profile/shopping-lists/list/${shoppingList._id.toString()}`}
          >
            <Button type="button">Ver Lista</Button>
          </Link>
        </>
      )}
      {isLoading && (
        <div className="absolute left-0 top-0 h-full w-full bg-white bg-opacity-50" />
      )}
    </div>
  );
}
