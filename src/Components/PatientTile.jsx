import React, { useState, useEffect, useRef } from 'react';
import { FaRegEdit, FaTimesCircle } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import DefaultProfile from '../Assets/DefaultProfile.png';

const PatientTile = ({ patient, patientData }) => {
  const navigate = useNavigate();

  const [showEditMenu, setShowEditMenu] = useState(false);
  const tileRef = useRef(null);

  const handleDocumentClick = (event) => {
    if (tileRef.current && !tileRef.current.contains(event.target)) {
      setShowEditMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className="rounded-lg w-full h-full border shadow-lg p-4  bg-white mb-4" ref={tileRef}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center mt-2">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            <div className="text-left">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-left">
                {patient?.firstname} {patient?.lastname}
              </h2>
              <h3 className="text-sm text-gray-500 md:text-gray-400">{patient?.email}</h3>
            </div>
          </div>
        </div>
        <div className="space-x-2">
          <button
            className="px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
            onClick={() => navigate(`/Patients/${patient?.docId}`)}
          >
            <h3 className="text-sm">View</h3>
          </button>
          <button
            className="px-1 py-2 rounded-md inline-flex hover:bg-gray-100 transition duration-300"
            onClick={() => setShowEditMenu(!showEditMenu)}
          >
            <BsThreeDotsVertical className="mb-1" />
          </button>
          {showEditMenu && (
            <div className="relative">
              <div className="absolute top-full w-44 left-5 mt-1 bg-white border border-gray-300 rounded-md shadow-md z-10 text-gray-700">
                <ul>
                  <li className="px-4 w-full py-2 cursor-pointer hover:bg-gray-100 inline-flex">
                    <FaRegEdit className="text-md mr-2" />
                    <span className="inline text-xs mb-2">Edit Details</span>
                  </li>
                  <li className="px-4 w-full py-2 cursor-pointer hover:bg-gray-100 inline-flex">
                    <FaTimesCircle className="text-md mr-2 text-red-500" />
                    <span className="inline text-xs mb-2">Delete Patient</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-1/2 md:mr-4">
          <div className="h-32 w-32 rounded-full overflow-hidden">
            <img
              src={patient.profileimg || DefaultProfile}
              alt="Profile"
              className="h-full w-full object-cover rounded-full bg-black opacity-90"
            />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-600">Colon Cancer Risk</h2>
          <h3 className="text-md text-center font-semibold text-gray-800">
            {patientData?.risks?.colonCancer !== undefined
              ? `${patientData.risks.colonCancer}%`
              : "N/A"}
          </h3>

          <h2 className="text-sm font-semibold text-gray-600">Lung Cancer Risk</h2>
          <h3 className="text-md text-center font-semibold text-gray-800">
            {patientData?.risks?.lungCancer !== undefined
              ? `${patientData.risks.lungCancer}%`
              : "N/A"}
          </h3>

          <h2 className="text-sm font-semibold text-gray-600">Heart Disease</h2>
          <h3 className="text-md text-center font-semibold text-gray-800">
            {patientData?.risks?.heartDisease !== undefined
              ? `${patientData.risks.heartDisease}%`
              : "N/A"}
          </h3>
        </div>

      </div>

    </div>

  )
}

export default PatientTile