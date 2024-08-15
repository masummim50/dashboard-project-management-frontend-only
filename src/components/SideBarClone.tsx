import React from "react";
import { AiFillFlag } from "react-icons/ai";
import { GiStack } from "react-icons/gi";
import { IoBookmarks } from "react-icons/io5";
import { FaCalendarCheck } from "react-icons/fa6";
import { GiPuzzle } from "react-icons/gi";
import { FaBullhorn } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import Members from "./Members";
import { IoMdClose } from "react-icons/io";

const links = [
  { title: "Campaigns", url: "/campaigns", icon: <AiFillFlag /> },
  { title: "Publications", url: "/publications", icon: <GiStack /> },
  { title: "Topics", url: "/topics", icon: <IoBookmarks /> },
  { title: "Planning", url: "/planning", icon: <FaCalendarCheck /> },
  { title: "Designing", url: "/designing", icon: <GiPuzzle /> },
  { title: "Marketing", url: "/marketing", icon: <FaBullhorn /> },
];

const SideBarClone = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [active, setActive] = React.useState(3);

  return (
    <div
      className={`px-2 fixed lg:static bg-gray-800  h-[100vh] lg:h-auto w-[100%] lg:w-auto min-w-[150px] z-10 left-0 overflow-y-auto transition-transform duration-700 ${
        showSidebar ? "scale-100 origin-top-left" : "scale-0 origin-top-right"
      } lg:scale-100`}
    >
      {/* the corner icon */}
      <div
        onClick={() => setShowSidebar(false)}
        className="block lg:hidden cursor-pointer absolute top-2 right-2 border border-white rounded-md p-3 text-white group"
      >
        <IoMdClose className="group-hover:scale-150 scale-75 transition-all" />
      </div>

      <h2 className="my-4  text-xl text-white font-bold">Projects</h2>
      {links.map((link, index) => (
        <div
          onClick={() => setActive(index)}
          key={index}
          className={`hover:shadow-[1px_1px_4px_black_inset,-1px_-1px_4px_gray_inset] cursor-pointer flex justify-between items-center text-white mb-1 bg-gray-700 rounded-md   py-2 ${
            index === active ? "bg-sky-600 " : ""
          }`}
        >
          <span className="pl-2">{link.icon}</span>
          <p className="flex-grow  pr-3 pl-1 text-xs">{link.title}</p>

          <BsThreeDots className="flex-shrink-0 pr-1" />
        </div>
      ))}
      <Members />
    </div>
  );
};

export default SideBarClone;
