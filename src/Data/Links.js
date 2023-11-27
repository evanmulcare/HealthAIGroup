//Links for Navbar with there corrosponding icons
import { BsFillPersonFill } from 'react-icons/bs'
import { FaUsers, FaRobot } from 'react-icons/fa'
import { AiFillHome, AiFillUnlock } from 'react-icons/ai'

export const links = [
  {

    title: 'Dashboard',
    links: [

      {
        name: 'navBar.dashboard',
        path: 'Dashboard',
        icon: <AiFillHome />,
      }
    ],
  },

  {
    title: 'Patients',
    links: [
      {
        name: 'navBar.patients',
        path: 'Patients',
        icon: <FaUsers />,
      },
      {
        name: 'navBar.healthai',
        path: 'HealthAI',
        icon: <FaRobot />,
      }
    ],
  },

  {
    title: 'Account',
    links: [
      {
        name: 'navBar.profile',
        path: 'Profile',
        icon: <BsFillPersonFill />,
      },
      {
        name: 'navBar.exit',
        path: 'Exit',
        icon: <AiFillUnlock />,
      },
    ],
  },
];
