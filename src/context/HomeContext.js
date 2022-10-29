import { useState, useContext, createContext, useEffect } from "react";

const homeContext = createContext();

export const useHomeContext = () => useContext(homeContext);

export const HomeProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [editServiceId, setEditServiceId] = useState(null);
  const [editBannerId, setEditBannerId] = useState(null);
  const [editBlogId, setEditBlogId] = useState(null);
  const handleNav = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
      setIsSmallScreen(true);
      setIsOpen(false);
    } else {
      setActiveMenu(true);
      setIsSmallScreen(false);
    }
  }, [screenSize]);

  const toogleActiveMenu = () => {
    setActiveMenu((prevActiveMenu) => !prevActiveMenu);
  };
  return (
    <homeContext.Provider
      value={{
        handleNav,
        activeMenu,
        setActiveMenu,
        screenSize,
        isSmallScreen,
        setIsSmallScreen,
        toogleActiveMenu,
        isOpen,
        setIsOpen,
        editServiceId,
        setEditServiceId,
        editBannerId,
        setEditBannerId,
        editBlogId,
        setEditBlogId,
      }}
    >
      {children}
    </homeContext.Provider>
  );
};
