import { useState, useEffect } from 'react'
import { RiArrowRightSLine } from 'react-icons/ri';
import HeartDiseaseModal from '../Modals/RiskAssesments/HeartDiseaseModal';
import DiabetesModal from '../Modals/RiskAssesments/DiabetesModal';
import LungCancerModal from '../Modals/RiskAssesments/LungCancerModal';
import ReportTile from './ReportTile';
import HeartImage from '../../Assets/HeartImage.webp'
import LungImage from '../../Assets/LungImage.png'
import ColonImage from '../../Assets/ColonImage.png'
import { getReports } from '../../Contexts/actionCreators/ReportActionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const PatientRiskPage = ({ patient }) => {
    const { t } = useTranslation();

    const [showHeartDiseaseModal, setShowHeartDiseaseModal] = useState(false);
    const [showDiabetesModal, setShowDiabetesModal] = useState(false);
    const [showLungCancerModal, setShowLungCancerModal] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getReports());
    }, [dispatch]);

    const selectReportsByPatientId = (state, recieverId) => {
        return state.reports.reports.filter(report => report.patient === recieverId);
    };

    const reports = useSelector(state => selectReportsByPatientId(state, patient?.docId));

    return (
        <div className="h-4/5 w-full overflow-scroll">


            {showHeartDiseaseModal && (
                <HeartDiseaseModal
                    setShowHeartDiseaseModal={setShowHeartDiseaseModal}
                    showHeartDiseaseModal={showHeartDiseaseModal}
                    patientId={patient?.docId}

                />
            )}
            {showDiabetesModal && (
                <DiabetesModal
                    setShowDiabetesModal={setShowDiabetesModal}
                    showDiabetesModal={showDiabetesModal}
                    patientId={patient?.docId}

                />
            )}

            {showLungCancerModal && (
                <LungCancerModal
                    setShowLungCancerModal={setShowLungCancerModal}
                    showLungCancerModal={showLungCancerModal}
                    patientId={patient?.docId}
                />
            )}


            <h1 className="text-2xl font-semibold text-gray-800 pl-10 mt-4">{t('riskPage.title')}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 md:m-5">
                <div
                    className="rounded-2xl shadow-md p-6 h-full cursor-pointer transform hover:scale-105 transition-transform duration-300 "
                    onClick={() => setShowHeartDiseaseModal(true)}
                    style={{
                        background: `url(${HeartImage}) no-repeat`,
                        backgroundSize: '50%', // Adjust the size as needed
                        backgroundPosition: 'right', // Position on the left
                    }}
                >
                    <div
                        className="bg-cover bg-right"

                    ></div>
                    <div className="absolute left-0 top-0 right-0 bottom-0 bg-gray-800 opacity-90 rounded-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-3xl font-semibold text-white">{t('riskPage.heartDiseaseTitle')}</div>
                        </div>
                        <p className="text-md text-gray-100 mb-6">
                        {t('riskPage.heartDiseaseText')}
                        </p>
                        <button className="flex items-center text-white hover:text-gray-200 transition duration-300">
                            <span> {t('riskPage.heartDiseaseRun')}</span>
                            <RiArrowRightSLine size={20} className="ml-2" />
                        </button>
                    </div>
                </div>


                <div
                    className="rounded-2xl shadow-md p-6 h-full cursor-pointer transform hover:scale-105 transition-transform duration-300"
                    onClick={() => setShowLungCancerModal(true)}
                    style={{
                        background: `url(${LungImage}) no-repeat`,
                        backgroundSize: '50%', // Adjust the size as needed
                        backgroundPosition: 'right', // Position on the left
                    }}
                >
                    <div
                        className="bg-cover bg-right"

                    ></div>
                    <div className="absolute left-0 top-0 right-0 bottom-0 bg-gray-800 opacity-90 rounded-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-3xl font-semibold text-white ">{t('riskPage.lungCancerTitle')}</div>
                        </div>
                        <p className="text-md text-gray-100 mb-6">
                        {t('riskPage.lungCancerText')} 
                        </p>
                        <button className="flex items-center text-white hover:text-gray-200 transition duration-300">
                            <span>{t('riskPage.lungCancerRun')}</span>
                            <RiArrowRightSLine size={20} className="ml-2" />
                        </button>
                    </div>
                </div>



                <div
                    className="rounded-2xl shadow-md p-6 h-full cursor-pointer transform hover:scale-105 transition-transform duration-300"
                    onClick={() => setShowDiabetesModal(true)}
                    style={{
                        background: `url(${ColonImage}) no-repeat`,
                        backgroundSize: '50%', // Adjust the size as needed
                        backgroundPosition: 'right', // Position on the left
                    }}
                >
                    <div
                        className="bg-cover bg-right"

                    ></div>
                    <div className="absolute left-0 top-0 right-0 bottom-0 bg-gray-800 opacity-90 rounded-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-3xl font-semibold text-white ">{t('riskPage.diabetesTitle')}</div>
                        </div>
                        <p className="text-md text-gray-100 mb-6">
                        {t('riskPage.diabetesText')} 
                        </p>
                        <button className="flex items-center text-white hover:text-gray-200 transition duration-300">
                            <span>{t('riskPage.diabetesRun')}</span>
                            <RiArrowRightSLine size={20} className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
            <div >
                <h1 className="text-xl font-semibold text-gray-600 pl-10 mt-4">{t('riskPage.pastReports')} {patient?.firstname}</h1>
                <hr className='mx-5 border' />
                <div className='grid grid-cols-1  gap-4'>
                    {reports.map((report) => (
                        <div key={report.docId}>
                            <ReportTile report={report} />
                        </div>
                    ))}

                </div>

            </div>

        </div>
    )
}

export default PatientRiskPage