import { useState, useEffect } from 'react'
import { RiArrowRightSLine } from 'react-icons/ri';
import HeartDiseaseModal from '../Modals/HeartDiseaseModal';
import ColonCancerModal from '../Modals/ColonCancerModal';
import LungCancerModal from '../Modals/LungCancerModal';
import ReportTile from './ReportTile';
import HeartImage from '../../Assets/HeartImage.webp'
import LungImage from '../../Assets/LungImage.png'
import ColonImage from '../../Assets/ColonImage.png'
import { getReports } from '../../Contexts/actionCreators/ReportActionCreator';
import { useDispatch, useSelector } from 'react-redux';

const PatientRiskPage = ({ patient }) => {

    const [showHeartDiseaseModal, setShowHeartDiseaseModal] = useState(false);
    const [showColonCancerModal, setShowColonCancerModal] = useState(false);
    const [showLungCancerModal, setShowLungCancerModal] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getReports());
    }, [dispatch]);

    const selectReportsByPatientId = (state, recieverId) => {
        return state.reports.reports.filter(report => report.patient === recieverId);
    };

    const reports = useSelector(state => selectReportsByPatientId(state, patient?.docId));
    reports.sort((a, b) => a.created - b.created);

    return (
        <div className="h-4/5 w-full overflow-scroll">


            {showHeartDiseaseModal && (
                <HeartDiseaseModal
                    setShowHeartDiseaseModal={setShowHeartDiseaseModal}
                    showHeartDiseaseModal={showHeartDiseaseModal}
                />
            )}
            {showColonCancerModal && (
                <ColonCancerModal
                    setShowColonCancerModal={setShowColonCancerModal}
                    showColonCancerModal={showColonCancerModal}
                />
            )}

            {showLungCancerModal && (
                <LungCancerModal
                    setShowLungCancerModal={setShowLungCancerModal}
                    showLungCancerModal={showLungCancerModal}
                    patientId={patient?.docId}
                />
            )}


            <h1 className="text-2xl font-semibold text-gray-800 pl-10 mt-4">Run AI generated Risk Assesments</h1>

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
                    <div className="absolute left-0 top-0 right-0 bottom-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-70 rounded-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-3xl font-semibold text-white">Heart Disease</div>
                        </div>
                        <p className="text-md text-gray-100 mb-6">
                            Run AI generated test to predict the likelihood of a patient's chance of heart disease.
                        </p>
                        <button className="flex items-center text-white hover:text-gray-200 transition duration-300">
                            <span>Run Report</span>
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
                    <div className="absolute left-0 top-0 right-0 bottom-0 bg-gradient-to-r from-red-500 to-red-700 opacity-70 rounded-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-3xl font-semibold text-white ">Lung Cancer</div>
                        </div>
                        <p className="text-md text-gray-100 mb-6">
                            Run AI generated test to predict likelyhood of patients chance of lung cancer
                        </p>
                        <button className="flex items-center text-white hover:text-gray-200 transition duration-300">
                            <span>Run Report</span>
                            <RiArrowRightSLine size={20} className="ml-2" />
                        </button>
                    </div>
                </div>



                <div
                    className="rounded-2xl shadow-md p-6 h-full cursor-pointer transform hover:scale-105 transition-transform duration-300"
                    onClick={() => setShowColonCancerModal(true)}
                    style={{
                        background: `url(${ColonImage}) no-repeat`,
                        backgroundSize: '50%', // Adjust the size as needed
                        backgroundPosition: 'right', // Position on the left
                    }}
                >
                    <div
                        className="bg-cover bg-right"

                    ></div>
                    <div className="absolute left-0 top-0 right-0 bottom-0 bg-gradient-to-r from-green-500 to-green-700 opacity-70 rounded-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-3xl font-semibold text-white ">Colon Cancer</div>
                        </div>
                        <p className="text-md text-gray-100 mb-6">
                            Run AI generated test to predict likelyhood of patients chance of colon cancer
                        </p>
                        <button className="flex items-center text-white hover:text-gray-200 transition duration-300">
                            <span>Run Report</span>
                            <RiArrowRightSLine size={20} className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
            <div >
                <h1 className="text-xl font-semibold text-gray-600 pl-10 mt-4">Past Medical Reports for {patient?.firstname}</h1>
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