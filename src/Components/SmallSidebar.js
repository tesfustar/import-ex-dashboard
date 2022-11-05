import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useHomeContext } from "../context/HomeContext";
import { sideBarLinks } from "../Utils/Data";
import { BiLogOut } from "react-icons/bi";
const SmallSidebar = () => {
  const { logout } = useAuth();
  const {
    activeMenu,
    setActiveMenu,
    screenSize,
    setEditBannerId,
    setEditServiceId,
    setEditServiceCategoryId,
    setEditBlogId
  } = useHomeContext();

  const handleCloseSideBar = () => {
    if (activeMenu == true && screenSize <= 900) {
      setActiveMenu(false);

    }
  };
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 rounded-lg bg-[#216fed] text-white font-medium m-2 pb-2";
  const normalLink =
    "flex   duration-700 items-center gap-5 pl-4 pt-3 rounded-lg text-gray-700 dark:text-gray-200 hover:text-[#216fed] to-[#F8DE8F]  m-2  font-medium m-2 pb-2";

  return (
    <div className="ml-3 relative h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="mt-10 ">
            <div className="">
              {sideBarLinks.map((item) => (
                <div key={item.title}>
                  <h1 className="font-medium text-[#96a0af] dark:text-gray-300 text-sm">
                    {item.title}
                  </h1>
                  {item.links.map((link) => (
                    <NavLink
                      key={link.name}
                      to={`/${link.link}`}
                      // onClick={handleCloseSideBar}
                      onClick={() => {
                        handleCloseSideBar();
                        setEditServiceId(null);
                        setEditBannerId(null);
                        setEditServiceCategoryId(null);
                        setEditBlogId(null)
                      }}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      {link.icon}
                      <span className="capitalize font-medium ">
                        {link.name}
                      </span>
                    </NavLink>
                  ))}
                </div>
              ))}
            </div>
            <div onClick={logout} 
        className="flex items-center  w-full space-x-2  p-2 text-dark-gray cursor-pointer">
          <BiLogOut className="text-xl"/>
          <p className="font-medium">Logout</p>
        </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SmallSidebar;
