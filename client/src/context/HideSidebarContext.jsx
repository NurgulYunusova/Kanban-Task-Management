/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const HideSidebarContext = createContext();

export const HideSidebarProvider = ({ children }) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const hideSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  return (
    <HideSidebarContext.Provider
      value={{ isSidebarHidden, setIsSidebarHidden, hideSidebar }}
    >
      {children}
    </HideSidebarContext.Provider>
  );
};
