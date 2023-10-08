
import { BsFillPersonFill } from 'react-icons/bs'
import { FaUsers, FaRobot } from 'react-icons/fa'
import { AiFillHome, AiFillUnlock } from 'react-icons/ai'

export const links = [
  {

    title: 'Dashboard',
    links: [

      {
        name: 'Dashboard',
        icon: <AiFillHome />,
      }
    ],
  },

  {
    title: 'Patients',
    links: [
      {
        name: 'Patients',
        icon: <FaUsers />,
      },
      {
        name: 'HealthAI',
        icon: <FaRobot />,
      }
    ],
  },

  {
    title: 'Account',
    links: [
      {
        name: 'Profile',
        icon: <BsFillPersonFill />,
      },
      {
        name: 'Exit',
        icon: <AiFillUnlock />,
      },
    ],
  },
];
