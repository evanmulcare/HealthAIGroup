import React from 'react';
import { links } from '../Data/Links';
import SidebarLink from './SidebarLink';
import { AiOutlineMenu } from 'react-icons/ai';
import { useStateContext } from '../Contexts/ContextProvider';

const NavButton = ({ customFunc, icon }) => (
  <button type='button' onClick={customFunc} className="relative text-xl rounded-full p-3">
    <span
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 text-gray-700 "
    />
    {icon}

  </button>
)

const Sidebar = () => {
  const { setActiveMenu } = useStateContext();

  return (
    <div>
      <div className="flex justify-between p-2 relative text-gray-700">
      <SidebarLink links={links} />

      </div>
    
    </div>
  );
};

export default Sidebar;
