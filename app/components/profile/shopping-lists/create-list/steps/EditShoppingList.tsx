import { CheckIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Button from "@/app/components/UI/Button";
import { addPlural } from "@/app/utils/textManipulation/addPlural";
import { ShoppingListCategory } from "@/app/types/ShoppingList";

type Props = {
  shoppingList: ShoppingListCategory[];
};

export default function EditShoppingList({ shoppingList }: Props) {
  const [editItem, setEditItem] = useState({
    category: "",
    itemId: 0,
  });

  return (
    <div className="flex flex-col gap-8">
      {shoppingList.map((listCategory) => (
        <div key={listCategory.category}>
          <h3 className="mb-2 text-xl font-semibold">
            {listCategory.category}
          </h3>
          <ul className="flex flex-col gap-2">
            {listCategory.ingredients.map((ingredient) => {
              if (
                editItem.category === listCategory.category &&
                editItem.itemId === ingredient.id
              )
                return (
                  <li
                    className="flex items-center justify-between gap-4 rounded-lg border border-transparent bg-gray-100 p-2"
                    key={ingredient.id}
                  >
                    <input
                      className="w-full rounded-md p-2"
                      type="text"
                      defaultValue={`${ingredient.name} - ${ingredient.quantity} ${ingredient.unit}${addPlural(ingredient.quantity)}`}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        className="flex items-center justify-center rounded-md bg-white p-3"
                        onClick={() => {
                          setEditItem({ category: "", itemId: 0 });
                        }}
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                      <button className="flex items-center justify-center rounded-md bg-primary p-3 text-white">
                        <CheckIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                );
              return (
                <li
                  className="flex items-center justify-between gap-2 rounded-lg border p-2"
                  key={ingredient.id}
                >
                  <p className="pl-2">
                    {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                    {addPlural(ingredient.quantity)}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      className="flex items-center justify-center rounded-md p-3"
                      onClick={() => {
                        setEditItem({
                          category: listCategory.category,
                          itemId: ingredient.id,
                        });
                      }}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button className="flex items-center justify-center rounded-md p-3">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
            <li>
              <button className="mt-2 rounded-md border bg-gray-100 px-2 py-1">
                + Agregar
              </button>
            </li>
          </ul>
        </div>
      ))}
      <div>
        <h3 className="mb-2 text-xl font-semibold">Extras</h3>
        <button className="mt-2 rounded-md border bg-gray-100 px-2 py-1">
          + Agregar
        </button>
      </div>
      <Button type="button">Crear Lista</Button>
    </div>
  );
}
