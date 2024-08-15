import React from "react";
import { GrProjects } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { FaComments } from "react-icons/fa6";
import { HiSquares2X2 } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";
import { FaChartArea } from "react-icons/fa";
import { SiGitforwindows } from "react-icons/si";
import { IoIosClock } from "react-icons/io";

const icons = [
  { icon: <FaHome /> },
  { icon: <FaComments /> },
  { icon: <HiSquares2X2 /> },
  { icon: <FaHeart /> },
  { icon: <FaChartArea /> },
  { icon: <SiGitforwindows /> },
  { icon: <IoIosClock /> },
];

const topValue = [
  "lg:top-[4px]",
  "lg:top-[40px]",
  "lg:top-[76px]",
  "lg:top-[112px]",
  "lg:top-[148px]",
  "lg:top-[184px]",
  "lg:top-[220px]",
];

const horizontalValues = [
  "left-[4px]",
  "left-[40px]",
  "left-[76px]",
  "left-[112px]",
  "left-[148px]",
  "left-[184px]",
  "left-[220px]",
];

const FixedSidebar = () => {
  const [active, setActive] = React.useState(3);
  return (
    <div className="fixed z-[5] w-[100vw] h-[50px] bottom-0 lg:top-0 bg-gray-800 lg:h-[100vh] lg:w-[50px] border-r border-r-gray-700">
      <div className="absolute top-[10px] left-[50%] translate-x-[-50%] text-sky-500 font-xl hidden lg:block">
        <GrProjects />
      </div>
      <div className="h-[50px] lg:h-[100vh] flex flex-row lg:flex-col justify-center">
        <div className="relative  flex flex-row lg:flex-col justify-center p-1 gap-1">
          {icons.map((icon, index) => (
            <div
              onClick={() => setActive(index)}
              key={index}
              className={`cursor-pointer  rounded-lg flex items-center justify-center p-2 text-white ${
                active === index ? "bg-transparent" : "bg-white/10"
              }`}
            >
              {icon.icon}
            </div>
          ))}
          <div
            className={`shadow-[0px_0px_10px_#38bdf8] absolute w-[32px] lg:w-[40px] rounded-lg z-[-1] h-[40px] lg:h-[32px] transition-all ease-linear left-[${
              active * 32 + (active + 1) * 4
            }px] lg:left-[4px] bg-sky-400 top-[4px] lg:top-[${
              active * 32 + ((active + 1) * 4)
            }px]`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FixedSidebar;
