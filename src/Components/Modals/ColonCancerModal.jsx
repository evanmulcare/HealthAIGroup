import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti'

const ColonCancerModal = ({ setShowColonCancerModal, showColonCancerModal }) => {
    const [predictionResult, setPredictionResult] = useState(null);
    const [state, setState] = useState('notSubmitted');
    const [formData, setFormData] = useState({
       
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
            const response = await fetch("http://127.0.0.1:5000/predict", {
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
                    onClick={() => setShowColonCancerModal(!showColonCancerModal)}
                >
                    <AiOutlineClose className='text-3xl' />
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-y-scroll w-3/4 h-3/4">

                <h1 className="text-2xl font-semibold text-gray-800">Colon cancer check</h1>
                <p className="text-sm text-gray-600 mt-2">
                    Fill all  data fields and submit to run a colon cancer check
                </p>
                <hr className="my-4" />
                {state === 'notSubmitted' && (

                    <form onSubmit={sendReportRequest}>
                      
                      <h1 className='font-semibold text-gray-800 text-2xl text-center'>Coming Soon!</h1>

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
                                    <Confetti />
                                        <h1 className='font-semibold text-gray-800 text-2xl text-center'>Bad News, Colon Cancer Likely</h1>
                                        <p className='font-semibold text-gray-600 text-xl text-center'>Based on the available datasets it is likely that this patient has colon cancer.</p>
                                    </>
                                ) : (
                                    <>
                                        <h1 className='font-semibold text-gray-800 text-2xl text-center'>Good News, Colon Cancer Unlikely</h1>
                                        <p className='font-semibold text-gray-600 text-xl text-center'>Based on the available datasets it is likely that this patient does not have colon cancer.</p>
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
                                onClick={() => setShowColonCancerModal(!showColonCancerModal)}

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

export default ColonCancerModal;
