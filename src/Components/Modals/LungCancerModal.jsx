import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti';
import { createReportAsync } from '../../Contexts/actionCreators/ReportActionCreator';
import { useDispatch } from 'react-redux';
const LungCancerModal = ({ setShowLungCancerModal, showLungCancerModal, patientId }) => {
    const [predictionResult, setPredictionResult] = useState(null);
    const [state, setState] = useState('notSubmitted');
    const dispatch = useDispatch();

    useEffect(() => {
        if (predictionResult !== null) {
            handleCreateReport(); 
        }
    }, [predictionResult]);

    const [formData, setFormData] = useState({
        GENDER: 'M',
        AGE: '22',
        SMOKING: '1',
        YELLOW_FINGERS: '1',
        ANXIETY: '1',
        PEER_PRESSURE: '1',
        CHRONIC_DISEASE: '1',
        FATIGUE: '1',
        ALLERGY: '1',
        WHEEZING: '1',
        ALCOHOL_CONSUMING: '1',
        COUGHING: '1',
        SHORTNESS_OF_BREATH: '1',
        SWALLOWING_DIFFICULTY: '1',
        CHEST_PAIN: '1',

    });

      const handleFieldChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
    
        setFormData({
          ...formData,
          [fieldName]: fieldValue,
        });
      };

    const sendReportRequest = async (event) => {
        event.preventDefault();

        setState('loading');


        const requestPayload = {
            GENDER: formData.GENDER,
            AGE: parseInt(formData.AGE),
            SMOKING: parseInt(formData.SMOKING),
            YELLOW_FINGERS: parseInt(formData.YELLOW_FINGERS),
            ANXIETY: parseInt(formData.ANXIETY),
            PEER_PRESSURE: parseInt(formData.PEER_PRESSURE),
            CHRONIC_DISEASE: parseInt(formData.CHRONIC_DISEASE),
            FATIGUE: parseInt(formData.FATIGUE),
            ALLERGY: parseInt(formData.ALLERGY),
            WHEEZING: parseInt(formData.WHEEZING),
            ALCOHOL_CONSUMING: parseInt(formData.ALCOHOL_CONSUMING),
            COUGHING: parseInt(formData.COUGHING),
            SHORTNESS_OF_BREATH: parseInt(formData.SHORTNESS_OF_BREATH),
            SWALLOWING_DIFFICULTY: parseInt(formData.SWALLOWING_DIFFICULTY),
            CHEST_PAIN: parseInt(formData.CHEST_PAIN),
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/predict-lung-disease", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestPayload),
            });

            if (response.ok) {
                const data = await response.json();

                // Update the prediction result in the state
                setPredictionResult(data.result);
                setState('results');
            } else {
                toast.error('Error Running Report...');
                setState('results');

            }
        } catch (error) {
            toast.error('Error Running Report...');
            setState('results');

        }
    };

      const handleCreateReport = async () => {
        const newFormData = {
            result: String(predictionResult),
            type: "lung",
            patient: String(patientId),
            date: String(new Date().toDateString()),
            ...formData,
        };
        dispatch(createReportAsync(newFormData));
    };



    return ReactDOM.createPortal(
        <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black bg-opacity-75 z-50 ">
            <div className="absolute top-2 right-2 inline-flex">
                <button
                    className="px-4 py-2 ml-4 text-white"
                    onClick={() => setShowLungCancerModal(!showLungCancerModal)}
                >
                    <AiOutlineClose className='text-3xl' />
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-y-scroll w-3/4 h-3/4">

                <h1 className="text-2xl font-semibold text-gray-800">Lung cancer check</h1>
                <p className="text-sm text-gray-600 mt-2">
                    Fill all  data fields and submit to run a colon cancer check
                </p>
                <hr className="my-4" />
                {state === 'notSubmitted' && (

                    <form onSubmit={sendReportRequest}>
                      
                      <div className="w-full  md:flex px-3 mb-6 md:mb-0 ">
                            <div className="md:flex md:flex-wrap md:-mx-3 mb-6 md:mb-0">
                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="GENDER" className="block text-sm font-medium text-gray-600">
                                        Patient Gender <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="GENDER"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.GENDER}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="AGE" className="block text-sm font-medium text-gray-600">
                                        Patient AGE <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="AGE"
                                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.AGE}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>


                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="SMOKING" className="block text-sm font-medium text-gray-600">
                                        Patient Smokes <span className="text-red-500">*</span>
                                    </label>
                                      <select
                                        name="SMOKING"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.SMOKING}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                         <option value="1">No</option>
                                        <option value="2">Yes</option>
                                    </select>
                                </div>
                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="YELLOW_FINGERS" className="block text-sm font-medium text-gray-600">
                                        Patient Yellow Fingers <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="YELLOW_FINGERS"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.YELLOW_FINGERS}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                         <option value="1">No</option>
                                        <option value="2">Yes</option>
                                    </select>
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="ANXIETY" className="block text-sm font-medium text-gray-600">
                                        Patient has ANXIETY <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="ANXIETY"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.ANXIETY}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                         <option value="1">No</option>
                                        <option value="2">Yes</option>
                                    </select>
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="PEER_PRESSURE" className="block text-sm font-medium text-gray-600">
                                        PEER_PRESSURE <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="PEER_PRESSURE"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.PEER_PRESSURE}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                        <option value="1">No</option>
                                        <option value="2">Yes</option>
                                    </select>
                                </div>


                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="CHRONIC_DISEASE" className="block text-sm font-medium text-gray-600">
                                     CHRONIC_DISEASE <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="CHRONIC_DISEASE"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.CHRONIC_DISEASE}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                       <option value="1">No</option>
                                        <option value="2">Yes</option>
                                    </select>
                                </div>


                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="FATIGUE" className="block text-sm font-medium text-gray-600">
                                    FATIGUE <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="FATIGUE"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.FATIGUE}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                       <option value="1">No</option>
                                        <option value="2">Yes</option>
                                    </select>
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="ALLERGY" className="block text-sm font-medium text-gray-600">
                                    ALLERGY <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="ALLERGY"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.ALLERGY}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                       <option value="1">No</option>
                                        <option value="2">Yes</option>
                                    </select>
                                </div>


                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="WHEEZING" className="block text-sm font-medium text-gray-600">
                                    WHEEZING <span className="text-red-500">*</span>
                                    </label>
                                     <select
                                        name="WHEEZING"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.WHEEZING}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                       <option value="1">No</option>
                                        <option value="2">Yes</option>
                                    </select>
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="ALCOHOL_CONSUMING" className="block text-sm font-medium text-gray-600">
                                      ALCOHOL_CONSUMING <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="ALCOHOL_CONSUMING"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.ALCOHOL_CONSUMING}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                       <option value="1">No</option>
                                        <option value="2">Yes</option>
                                    </select>
                                </div>


                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="COUGHING" className="block text-sm font-medium text-gray-600">
                                    COUGHING <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="COUGHING"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.COUGHING}
                                        onChange={handleFieldChange}
                                        required
                                    >

                                        <option value="1">No</option>
                                        <option value="2">Yes</option>

                                    </select>
                                </div>


                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="SHORTNESS_OF_BREATH" className="block text-sm font-medium text-gray-600">
                                    SHORTNESS_OF_BREATH <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="SHORTNESS_OF_BREATH"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.SHORTNESS_OF_BREATH}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                         <option value="1">No</option>
                                        <option value="2">Yes</option>
                                    </select>
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="SWALLOWING_DIFFICULTY" className="block text-sm font-medium text-gray-600">
                                    SWALLOWING_DIFFICULTY <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="SWALLOWING_DIFFICULTY"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.SWALLOWING_DIFFICULTY}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                         <option value="1">No</option>
                                        <option value="2">Yes</option>
                                    </select>
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="CHEST_PAIN" className="block text-sm font-medium text-gray-600">
                                    CHEST_PAIN <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="CHEST_PAIN"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.CHEST_PAIN}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                         <option value="1">No</option>
                                        <option value="2">Yes</option>
                                    </select>
                                </div>


                                <div className="w-full flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    >
                                        Run Report
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-4">
                            Required fields are marked with an asterisk (*)
                        </p>

                    </form>

                )}

                {state === 'loading' && (
                    <div className="text-center">
                        <p>Loading...</p>
                    </div>
                )}

                {state === 'results' && (
                    <div>

                        {predictionResult !== null ? (
                            <div>
                                {predictionResult ? (
                                    <>  
                                        <h1 className='font-semibold text-gray-800 text-2xl text-center'>Bad News, Lung Cancer Likely</h1>
                                        <p className='font-semibold text-gray-600 text-xl text-center'>Based on the available datasets it is likely that this patient has Lung cancer.</p>
                                    </>
                                ) : (
                                    <>
                                        <Confetti />
                                        <h1 className='font-semibold text-gray-800 text-2xl text-center'>Good News, Lung Cancer Unlikely</h1>
                                        <p className='font-semibold text-gray-600 text-xl text-center'>Based on the available datasets it is likely that this patient does not have Lung cancer.</p>
                                    </>
                                )}
                            </div>
                        ) : null}
                        <div className="flex items-center justify-center mt-20">
                            <button
                                className="bg-blue-500 mx-2 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                onClick={() => setState("notSubmitted")}

                            >
                                Run Again
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                onClick={() => setShowLungCancerModal(!showLungCancerModal)}

                            >
                                Exit
                            </button>
                        </div>
                    </div>
                )}



            </div>

        </div>,
        document.getElementById('modal-root')
    );
};

export default LungCancerModal;
