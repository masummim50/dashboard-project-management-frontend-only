import React from "react";
import { AiFillFlag } from "react-icons/ai";
import { GiStack } from "react-icons/gi";
import { IoBookmarks } from "react-icons/io5";
import { FaCalendarCheck } from "react-icons/fa6";
import { GiPuzzle } from "react-icons/gi";
import { FaBullhorn } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import Members from "./Members";

const links = [
  { title: "Campaigns", url: "/campaigns", icon: <AiFillFlag /> },
  { title: "Publications", url: "/publications", icon: <GiStack /> },
  { title: "Topics", url: "/topics", icon: <IoBookmarks /> },
  { title: "Planning", url: "/planning", icon: <FaCalendarCheck /> },
  { title: "Designing", url: "/designing", icon: <GiPuzzle /> },
  { title: "Marketing", url: "/marketing", icon: <FaBullhorn /> },
];

const SideBar = () => {
  const [active, setActive] = React.useState(3);
  return (
    <div className="px-3 bg-gray-800 hidden lg:block min-h-[100vh]">
      <h2 className="my-4 text-xl text-white font-bold">Projects</h2>
      {links.map((link, index) => (
        <div
        onClick={() => setActive(index)}
          key={index}
          className={`hover:shadow-[1px_1px_4px_black_inset,-1px_-1px_4px_gray_inset] cursor-pointer flex gap-1 justify-between items-center text-white mb-1 bg-gray-700 rounded-xl px-3 py-2 ${
            index === active ? "bg-sky-600 " : ""
          }`}
        >
          {link.icon}
          <p className="flex-grow pr-3">
            {link.title}
          </p>
          <BsThreeDots />
        </div>
      ))}
      <Members />
    </div>
  );
};

export default SideBar;
