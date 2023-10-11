import React, { useState } from 'react';

const StatSubbar = ({ patient }) => {
    const [activeOverviewTab, setActiveOverviewTab] = useState('vitals');

    const renderContent = (label, unit, value) => (
        <>
            <div className='col-span-1 items-center'>
                <h1 className="text-md font-semibold text-gray-600 text-center">{label}</h1>
                <h1 className="text-2xl font-semibold text-gray-800 text-center">
                    {value}{unit ? ` ${unit}` : ''}
                </h1>
            </div>
        </>
    );
    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-5'>

            <div className='col-span-1 md:col-span-1 rounded-2xl shadow-md p-6 h-full cursor-pointer transform hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-500 to-blue-700 bg-pattern'>
                <div>
                    <div className="items-center">
                        <h1 className="text-lg font-semibold text-white text-center ">Overall Health Rating</h1>
                        <h1 className="text-2xl font-semibold text-white text-center ">82%</h1>
                        <h1 className="text-sm font-semibold text-lime-400 text-center ">Healthy!</h1>
                    </div>
                </div>
            </div>

            <div className='col-span-1 md:col-span-3 grid-rows-2'>

                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-5 row-span-1'>

                    {activeOverviewTab === 'vitals' && (
                        <>
                           {renderContent('Blood pressure',  'BPM', patient?.vitals?.bloodPressure)}
                           {renderContent('Heart Rate',  'BPM', patient?.vitals?.heartRate)}
                           {renderContent('Respiratory Rate',  null, patient?.vitals?.respiratoryRate)}
                           {renderContent('Body Temperature', 'DEG', patient?.vitals?.bodyTemperature)}
                        </>

                         
                    )

                    }

                    {activeOverviewTab === 'physical' && (
                         <>
                         {renderContent('BMI',  'BMI', patient?.physical?.BMI)}
                         {renderContent('Weight', 'KG', patient?.physical?.weight)}
                         {renderContent('Height',null, patient?.physical?.height)}
                         {renderContent('Body Fat', '%', patient?.physical?.bodyFat)}
                      </>
                       
                    )

                    }
                    {activeOverviewTab === 'risk' && (


                        <>
                            {renderContent('Colon Cancer',  '%', patient?.risks?.colonCancer)}
                            {renderContent('Heart Disease',  '%', patient?.risks?.heartDisease)}
                            {renderContent('Lung Cancer',  '%', patient?.risks?.lungCancer)}
                        </>
                    )

                    }
                    

                    {activeOverviewTab === 'lifestyle' && (
                        <>
                            {renderContent('Smoker', null, patient?.lifestyle?.smoker ? 'Yes' : 'No')}
                            {renderContent('Drinker', null, patient?.lifestyle?.drinker ? 'Yes' : 'No')}
                            {renderContent('Weekly Excercise', 'HRS', patient?.lifestyle?.weeklyExcercise)}
                            {renderContent('Nightly Sleep', 'HRS', patient?.lifestyle?.sleepHours)}
                        </>
                    )

                    }
                    {activeOverviewTab === 'allergies' && (
                        <>
                            <div className='col-span-4 items-center'>
                                <h1 className="text-md font-semibold text-gray-600 text-center">
                                    Allergies: {patient?.allergies.length > 0 ? patient.allergies.join(', ') : 'None'}
                                </h1>
                            </div>

                        </>
                    )

                    }

                </div>

                <div className='flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-2 border p-2 rounded-2xl'>
                    <button className={`px-4 py-2 rounded-2xl border text-white ${activeOverviewTab === 'vitals' ? 'bg-gray-800' : 'bg-gray-400'}`} onClick={() => setActiveOverviewTab('vitals')}>Vitals</button>
                    <button className={`px-4 py-2 rounded-2xl border  text-white ${activeOverviewTab === 'physical' ? 'bg-gray-800' : 'bg-gray-400'}`} onClick={() => setActiveOverviewTab('physical')}>Physical</button>
                    <button className={`px-4 py-2 rounded-2xl border  text-white ${activeOverviewTab === 'risk' ? 'bg-gray-800' : 'bg-gray-400'}`} onClick={() => setActiveOverviewTab('risk')}>Risks</button>
                    <button className={`px-4 py-2 rounded-2xl border  text-white ${activeOverviewTab === 'allergies' ? 'bg-gray-800' : 'bg-gray-400'}`} onClick={() => setActiveOverviewTab('allergies')}>Allergies</button>
                    <button className={`px-4 py-2 rounded-2xl border  text-white ${activeOverviewTab === 'lifestyle' ? 'bg-gray-800' : 'bg-gray-400'}`} onClick={() => setActiveOverviewTab('lifestyle')}>Lifestyle</button>
                </div>
            </div>

        </div>
    )
}

export default StatSubbar