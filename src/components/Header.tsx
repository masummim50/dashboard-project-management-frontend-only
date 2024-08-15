import { FaListOl } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";
import { FcWorkflow } from "react-icons/fc";
import { GoPlus } from "react-icons/go";
import { FaRobot } from "react-icons/fa6";
import { LuShare2 } from "react-icons/lu";
import { VscThreeBars } from "react-icons/vsc";


const middleLinks = [
    {name: 'list', icon: <FaListOl />},
    {name: 'Board', icon: <FaClipboardCheck />},
    {name: 'Workflow', icon: <FcWorkflow />},
    {name: 'View', icon: <GoPlus />},
]
const endLinks = [
    {name:'Automate', icon: <FaRobot />},
    {name: 'Share', icon: <LuShare2 />},
]

const Header = ({setShowSidebar}: {setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>}) => {

    return (
        <div className='bg-gray-800 py-4'>
            <div className="flex items-center mx-2">
                <h2 className='text-white font-bold text-sm md:text-xl hidden lg:block'>Publications</h2>
                {
                    <div onClick={() => setShowSidebar(true)} className="group flex lg:hidden  border border-white rounded-md p-2 flex-col justify-around items-center cursor-pointer text-white">
                        <VscThreeBars className="scale-100 group-hover:scale-150 transition-all"/>
                    </div>
                }
                <div className="flex-grow flex justify-between pl-2">
                    <div className="middleLinks flex gap-1">
                        {middleLinks.map((link, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 text-white cursor-pointer bg-gray-100/10 px-2 py-1 rounded-md"
                            >
                                {link.icon}
                                <p className="hidden md:block">

                                {link.name}
                                </p>

                                </div>
                        ))}
                    </div>
                    <div className="endlinks flex gap-1">
                        {endLinks.map((link, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 text-white cursor-pointer bg-gray-100/10 px-4 py-1 rounded-md"
                            >
                                {link.icon}
                                <p className="hidden md:block">

                                {link.name}
                                </p>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
            
        </div>
    );
};

export default Header;