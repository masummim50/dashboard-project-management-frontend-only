import { v4 as uuidv4 } from "uuid";
import { Dispatch, ReactNode, SetStateAction } from "react";

import { containerType, itemType } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const NewContainer = ({
  container,
  isDragging,
  setTodoItems,
  children,
}: {
  container: containerType;
  isDragging: boolean;
  setTodoItems: Dispatch<SetStateAction<itemType[]>>;
  children: ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: container.id, data: { type: "container" } });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const defaultDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  function getRandomValueInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleAddTodo = () => {
    const newTodo: itemType = {
      id: uuidv4(),
      title: `new Todo - ${new Date()}`,
      description: defaultDescription.slice(0, getRandomValueInRange(40, 150)),
      status: "todo",
      date: new Date().toISOString(),
      members: Array(Math.floor(Math.random() * 10 + 1))
        .fill("")
        .map(() => Math.floor(Math.random() * 10)),
      tags: Array(Math.floor(Math.random() * (4 - 1) + 1))
        .fill("")
        .map((_, i) => ({
          tag: `tag-${i + 1}`,
          color: Math.floor(Math.random() * 9),
        })),
      comments: 5,
    };

    setTodoItems((prev) => [{ ...newTodo }, ...prev]);
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className={`col-span-2 md:col-span-1  rounded-md   ${
        isDragging ? "opacity-30" : ""
      }`}
    >
      <h2
        className={`border-b border-b-gray-600 text-gray-600 text-sm md:text-base lg:text-xl font-bold py-3 flex justify-between items-center`}
      >
        {container.title}{" "}
        <p
          className="flex-grow border rounded-2xl py-3 text-center mx-2 border-gray-700 text-white text-xs"
          {...attributes}
          {...listeners}
        >
          Drag Handle
        </p>
        {container.id === "todo" ? (
          <button
            onClick={handleAddTodo}
            className="px-2 mr-3 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center"
          >
            +
          </button>
        ) : (
          <div
            className={`size-2 rounded-full mr-3 ${
              container.id === "in-progress"
                ? "bg-orange-600"
                : container.id === "under-review"
                ? "bg-teal-500"
                : "bg-green-600"
            } `}
          ></div>
        )}
      </h2>
      <div className="  p-2 min-h-[300px] max-h-[400px] overflow-y-scroll  md:max-h-none md:min-h-0 no-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default NewContainer;
