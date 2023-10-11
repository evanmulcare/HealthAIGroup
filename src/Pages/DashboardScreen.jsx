import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiArrowRightSLine } from 'react-icons/ri';
import DefaultProfile from '../Assets/DefaultProfile.png';
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
    <div className='mt-2 pl-10 pr-10 pb-10'>
      <div className="flex flex-col md:flex-row justify-center items-center md:justify-between mb-5">
        <div className="text-4xl font-semibold text-gray-800 md:ml-2 md:mb-2">
          Good Day, {currentUserData?.firstname}
        </div>
        <div className="space-y-2 space-x-2 md:mt-1">
          <button className="rounded-md px-4 py-2 bg-gray-800 text-white text-sm font-normal">
            {formattedDate}
          </button>
          <button className="rounded-md px-4 py-2 bg-blue-500 text-white text-sm font-normal">
            Export Metrics
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div className="col-span-2 rounded-2xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-500 to-blue-700 bg-pattern">
          <div className="text-3xl font-semibold text-white">Patients</div>
          <div className="flex justify-between items-center mb-4">
            <RiArrowRightSLine size={30} className="text-white" />
          </div>
          <p className="text-md text-gray-100 mb-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate soluta, autem quas commodi repudiandae cumque animi quisquam. Magnam, unde aliquam!.
          </p>
          <button className="flex items-center text-white hover:text-gray-200 transition duration-300">
            <span>View Patient Data</span>
            <RiArrowRightSLine size={20} className="ml-2" />
          </button>
        </div>

        <div className="rounded-md col-span-1">
          <div className="p-4 mb-2 border flex items-center bg-white rounded-2xl">
            <div className="h-32 w-32 rounded-full overflow-hidden">
              <img
                src={currentUserData?.profileimg || DefaultProfile}
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
    </div>
  )
}

export default DashboardScreen