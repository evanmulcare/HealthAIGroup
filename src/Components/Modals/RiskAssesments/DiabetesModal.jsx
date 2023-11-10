import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti'
import { useDispatch } from 'react-redux';
import { createReportAsync } from '../../../Contexts/actionCreators/ReportActionCreator';

const DiabetesModal = ({ setShowDiabetesModal, showDiabetesModal, patientId }) => {
    const dispatch = useDispatch();
    const [predictionResult, setPredictionResult] = useState(null);
    const [state, setState] = useState('notSubmitted');
    const [formData, setFormData] = useState({
        Pregnancies: '',
        Glucose: '',
        BloodPressure: '',
        SkinThickness: '',
        Insulin: '',
        BMI: '',
        DiabetesPedigreeFunction: '',
        Age: '',
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
            ...formData
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/predict-diabetes", {
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

    useEffect(() => {
        if (predictionResult !== null) {
            handleCreateReport(); 
        }
    }, [predictionResult]);

    const handleCreateReport = async () => {
        const newFormData = {
            result: String(predictionResult),
            type: "diabetes",
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
                    onClick={() => setShowDiabetesModal(!showDiabetesModal)}
                >
                    <AiOutlineClose className='text-3xl' />
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-y-scroll w-3/4 h-3/4">

                <h1 className="text-2xl font-semibold text-gray-800">Diabetes check</h1>
                <p className="text-sm text-gray-600 mt-2">
                    Fill all  data fields and submit to run a Diabetes check
                </p>
                <hr className="my-4" />
                {state === 'notSubmitted' && (

                    <form onSubmit={sendReportRequest}>

                        <div className="w-full  md:flex px-3 mb-6 md:mb-0 ">
                            <div className="md:flex md:flex-wrap md:-mx-3 mb-6 md:mb-0">
                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="Age" className="block text-sm font-medium text-gray-600">
                                        Patient Age <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="Age"
                                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.Age}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="Pregnancies" className="block text-sm font-medium text-gray-600">
                                        Patient Pregnancies <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="Pregnancies"
                                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.Pregnancies}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="Glucose" className="block text-sm font-medium text-gray-600">
                                        Patient Glucose <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="Glucose"
                                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.Glucose}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="BloodPressure" className="block text-sm font-medium text-gray-600">
                                        Patient Blood Pressure <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="BloodPressure"
                                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.BloodPressure}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="SkinThickness" className="block text-sm font-medium text-gray-600">
                                        Patient Skin Thickness <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="SkinThickness"
                                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.SkinThickness}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="Insulin" className="block text-sm font-medium text-gray-600">
                                        Patient Insulin <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="Insulin"
                                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.Insulin}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="BMI" className="block text-sm font-medium text-gray-600">
                                        Patient BMI <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="BMI"
                                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.BMI}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="DiabetesPedigreeFunction" className="block text-sm font-medium text-gray-600">
                                        Patient Diabetes Pedigree Function <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="DiabetesPedigreeFunction"
                                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.DiabetesPedigreeFunction}
                                        onChange={handleFieldChange}
                                        required
                                    />
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
                                        <h1 className='font-semibold text-gray-800 text-2xl text-center'>Bad News, Diabetes Likely</h1>
                                        <p className='font-semibold text-gray-600 text-xl text-center'>Based on the available datasets it is likely that this patient has Diabetes.</p>
                                    </>
                                ) : (
                                    <>
                                        <Confetti />

                                        <h1 className='font-semibold text-gray-800 text-2xl text-center'>Good News, Diabetes Unlikely</h1>
                                        <p className='font-semibold text-gray-600 text-xl text-center'>Based on the available datasets it is likely that this patient does not have Diabetes.</p>
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
                                onClick={() => setShowDiabetesModal(!showDiabetesModal)}

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

export default DiabetesModal;
