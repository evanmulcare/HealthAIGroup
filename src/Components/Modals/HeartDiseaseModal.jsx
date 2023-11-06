import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti'

const HeartDiseaseModal = ({ setShowHeartDiseaseModal, showHeartDiseaseModal }) => {
    const [predictionResult, setPredictionResult] = useState(null);
    const [state, setState] = useState('notSubmitted');

    const [formData, setFormData] = useState({
        age: '',
        sex: '0',
        ChestPainType: '1',
        BP: '',
        Cholesterol: '',
        FBSOver120: '1',
        EKGResults: '2',
        MaxHR: '',
        ExerciseAngina: '1',
        STdepression: '',
        SlopeOfST: '1',
        NumberOfVesselsFluro: '0',
        Thallium: '3',
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
            const response = await fetch("http://127.0.0.1:5000/predict-heart-disease", {
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


    return ReactDOM.createPortal(
        <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black bg-opacity-75 z-50 ">
            <div className="absolute top-2 right-2 inline-flex">
                <button
                    className="px-4 py-2 ml-4 text-white"
                    onClick={() => setShowHeartDiseaseModal(!showHeartDiseaseModal)}
                >
                    <AiOutlineClose className='text-3xl' />
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-y-scroll w-3/4 h-3/4">

                <h1 className="text-2xl font-semibold text-gray-800">Heart disease check</h1>
                <p className="text-sm text-gray-600 mt-2">
                    Fill all  data fields and submit to run a heart disease check
                </p>
                <hr className="my-4" />
                {state === 'notSubmitted' && (

                    <form onSubmit={sendReportRequest}>
                        <div className="w-full  md:flex px-3 mb-6 md:mb-0 ">
                            <div className="md:flex md:flex-wrap md:-mx-3 mb-6 md:mb-0">
                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-600">
                                        Patient Age <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="age"
                                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.age}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="sex" className="block text-sm font-medium text-gray-600">
                                        Patient Sex <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="sex"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.sex}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                        <option value="1">Male</option>
                                        <option value="0">Female</option>
                                    </select>
                                </div>


                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="BP" className="block text-sm font-medium text-gray-600">
                                        Blood Pressure <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="BP"
                                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.BP}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>
                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="ChestPainType" className="block text-sm font-medium text-gray-600">
                                        Chest Pain Type Level <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="ChestPainType"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.ChestPainType}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="Cholesterol" className="block text-sm font-medium text-gray-600">
                                        Cholesteral Level <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="Cholesterol"
                                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.Cholesterol}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="FBSOver120" className="block text-sm font-medium text-gray-600">
                                        Fasting Blood Sugar over 120 <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="FBSOver120"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.FBSOver120}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>


                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="EKGResults" className="block text-sm font-medium text-gray-600">
                                        EKG Results <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="EKGResults"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.EKGResults}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                        <option value="2">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>


                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="MaxHR" className="block text-sm font-medium text-gray-600">
                                        Max Heart Rate <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="MaxHR"
                                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.MaxHR}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="ExerciseAngina" className="block text-sm font-medium text-gray-600">
                                        Exercise-Induced Angina <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="ExerciseAngina"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.ExerciseAngina}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>


                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="STdepression" className="block text-sm font-medium text-gray-600">
                                        ST Depression <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="STdepression"
                                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.STdepression}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>

                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="SlopeOfST" className="block text-sm font-medium text-gray-600">
                                        Slope of the Peak Exercise ST Segment <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="SlopeOfST"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.SlopeOfST}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>


                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="NumberOfVesselsFluro" className="block text-sm font-medium text-gray-600">
                                        Number of Major Vessels Colored by Flourosopy <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="NumberOfVesselsFluro"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.NumberOfVesselsFluro}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>


                                <div className="md:w-1/2 px-3 mb-4">
                                    <label htmlFor="Thallium" className="block text-sm font-medium text-gray-600">
                                        Thallium Stress Test Result <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="Thallium"
                                        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={formData.Thallium}
                                        onChange={handleFieldChange}
                                        required
                                    >
                                        <option value="3">3</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
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
                                        <h1 className='font-semibold text-gray-800 text-2xl text-center'>Bad News, Heart Disease Likely</h1>
                                        <p className='font-semibold text-gray-600 text-xl text-center'>Based on the available datasets it is likely that this patient has heart disease.</p>
                                    </>
                                ) : (
                                    <>
                                        <Confetti />
                                        <h1 className='font-semibold text-gray-800 text-2xl text-center'>Good News, Heart Disease Unlikely</h1>
                                        <p className='font-semibold text-gray-600 text-xl text-center'>Based on the available datasets it is likely that this patient does not have heart disease.</p>
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
                                onClick={() => setShowHeartDiseaseModal(!showHeartDiseaseModal)}

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

export default HeartDiseaseModal;
