import React from "react";
import { NavLink } from "react-router-dom";
import {sideBarLinks} from '../Utils/Data'
import {
  TbPackgeImport
} from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../context/auth";
import { useHomeContext } from "../context/HomeContext";
const Sidebar = ({isOpen}) => {
  const {setEditBannerId,setEditServiceId} = useHomeContext()
  const {logout} =useAuth();
  const activeLink = `flex items-center  gap-3 ${
    isOpen ? "pl-2 " : "justify-center my-5"
  } py-2 rounded-lg bg-blue-bg text-white font-medium m-2 `;
  const normalLink = `flex items-center  duration-700 transition-all ease-in-out  gap-3 ${
    isOpen ? "pl-2 " : "justify-center my-5"
  } py-2 rounded-lg text-[#96a0af] dark:text-gray-200 hover:text-[#216fed] dark:hover:text-main-color  m-2  font-medium m-2 `;

  return (
    <div>
      <div className="">
        <div className={`flex items-center ${!isOpen && "justify-center"}  space-x-2 pb-3`}>
          <TbPackgeImport size={40} className="text-main-color" />
          {isOpen && <h1 className="font-bold text-3xl text-dark-color dark:text-white">
            Import-Ex
          </h1>}
        </div>
        <div className="flex flex-col">
          {sideBarLinks.map((item) => (
            <div key={item.title}>
              <h1
                className={`font-medium duration-300 text-gray-700 ${
                  isOpen ? "flex" : "hidden"
                } dark:text-gray-300 text-sm`}
              >
                {item.title}
              </h1>
              {item.links.map((link) => (
                <NavLink
                key={link.name}
                  to={`/${link.link}`}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  onClick={()=>{setEditServiceId(null);setEditBannerId(null)}}
                >
                  {link.icon}
                  <span
                    className={`${
                      isOpen ? "flex" : "hidden"
                    } capitalize font-medium `}
                  >
                    {link.name}
                  </span>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
        <div onClick={logout} 
        className="flex items-center  w-full space-x-2 w-full p-2 text-dark-gray cursor-pointer">
          <BiLogOut className="text-xl"/>
          <p className="font-medium">Logout</p>
        </div>
     
      </div>
    </div>
  );
};

export default Sidebar;
