import React, { useState } from 'react';
import { links } from '../Data/Links';
import { NavLink } from 'react-router-dom';
import { BiHealth, BiMenu, BiX } from 'react-icons/bi';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeLink = 'flex items-center gap-2 pl-4 pt-3 pb-2.5 rounded-lg text-sky-700 text-md m-2';
  const normalLink = 'flex items-center gap-2 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 hover:bg-light-gray m-2';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav>
      <div className="flex items-center justify-between mx-auto p-2">
        <div className="flex items-center">
          <BiHealth className="text-3xl mr-3 text-blue-500" />
          <span className="text-2xl text-gray-800 font-semibold">HealthAI</span>
        </div>
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <BiX className="text-4xl" /> : <BiMenu className="text-4xl" />}
        </button>
        {isMobileMenuOpen && (
          <div className="md:hidden w-full">
            <ul className="flex flex-col space-y-2">
              {links.map((item) => (
                <li key={item.id}>
                  {item.links.map((link) => (
                    <NavLink
                      to={`/${link.name}`}
                      key={link.name}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      {link.icon}
                      <span className="capitalize">{link.name}</span>
                    </NavLink>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-row md:space-x-1">
            {links.map((item) => (
              <li className='flex' key={item.id}>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name} // Add a key here
                    className={({ isActive }) => isActive ? activeLink : normalLink}
                  >
                    {link.icon}
                    <span className='capitalize'>
                      {link.name}
                    </span>
                  </NavLink>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
