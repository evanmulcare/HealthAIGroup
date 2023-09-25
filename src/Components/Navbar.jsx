import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineMenu} from 'react-icons/ai';
import { useStateContext } from '../Contexts/ContextProvider';

// Navigation button component
const NavButton = ({ customFunc, icon }) => (
  <button type='button' onClick={customFunc} className="relative text-xl rounded-full p-3 hover:bg-light-gray">
    <span
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 text-gray-700"
    />
    {icon}

  </button>
)

const Navbar = () => {
  const { setActiveMenu} = useStateContext();
  
  return (
    <div className="flex justify-between p-2 md:mx-6 relative text-gray-700">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu(prevActiveMenu => !prevActiveMenu)}
        icon={<AiOutlineMenu />}
      />
     
    </div>
  );
};

export default Navbar;
