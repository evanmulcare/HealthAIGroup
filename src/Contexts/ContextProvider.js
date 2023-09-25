import React, { createContext, useContext, useState } from "react";

// Create a new context
const StateContext = createContext();
const initialState = {
  activeMenu: false,
  screenSize: window.innerWidth,
};
// Create a provider component that will wrap the children components
export const ContextProvider = ({ children }) => {
  // Set the initial state values using the useState hook
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);
  const [state, setState] = useState(initialState);


  // Create a function that sets isClicked to true for a specific value
  const handleClick = (clicked) => {
    setIsClicked(clicked);
  };

  return (
    // Pass the state values and functions to the context provider
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

// Create a custom hook that allows components to access the state values and functions from the context
export const useStateContext = () => useContext(StateContext);
