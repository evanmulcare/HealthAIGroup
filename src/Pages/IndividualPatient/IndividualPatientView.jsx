import React from 'react';
import DefaultProfile from '../../Assets/DefaultProfile.png';
import MainLayout from '../../Components/FileSystemPartials/MainLayout';
import PatientRiskPage from '../../Components/patientPartials/PatientRiskPage';
import PatientChat from '../../Components/patientPartials/PatientChat';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const IndividualPatientView = ({ activeTab, setActiveTab, patient, params, navigate }) => {
    const { t } = useTranslation();

    return (
        <div className="w-full h-full mx-auto text-gray-700 pt-2">
            <div className='relative'>
                <div className='px-2 flex justify-between'>
                    <button
                        onClick={() => navigate('/patients')}
                        className="flex items-center bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring rounded-lg px-3 py-2 transition duration-300"
                    >
                        <AiOutlineArrowLeft className="mr-2" size={20} />
                        <span className="text-sm">{t('individualPatientScreen.back')}</span>
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
                <div className='flex border-b'>
                    <button
                        className={`flex-1 py-2 ${activeTab === 'risk' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('risk')}
                    >
                        {t('individualPatientScreen.riskReport')}
                    </button>
                    <button
                        className={`flex-1 py-2 ${activeTab === 'chat' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('chat')}
                    >
                        {t('individualPatientScreen.chat')}
                    </button>

                    <button
                        className={`flex-1 py-2 ${activeTab === 'files' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('files')}
                    >
                        {t('individualPatientScreen.files')}
                    </button>
                </div>
                {activeTab === 'chat' && (
                    <PatientChat reciever={patient} />
                )}
                {activeTab === 'files' && (
                    <MainLayout category={params.patientId} />
                )}
                {activeTab === 'risk' && (
                    <PatientRiskPage patient={patient} />
                )}
            </div>
        </div>
    );
};

export default IndividualPatientView;
