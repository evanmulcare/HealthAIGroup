import React, { useState } from 'react';
import { FaCheck, FaEdit } from 'react-icons/fa';

const DetailForm = ({ patient }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPatientData, setEditedPatientData] = useState({});

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSubmitClick = () => {

        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPatientData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const Section = ({ title, items }) => (
        <>
            <h3 className='font-medium text-gray-500 text-2xl m-2'>{title}</h3>
            <div className={`grid grid-cols-1 md:grid-cols-${items.length} gap-4 p-5 row-span-1`}>
                {items.map((item) => (
                    <div className='col-span-1' key={item.key}>
                        <h1 className="text-md font-semibold text-gray-600 text-center">{item.label}</h1>
                        {isEditing ? (
                            <input
                                type="text"
                                name={item.key}
                                value={item.value}
                                onChange={handleInputChange}
                                className="text-2xl font-semibold text-gray-800 text-center border"
                            />
                        ) : (
                            <h1 className="text-2xl font-semibold text-gray-800 text-center">
                                {item.key === 'smoker' || item.key === 'drinker'
                                    ? item.value ? 'Yes' : 'No'
                                    : `${item.value} ${item.unit || ''}`
                                }
                            </h1>
                        )}
                    </div>
                ))}
            </div>
        </>
    );

    return (
        <div className="mx-auto p-4">
            <div className="flex items-center justify-between px-4">
                <h1 className="text-2xl font-semibold text-gray-800">All Details</h1>

                <div className="flex space-x-4">
                    {isEditing ? (
                        <button
                            onClick={handleSubmitClick}
                            className={`flex items-center px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition duration-200 text-white`}
                            disabled={false}
                        >
                            <FaCheck className="mr-2" />
                            Submit Changes
                        </button>
                    ) : (
                        <button
                            onClick={handleEditClick}
                            className={`flex items-center px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition duration-200 text-white`}
                            disabled={false}
                        >
                            <FaEdit className="mr-2" />
                            Edit Details
                        </button>
                    )}


                </div>

            </div>

            <div className="m-2 p-2 bg-white rounded-3xl shadow-lg">
                <Section
                    title="Vitals"
                    items={[
                        { label: 'Blood Pressure', key: 'bloodPressure', unit: 'BPM', value: patient?.vitals?.bloodPressure },
                        { label: 'Heart Rate', key: 'heartRate', unit: null, value: patient?.vitals?.heartRate },
                        { label: 'Respiratory Rate', key: 'respiratoryRate', unit: null, value: patient?.vitals?.respiratoryRate },
                        { label: 'Body Temperature', key: 'bodyTemperature', unit: null, value: patient?.vitals?.bodyTemperature },
                    ]}
                />

                <Section
                    title="Physical"
                    items={[
                        { label: 'BMI', key: 'BMI', unit: null, value: patient?.physical?.BMI },
                        { label: 'Weight', key: 'weight', unit: 'KG', value: patient?.physical?.weight },
                        { label: 'Height', key: 'height', unit: 'CM', value: patient?.physical?.height },
                        { label: 'Body Fat', key: 'bodyFat', unit: null, value: patient?.physical?.bodyFat },
                    ]}
                />

                <Section
                    title="Lifestyle"
                    items={[
                        { label: 'Smoker', key: 'smoker', unit: null, value: patient?.lifestyle?.smoker },
                        { label: 'Drinker', key: 'drinker', unit: 'null', value: patient?.lifestyle?.drinker },
                        { label: 'Weekly Exercise', key: 'weeklyExcercise', unit: 'HRS', value: patient?.lifestyle?.weeklyExcercise },
                        { label: 'Nightly Sleep', key: 'sleepHours', unit: 'HRS', value: patient?.lifestyle?.sleepHours },
                    ]}
                />

                <Section
                    title="Risks"
                    items={[
                        { label: 'Colon Cancer', key: 'colonCancer', unit: '%', value: patient?.risks?.colonCancer },
                        { label: 'Heart Disease', key: 'heartDisease', unit: '%', value: patient?.risks?.heartDisease },
                        { label: 'Lung Cancer', key: 'lungCancer', unit: '%', value: patient?.risks?.lungCancer },
                    ]}
                />

                <>
                    <h3 className="font-medium text-gray-500 text-2xl m-2">Allergies</h3>
                    <div className="col-span-4 flex flex-col items-center mb-5">
                        {isEditing ? (
                            <div className="w-full max-w-md">
                                {patient?.allergies.map((allergy, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <input
                                            type="text"
                                            name={`allergy-${index}`}
                                            value={allergy}
                                            onChange={handleInputChange}
                                            className="flex-1 px-4 py-2 border rounded-md text-md font-semibold text-gray-800 text-center"
                                        />
                                        <button
                                            onClick={""}
                                            className="px-3 py-2 text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button onClick={""} className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md ">
                                    Add Allergy
                                </button>

                            </div>
                        ) : (
                            <h1 className="text-md font-semibold text-gray-600 text-center">
                                Allergies: {patient?.allergies.length > 0 ? patient.allergies.join(', ') : 'None'}
                            </h1>
                        )}
                    </div>

                </>
            </div>


        </div>
    )
}

export default DetailForm