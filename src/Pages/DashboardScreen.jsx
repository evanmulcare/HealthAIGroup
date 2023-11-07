import { useState } from 'react'
import { useSelector } from 'react-redux';
import DefaultProfile from '../Assets/DefaultProfile.png';
import Calender from '../Components/Calender';
import { downloadHeartDiseaseAccuracy, downloadLungCancerAccuracy, downloadHeartDiseaseReport, downloadLungCancerReport } from '../Hooks/usePredictionDataReport'
const DashboardScreen = () => {

  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const currentUserData = users.find((user) => user.docId === currentUser?.uid);
  const [selectedLanguage, setSelectedLanguage] = useState('english');



  return (
    <div className='mt-2 pl-10 pr-10 pb-10'>


      <div className="flex flex-col md:flex-row justify-center items-center md:justify-between mb-5">
        <h1 className="text-4xl font-semibold text-gray-800 md:ml-2">
          Good Day, {currentUserData?.firstname}
        </h1>
        <div className="space-y-2 space-x-2 sm mt-5">

          <button
            className={`rounded-md px-4 py-2 text-sm font-normal ${selectedLanguage === 'english'
                ? 'bg-blue-500 text-white'
                : 'text-blue-500 bg-white'
              }`}
            onClick={() => setSelectedLanguage('english')}
          >
            English
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-normal ${selectedLanguage === 'french'
                ? 'bg-blue-500 text-white'
                : 'text-blue-500 bg-white'
              }`}
            onClick={() => setSelectedLanguage('french')}
          >
            French
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div className="col-span-1 rounded-2xl shadow-md p-6 bg-gradient-to-r from-blue-500 to-blue-700 bg-pattern">
          <div className="text-3xl font-semibold text-white">Export Prediction Datasets</div>

          <p className="text-md text-gray-100 mb-6">
            Export the datasets used for predicting heart disease, colon cancer, and lung cancer, or create a new dataset with patient information.
          </p>

          <div className='col-span-1 space-y-2'>
            <button className="w-full flex bg-blue-400 rounded-md px-4 py-2 items-center text-white hover:text-gray-200 hover:scale-105 cursor-pointer" onClick={() => downloadHeartDiseaseReport()}>
              <span>Download Heart Disease Dataset</span>
            </button>
            <button className="w-full flex bg-blue-400 rounded-md px-4 py-2 items-center text-white hover:text-gray-200 hover:scale-105 cursor-pointer" onClick={() => downloadLungCancerReport()}>
              <span>Download Lung Cancer Dataset</span>
            </button>
            <button className=" w-full flex bg-blue-400 rounded-md px-4 py-2 items-center text-white hover:text-gray-200 hover:scale-105 cursor-pointer">
              <span>Download Colon Cancer Dataset</span>
            </button>
          </div>
        </div>


        <div className="col-span-1 rounded-2xl shadow-md p-6  bg-gradient-to-r from-blue-500 to-blue-700 bg-pattern cursor-pointer" >
          <div className="text-3xl font-semibold text-white">Export Accuracy Report for Prediction Models</div>

          <p className="text-md text-gray-100 mb-6">
            Export Accuracy Report for Prediction Models.
          </p>
          <div className='col-span-1 space-y-2'>
            <button className="w-full flex bg-blue-400 rounded-md px-4 py-2 items-center text-white hover:text-gray-200 hover:scale-105 cursor-pointer" onClick={() => downloadHeartDiseaseAccuracy()}>
              <span>Download Heart Disease Accuracy Report</span>
            </button>
            <button className="w-full flex bg-blue-400 rounded-md px-4 py-2 items-center text-white hover:text-gray-200 hover:scale-105 cursor-pointer" onClick={() => downloadLungCancerAccuracy()}>
              <span>Download Lung Cancer Accuracy Report</span>
            </button>
            <button className=" w-full flex bg-blue-400 rounded-md px-4 py-2 items-center text-white hover:text-gray-200 hover:scale-105 cursor-pointer">
              <span>Download Colon Cancer Accuracy Report</span>
            </button>
          </div>


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