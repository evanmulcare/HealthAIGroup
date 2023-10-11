import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri';
import { FaProductHunt } from 'react-icons/fa';

const PatientRiskPage = ({ patient }) => {
    return (
        <div className="h-4/5 w-full overflow-scroll">
            <h1 className="text-2xl font-semibold text-gray-800 pl-10 mt-4">Run AI generated Risk Assesments</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 md:m-5">
                <div className="rounded-2xl shadow-md p-6 h-full cursor-pointer transform hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-500 to-blue-700 bg-pattern">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-3xl font-semibold text-white ">Heart Disease</div>
                        </div>
                        <p className="text-md text-gray-100 mb-6">
                            Run AI generated test to predict likelyhood of patients chance of heart disease
                        </p>
                        <button className="flex items-center text-white hover:text-gray-200 transition duration-300">
                            <span>Run Report</span>
                            <RiArrowRightSLine size={20} className="ml-2" />
                        </button>
                    </div>
                </div>

                <div className="rounded-2xl shadow-md p-6 h-full cursor-pointer transform hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-red-500 to-red-700 bg-pattern">
                    <div>
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

                <div className="rounded-2xl shadow-md p-6 h-full cursor-pointer transform hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-lime-500 to-lime-700 bg-pattern">
                    <div>
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
        </div>
    )
}

export default PatientRiskPage