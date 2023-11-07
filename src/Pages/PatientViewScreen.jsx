import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import MainLayout from '../FileSystem/MainLayout';
import DefaultProfile from '../Assets/DefaultProfile.png';
import PatientRiskPage from '../Components/patientPartials/PatientRiskPage';
import PatientChat from '../Components/patientPartials/PatientChat';

const PatientViewScreen = () => {
    const [activeTab, setActiveTab] = useState('risk');
    const navigate = useNavigate();
    const params = useParams();

    const patient = useSelector((state) =>
        state.users.users.find((user) => user.docId === params.patientId)
    );

    return (
        <>
            <div className="w-full h-full mx-auto text-gray-700 pt-2">
                <div className='relative'>
                    <div className='px-2 flex justify-between'>

                        <button
                            onClick={() => navigate('/patients')}
                            className="flex items-center bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring rounded-lg px-3 py-2 transition duration-300"
                        >
                            <AiOutlineArrowLeft className="mr-2" size={20} />
                            <span className="text-sm">Back</span>
                        </button>

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

                    </div>
                </div>
                <div className='flex border-b'>
                    <button
                        className={`flex-1 py-2 ${activeTab === 'risk' ? 'border-b-2 border-blue-500' : 'text-gray-500'
                            }`}
                        onClick={() => setActiveTab('risk')}
                    >
                        Risk Report
                    </button>
                    <button
                        className={`flex-1 py-2 ${activeTab === 'chat' ? 'border-b-2 border-blue-500' : 'text-gray-500'
                            }`}
                        onClick={() => setActiveTab('chat')}
                    >
                        Chat
                    </button>


                    <button
                        className={`flex-1 py-2 ${activeTab === 'files' ? 'border-b-2 border-blue-500' : 'text-gray-500'
                            }`}
                        onClick={() => setActiveTab('files')}
                    >
                        Patient Files
                    </button>

                </div>
                {activeTab === 'chat' && (
                    <PatientChat reciever={patient} />
                )
                }
                {activeTab === 'files' && (
                    <MainLayout category={params.patientId} />
                )
                }
                {
                    activeTab === 'risk' && (
                        <PatientRiskPage patient={patient}/>
                    )
                }
            </div>
        </>
    )
}

export default PatientViewScreen