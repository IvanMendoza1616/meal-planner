"use client";
import { ShoppingList } from "@/app/types/ShoppingList";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type Props = {
  initialShoppingList: ShoppingList;
};

export default function ShoppingListElement({ initialShoppingList }: Props) {
  const [shoppingList, setShoppingList] = useState(initialShoppingList);
  const [selectedItem, setSelectedItem] = useState({
    category: "",
    itemIndex: -1,
    value: "",
  });
  const [extraItem, setExtraItem] = useState("");
  const [selectedExtraItem, setSelectedExtraItem] = useState({
    itemIndex: -1,
    value: "",
  });

  const resetSelectedItem = () => {
    setSelectedItem({
      category: "",
      itemIndex: -1,
      value: "",
    });
  };

  //Check overwritting array directly, maybe make it look like updateSelectedExtraItem()
  const updateSelectedItem = () => {
    setShoppingList((prevState) => {
      const updatedList = prevState.shoppingList.map((list) => {
        if (selectedItem.category === list.category) {
          list.items[selectedItem.itemIndex] = selectedItem.value;
        }
        return list;
      });
      return {
        ...prevState,
        shoppingList: updatedList,
      };
    });
  };

  const deleteSelectedItem = (category: string, index: number) => {
    setShoppingList((prevState) => {
      const updatedList = prevState.shoppingList.map((list) => {
        const updatedItems = list.items.filter((item, itemIndex) => {
          return category !== list.category || index !== itemIndex;
        });

        return { ...list, items: updatedItems };
      });
      return {
        ...prevState,
        shoppingList: updatedList,
      };
    });
  };

  const addExtraItem = () => {
    if (extraItem.trim())
      setShoppingList((prevState) => ({
        ...prevState,
        extra: [...prevState.extra, extraItem.trim()],
      }));
  };

  const resetExtraItem = () => {
    setExtraItem("");
  };

  const resetSelectedExtraItem = () => {
    setSelectedExtraItem({
      itemIndex: -1,
      value: "",
    });
  };

  const updateSelectedExtraItem = () => {
    setShoppingList((prevState) => {
      const updatedExtraItems = prevState.extra.map((item, index) => {
        if (index === selectedExtraItem.itemIndex)
          return selectedExtraItem.value;
        return item;
      });
      return {
        ...prevState,
        extra: updatedExtraItems,
      };
    });
  };

  const deleteSelectedExtraItem = (index: number) => {
    setShoppingList((prevState) => {
      const updatedExtraItems = prevState.extra.filter(
        (item, indexItem) => index !== indexItem,
      );
      return {
        ...prevState,
        extra: updatedExtraItems,
      };
    });
  };

  return (
    <div className="mb-8 flex flex-col gap-8">
      {shoppingList.shoppingList.map((categoryList) => {
        if (categoryList.items.length > 0)
          return (
            <div key={categoryList.category}>
              <h3 className="mb-1 text-xl font-semibold">
                {categoryList.category}
              </h3>
              <div className="flex flex-col gap-2">
                {categoryList.items.map((ingredient, index) => {
                  if (
                    categoryList.category === selectedItem.category &&
                    index === selectedItem.itemIndex
                  )
                    return (
                      <div
                        key={ingredient + index}
                        className="flex items-center gap-4"
                      >
                        <input
                          type="text"
                          value={selectedItem.value}
                          onChange={(e) => {
                            setSelectedItem((prevState) => ({
                              ...prevState,
                              value: e.target.value,
                            }));
                          }}
                          className="w-full rounded-md border px-2 py-1"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            className="rounded-md border p-2"
                            onClick={resetSelectedItem}
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                          <button
                            className="rounded-md bg-primary p-2 text-white"
                            onClick={() => {
                              updateSelectedItem();
                              resetSelectedItem();
                            }}
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  return (
                    <div
                      key={ingredient + index}
                      className="flex items-center justify-between gap-8 rounded-md px-2 py-1 hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer"
                          name=""
                          id=""
                        />
                        <p>{ingredient}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => {
                            setSelectedItem({
                              category: categoryList.category,
                              itemIndex: index,
                              value: ingredient,
                            });
                          }}
                        >
                          <PencilSquareIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            deleteSelectedItem(categoryList.category, index);
                          }}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
      })}
      <div>
        <h3 className="mb-1 text-xl font-semibold">Extra</h3>
        <div className="flex flex-col gap-2">
          {shoppingList.extra.map((item, index) => {
            if (index === selectedExtraItem.itemIndex)
              return (
                <div key={item + index} className="flex items-center gap-4">
                  <input
                    type="text"
                    value={selectedExtraItem.value}
                    onChange={(e) => {
                      setSelectedExtraItem((prevState) => ({
                        ...prevState,
                        value: e.target.value,
                      }));
                    }}
                    className="w-full rounded-md border px-2 py-1"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      className="rounded-md border p-2"
                      onClick={resetSelectedExtraItem}
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-md bg-primary p-2 text-white"
                      onClick={() => {
                        updateSelectedExtraItem();
                        resetSelectedExtraItem();
                      }}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            return (
              <div
                key={item + index}
                className="flex items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer"
                    name=""
                    id=""
                  />
                  <p>{item}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setSelectedExtraItem({
                        itemIndex: index,
                        value: item,
                      });
                    }}
                  >
                    <PencilSquareIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      deleteSelectedExtraItem(index);
                    }}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
          <div className="mt-2 flex items-center gap-2">
            <input
              className="rounded-md border px-2 py-1"
              type="text"
              placeholder="Agrega un producto..."
              value={extraItem}
              onChange={(e) => {
                setExtraItem(e.target.value);
              }}
            />
            <button
              className="rounded-md border px-4 py-1"
              onClick={() => {
                addExtraItem();
                resetExtraItem();
              }}
            >
              + Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
