import { useEffect, useState } from "react";
import Dnd from "./components/dnd/Dnd";
import FixedSidebar from "./components/FixedSidebar";
import Header from "./components/Header";
import SideBarClone from "./components/SideBarClone";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }})
  },[])
  return (
    <div>
      {/* fixed sidebar */}
      <FixedSidebar />

      {/* the other part */}
      <div className="mb-[50px] lg:ml-[50px] lg:mb-0">
        {/* flex items, sidebar and container with a header */}
        <div className="flex">
          <SideBarClone showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
          <div className=" flex flex-col flex-grow">
            <Header setShowSidebar={setShowSidebar}/>
            <div className="p-2">
              <Dnd />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
