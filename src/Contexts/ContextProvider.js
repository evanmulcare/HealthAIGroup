import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();
const initialState = {
  activeMenu: false,
  screenSize: window.innerWidth,
};
export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);
  const [state, setState] = useState(initialState);


  const handleClick = (clicked) => {
    setIsClicked(clicked);
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        state, setState
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
