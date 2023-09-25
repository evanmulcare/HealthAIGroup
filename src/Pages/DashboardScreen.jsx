import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Link } from 'react-router-dom'
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import Calendar from 'react-calendar';
import DefaultProfile from '../Assets/DefaultProfile.png';
import { RiArrowRightSLine } from 'react-icons/ri';
import { LineChart, Line, ResponsiveContainer, BarChart, Bar } from 'recharts';

const DashboardScreen = () => {

  const barData = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];


const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];


  const [currentUserData, setCurrentUserData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      const fetchCurrentUserData = async () => {
        try {
          const userRef = collection(db, 'users');
          const snapshot = await getDocs(userRef);

          snapshot.forEach(async doc => {
            if (doc.id === currentUser.uid) {
              const userData = doc.data();
              setCurrentUserData(userData);
            }
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchCurrentUserData();
    }
  }, [currentUser]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };


  function formatDate(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  }

  const today = new Date();
  const formattedDate = formatDate(today);

  return (
    <div className=' mt-10 h-full w-full pl-10 pr-10 pb-10'>
      <div className='w-full '>
      <div className=''>
            <div className='flex justify-between mb-2'>
              <div className="text-4xl  font-semibold text-gray-800 ml-2 mb-2">
                Good Day, {currentUserData?.firstname}
              </div>
              <div className='space-x-2 mt-1'>
                <button className='rounded-md px-4 py-2 bg-gray-800 text-white text-sm font-normal'>
                  {formattedDate}
                </button>

                <button className='rounded-md px-4 py-2 bg-blue-500 text-white text-sm font-normal'>
                  Export Metrics
                </button>
              </div>

            </div>

          </div>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-2 h-full'>
         
        
          <Link to={``}>
            <div
              className='rounded-2xl shadow-md p-6 h-full cursor-pointer transform hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-500 to-blue-700 bg-pattern'
            >
              <div className='flex justify-between items-center mb-4'>
                <div className='text-3xl font-semibold text-white '>Patients</div>
                <RiArrowRightSLine size={30} className='text-white ' />
              </div>
              <p className='text-md text-gray-100 mb-6'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate soluta, autem quas commodi repudiandae cumque animi quisquam. Magnam, unde aliquam!.</p>
              {/* Interactive button */}
              <button className="flex items-center text-white hover:text-gray-200 transition duration-300">
                <span>View Patient Data</span>
                <RiArrowRightSLine size={20} className="ml-2" />
              </button>
            </div>

          </Link>
        </div>

        <div className='col-span-1 rounded-md h-full '>
          <div className='p-4 mb-2 border flex items-center bg-white rounded-2xl'>

            <div className="h-32 w-32 rounded-full overflow-hidden">
              <img
                src={
                  currentUserData && currentUserData.profileimg !== "" && currentUserData.profileimg !== undefined
                    ? currentUserData.profileimg
                    : DefaultProfile
                }
                alt="Profile"
                className="h-full w-full object-cover rounded-full bg-black opacity-90"
              />
            </div>

            <div className="mt-3 ml-5">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-left">
                {currentUserData?.firstname} {currentUserData?.lastname}
              </h2>
              <div className="md:mt-2">
                <h3 className="text-sm text-gray-500 md:text-gray-400">
                  {currentUserData?.email}
                </h3>
              </div>
            </div>
          </div>
          <div className='w-full rounded-lg shadow-md p-4 border border-gray-300 bg-white'>
            <div className='w-full'>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                view='month'
                showNeighboringMonth={false}
                tileContent={({ date, view }) => {
                  if (view === 'month' && isToday(date)) {
                    return (
                      <div className='bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto'>
                        {date.getDate()}
                      </div>
                    );
                  }
                }}
              />
            </div>

          </div>
        </div>
      </div>
            

      <div className='grid grid-cols-2 gap-4 mt-10'>
                <div>
                    <div>
                        <h2 className='font-semibold text-lg text-gray-800'>Metric 1</h2>
                    </div>
                <div className='col-span-1 bg-white border rounded-md h-96'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={150} height={40} data={barData}>
                            <Bar dataKey="uv" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                </div>
                <div>
                <div>
                        <h2 className='font-semibold text-lg text-gray-800'>Metric 2</h2>
                    </div>
                <div className='col-span-1 bg-white border rounded-md h-96'>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart width={300} height={100} data={data}>
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                </div>

            </div>

    </div>
  )
}

export default DashboardScreen