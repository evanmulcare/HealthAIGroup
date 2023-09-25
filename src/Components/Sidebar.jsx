import React from 'react';
import { links } from '../Data/Links';
import SidebarLink from './SidebarLink';

const Sidebar = () => {
  return (
    <div className='ml-3 md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
        <SidebarLink links={links}  />
    </div>
  );
};

export default Sidebar;
