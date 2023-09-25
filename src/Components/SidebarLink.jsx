import React from 'react'
import { NavLink } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';

const SidebarLink = ({ links }) => {
  // Extract activeMenu, setActiveMenu, and screenSize from context
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  // Function to close sidebar if activeMenu is true and screenSize is less than or equal to 900
  const handleCloseSideBar = () => {
      if(activeMenu && screenSize <= 900) {
        setActiveMenu(false)
      }
    }
    
  // CSS classes for active and normal links
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-sky-700 text-md m-2'
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 hover:bg-light-gray m-2' 

  return (
    <div className='ml-3 h-screen overflow-auto pb-10'>
      {activeMenu && (
        <>
          {/* ...other JSX... */}
          <div className='mt-10'>
            {links.map((item) => (
              <div key={item.title}>
                <p className='text-gray-400 m-3 mt-4 uppercase'>
                  {item.title}
                </p>
                {/* Map over links in each category and render NavLink for each */}
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    className={({ isActive }) => isActive ? activeLink : normalLink}
                  >
                    {link.icon}
                    <span className='capitalize'>
                      {link.name}
                    </span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};


export default SidebarLink;
