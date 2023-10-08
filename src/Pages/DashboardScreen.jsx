import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiArrowRightSLine } from 'react-icons/ri';
import { LineChart, Line, ResponsiveContainer, BarChart, Bar } from 'recharts';
import DefaultProfile from '../Assets/DefaultProfile.png';
import MetricOneData from '../Data/MetricOneData';
import MetricTwoData from '../Data/MetricTwoData';
import { getUsers } from '../Contexts/actionCreators/ userActionCreator';
import Calender from '../Components/Calender';
import { useDate } from '../Hooks/useDate';

const DashboardScreen = () => {

  const { formattedDate } = useDate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const selectUsers = (state) => state.users.users;
  const userData = useSelector(selectUsers);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const currentUserData = userData.find(user => user.docId === currentUser?.uid);


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
          <Calender />
        </div>
      </div>


      <div className='grid grid-cols-2 gap-4 mt-10'>
        <div>
          <div>
            <h2 className='font-semibold text-lg text-gray-800'>Metric 1</h2>
          </div>
          <div className='col-span-1 bg-white border rounded-md h-96'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={MetricOneData}>
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
              <LineChart width={300} height={100} data={MetricTwoData}>
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