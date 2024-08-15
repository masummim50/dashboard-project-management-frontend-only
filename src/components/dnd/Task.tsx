import { useSortable } from "@dnd-kit/sortable";
import { itemType } from "./types";
import { CSS } from "@dnd-kit/utilities";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";

import { FaCalendar } from "react-icons/fa";
import TaskMembers from "./TaskMembers";

const Task = ({
  item,
  isDragging,
  isOverlay = false
}: {
  item: itemType;
  isDragging: boolean;
  isOverlay?: boolean
}) => {
  // console.log("task item: ", item)
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id, data: { type: "item", status: item.status } });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const colors = [
    "bg-pink-600",
    "bg-violet-600",
    "bg-yellow-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-red-600",
    "bg-purple-600",
    "bg-orange-600",
    "bg-teal-600",
    "bg-sky-600",
  ];

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);

      // Options for formatting
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
      };

      // Format the date
      return new Intl.DateTimeFormat("en-GB", options).format(date);
    } catch (error) {
      if(error) console.log("")
      return "";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${isOverlay ? 'bg-gray-700' : 'bg-gray-800'} transition-colors duration-1000 rounded-md my-3 p-2 text-white ${
        isDragging ? "border-dashed border border-white/50" : ""
      }`}
    >
      <div className={`${isDragging ? "opacity-20" : ""}`}>
        <div className="flex justify-between my-3">
          <div className="flex flex-wrap text-[8px] gap-1">
            {item?.tags?.map((tag, index) => (
              <span
                key={index}
                className={`p-1 ${colors[tag.color]} rounded-full px-1 inline-block text-white`}
              >
                {tag.tag}
              </span>
            ))}
          </div>
          <BsThreeDotsVertical />
        </div>
        <h2 className="text-white text-sm">{item?.title}</h2>
        <p className="text-white/40 text-xs">{item?.description}</p>
        <span className="text-[8px] my-3 inline-block text-white rounded-md px-2 py-1 border border-white/20 ">
          <FaCalendar className="inline-block text-center" />{" "}
          {formatDate(item?.date)}
        </span>
        <div className="bg-white/20 h-[1px] rounded-full mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <TaskMembers members={item?.members}/>
          </div>
          <div className="flex items-center text-sm gap-2 text-white/40">
            <FaCommentAlt className="inline-block text-center" />
            <p className=" text-sm">{item?.comments}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
