import React, { useState, Fragment } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useHomeContext } from "../context/HomeContext";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { FaUserCog } from "react-icons/fa";




const Navbar = ({readNotificationId,readAllNotificationId}) => {
  const navigate = useNavigate();
  const {
    currentMode,
    setMode,
    isOpen,
    isSmallScreen,
    handleNav,
    toogleActiveMenu,
  } = useHomeContext();
  return (
    <div className='p-3'>
      <div className=' flex items-center justify-between'>
          <div>
          {!isOpen && (
            <FaBars
              size={30}
              className="dark:text-white text-dark-gray cursor-pointer"
              onClick={isSmallScreen ? toogleActiveMenu : handleNav}
            />
          )}
          </div>
      </div>
    </div>
  )
}

export default Navbar