import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useHomeContext } from "./context/HomeContext";

import { ThreeDots } from "react-loader-spinner";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Sidebar, SmallSidebar, Navbar } from "./Components";
import { useAuth } from "./context/auth";
import { Banner, Services, Dashboard, CreateService,CreateBanner ,
  Login,Blog,CreateBlog,CreateCategory,Category, Account} from "./Pages";
import { AiTwotoneShop, AiFillSetting } from "react-icons/ai";
const App = () => {
  const [readNotificationId, setReadNotificationId] = useState(null);
  const [readAllNotificationId, setAllReadNotificationId] = useState(null);
  const { isOpen, setIsOpen, activeMenu, isSmallScreen } = useHomeContext();
  const { token, user, checked } = useAuth();

  function LoginComp() {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
  function HomeComp() {
    return (
      <>
        <div>
          <div className="flex relative w-full bg-main-bg dark:bg-main-dark-bg min-h-screen">
            {!isSmallScreen ? (
              <div
                className={`   ${isOpen ? "w-64 p-5" : "w-20 p-2"} h-screen  
    fixed transition duration-700 ease-in-out  w-full  dark:bg-secondary-dark-bg shadow-lg z-50 bg-half-transparent `}
              >
                {isOpen && (
                  <BsFillArrowLeftCircleFill
                    onClick={() => setIsOpen(!isOpen)}
                    className={` text-3xl ${
                      isOpen ? "" : "rotate-180"
                    } duration-700 transition-all   text-main-color
                   dark:text-white shadow-lg cursor-pointer absolute -right-3 top-2 z-50`}
                  />
                )}
                <Sidebar isOpen={isOpen} />
              </div>
            ) : (
              <div
                className={`${
                  activeMenu ? " duration-700 w-[260px] " : "w-0 "
                }   w-full fixed h-screen transition duration-300 ease-in-out
                 dark:bg-secondary-dark-bg shadow-lg z-40 bg-white`}
              >
                <SmallSidebar />
              </div>
            )}

            <div
              className={` duration-300  ${
                !isSmallScreen && (isOpen ? "ml-64" : " ml-20")
              }  text-white w-full    `}
            >
              <div className="sticky top-0 z-40 w-full">
                <Navbar />
              </div>
              <Routes>
                <Route path="*" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/create" element={<CreateService />} />
                <Route path="/banner" element={<Banner />} />
                <Route path="/banner/create" element={<CreateBanner />} />
                <Route path="/blog" element={<Blog />}  />
                <Route path="/blog/create" element={<CreateBlog />}  />
                <Route path="/category" element={<Category />}  />
                <Route path="/category/create" element={<CreateCategory />}  />
                <Route path="/account" element={<Account />}  />
              </Routes>
            </div>
          </div>
        </div>
      </>
    );
  }
  function RoutComp() {
    if (token && user) {
      return <HomeComp />;
    } else {
      return <LoginComp />;
    }
  }
  return (
    <div>
      <>
        {checked ? (
          <RoutComp />
        ) : (
          <div className="h-44 flex items-center justify-center min-h-screen">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#216fed"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        )}
      </>
    </div>
  );
};

export default App;
