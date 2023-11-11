import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineClose, AiFillPlusCircle } from 'react-icons/ai';
import Select from 'react-select';
import { getReports } from '../../../Contexts/actionCreators/ReportActionCreator';
import { addRow } from '../../../Hooks/usePredictionDataReport';
import * as XLSX from 'xlsx';
import { useTranslation } from 'react-i18next';

const AggregateModal = ({ title, showAggregateModal, setShowAggregateModal, type }) => {
    const { t } = useTranslation();

    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReports());

    }, [dispatch]);

    const users = useSelector((state) => state.users.users);
    const currentUser = useSelector((state) => state.auth.currentUser);

    const doctorsPatients = useSelector((state) => {
        return users.filter(
            (user) => user?.role === 'patient' && user?.doctor === currentUser.uid
        );
    });

    const [selectedPatients, setSelectedPatients] = useState([]);
    const [selectedPatientsIds, setSelectedPatientsIds] = useState([]);

    const patientOptions = doctorsPatients.map((element) => ({
        value: element?.docId,
        label: element?.firstname,
        logoPicture: element?.profileimg,
    }));


    const handlePatientSelect = (selectedOptions) => {
        setSelectedPatients(selectedOptions)
        const selectedGroupIds = selectedOptions.map((option) => option.value);
        setSelectedPatientsIds(selectedGroupIds);
    };

    const selectReportsByPatientIds = (state, patientIds, type) => {
        return state.reports.reports.filter((report) => {
            return patientIds.includes(report.patient) && report.type === type;
        });
    };
    const fetchData = async (type) => {
        try {
            const response = await fetch(`https://healthaibackendtester.onrender.com/download-${type}-data-csv`);
            const blob = await response.blob();
      
            // Convert blob to data
            const reader = new FileReader();
            reader.onload = () => {
                const data = reader.result;
                const workbook = XLSX.read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(sheet);
                setData(parsedData);
            };
            reader.readAsBinaryString(blob);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      };

      
    useEffect(() => {
        fetchData(type);
    }, []);

    const reports = useSelector((state) => selectReportsByPatientIds(state, selectedPatientsIds, type));

    return ReactDOM.createPortal(
        <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black bg-opacity-75 z-50 ">
            <div className="absolute top-2 right-2 inline-flex">
                <button
                    className="px-4 py-2 ml-4 text-white"
                    onClick={() => setShowAggregateModal(!showAggregateModal)}
                >
                    <AiOutlineClose className='text-3xl' />
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-y-scroll w-3/4 h-3/4">
                <div className='flex justify-between'>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">{t('aggregatemodal.titleone')}  {title} {t('aggregatemodal.titletwo')}</h1>
                        <p className="text-sm text-gray-600 mt-2">
                        {t('aggregatemodal.subone')} {title} {t('aggregatemodal.subtwo')}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <button
                            className={`px-4 py-2 rounded-md border-1 inline-flex ${selectedPatientsIds.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'}`}
                            onClick={() => addRow({ reports, type: type, setData, data })}
                            disabled={selectedPatientsIds.length === 0}
                        >
                            <AiFillPlusCircle className="text-lg mr-2 text-white" />
                            <h3 className={`text-sm ${selectedPatientsIds.length === 0 ? 'text-gray-500' : 'text-white'} font-semibold`}>
                            {t('aggregatemodal.aggregate')}
                            </h3>
                        </button>
                    </div>
                </div>
                <hr className="my-4" />
                <div className='mx-auto text-center flex flex-col justify-center items-center '>
                    <div className='w-3/4 border rounded-md h-20 text-center'>
                        <h3 className="text-md text-gray-600 mt-2">
                        {t('aggregatemodal.existingDataset')} 
                        </h3>
                        <span className='text-xl font-semibold text-gray-800'>{title} Dataset.csv</span>
                    </div>

                    <div className='mb-5 w-2/3'>
                        <label className="block text-gray-700 text-lg font-bold mt-4">
                        {t('aggregatemodal.label')}
                        </label>
                        <Select
                            isMulti
                            options={patientOptions}
                            value={selectedPatients}
                            onChange={handlePatientSelect}
                            formatOptionLabel={({ label, logoPicture }) => (
                                <div className="flex items-center">
                                    <div className="h-10 w-10  overflow-hidden">
                                        <img
                                            src={logoPicture}
                                            alt={`${label}'s profile`}
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                    <div className='ml-2'>
                                        <div>{label}</div>
                                    </div>
                                </div>
                            )}
                            className="w-full"

                        />
                    </div>

                </div>
            </div>

        </div>,
        document.getElementById('modal-root')
    )
}

export default AggregateModal