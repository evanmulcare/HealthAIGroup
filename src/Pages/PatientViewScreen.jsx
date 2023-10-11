import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import MainLayout from '../FileSystem/FileSystemPartials/MainLayout';
import DefaultProfile from '../Assets/DefaultProfile.png';
import PatientOverviewPage from '../Components/patientPartials/PatientOverviewPage';
import PatientRiskPage from '../Components/patientPartials/PatientRiskPage';

const PatientViewScreen = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();
    const params = useParams();

    const patient = useSelector((state) =>
        state.users.users.find((user) => user.docId === params.patientId)
    );
    
    const patientWithData = useSelector((state) => {
        if (patient) {
            const patientDataId = patient.patientData;
            const patientDocument = state.patients.patients.find(
                (patient) => patient.docId === patientDataId
            );

            if (patientDocument) {
                return { ...patient, patientDocument };
            }
        }

        return patient;
    });

    console.log("patientWithData", patientWithData);

    return (
        <>
            <div className="w-full h-full mx-auto text-gray-700 pt-2">
                <div className='relative'>
                    <div className='p-2 flex justify-between'>
                        <div className='flex'>
                            <div className="h-12 w-12 rounded-full overflow-hidden">
                                <img
                                    src={patient?.profileimg || DefaultProfile}
                                    alt="Profile"
                                    className="h-full w-full object-cover rounded-full bg-black opacity-90"
                                />
                            </div>
                            <div className="ml-2 mt-1">
                                <h2 className="text-md font-semibold text-gray-800 text-left">
                                    {patient?.firstname} {patient?.lastname}
                                </h2>
                                <div className="mt02">
                                    <h3 className="text-sm text-gray-500 md:text-gray-400">
                                        {patient?.email}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <button
                            className="px-4 text-gray-500 bg-gray-300 rounded-full opacity-70 mr-4"
                            onClick={() => ""}
                        >
                            <AiOutlineClose className='text-lg' onClick={() => navigate(-1)} />
                        </button>
                    </div>
                </div>
                <div className='flex border-b'>
                    <button
                        className={`flex-1 py-2 ${activeTab === 'overview' ? 'border-b-2 border-blue-500' : 'text-gray-500'
                            }`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>

                    <button
                        className={`flex-1 py-2 ${activeTab === 'risk' ? 'border-b-2 border-blue-500' : 'text-gray-500'
                            }`}
                        onClick={() => setActiveTab('risk')}
                    >
                        Risk Report
                    </button>
                    <button
                        className={`flex-1 py-2 ${activeTab === 'files' ? 'border-b-2 border-blue-500' : 'text-gray-500'
                            }`}
                        onClick={() => setActiveTab('files')}
                    >
                        Patient Files
                    </button>

                </div>

                {activeTab === 'overview' && (
                    <PatientOverviewPage patient={patientWithData.patientDocument} />
                )

                }

                {activeTab === 'files' && (
                    <MainLayout category={"test"} />
                )
                }
                {
                    activeTab === 'risk' && (
                        <PatientRiskPage patient={patientWithData.patientDocument} />
                    )
                }
            </div>
        </>
    )
}

export default PatientViewScreen