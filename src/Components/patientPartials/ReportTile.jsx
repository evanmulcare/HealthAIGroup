import React from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import HeartImage from '../../Assets/HeartImage.webp'
import LungImage from '../../Assets/LungImage.png'
import ColonImage from '../../Assets/ColonImage.png'

const ReportTile = ({ report }) => {
    function renderField(label, value) {
        return (
            <div className="md:w-1/2 px-3 mb-4">
                <label htmlFor={label} className="block text-sm font-medium text-gray-600">
                    {label}
                </label>
                <span className='text-gray-600 text-md'>{value}</span>
            </div>
        );
    }

    return (
        <div className='border bg-white shadow-md  m-10 rounded-md'>
            <div className="mt-2 flex  justify-center  md:justify-between ">
                <h1 className="text-2xl font-semibold text-gray-800 ml-4">
                    {report?.type === "heart" ? "Heart Disease Prediction Report" :
                        report?.type === "lung" ? "Lung Cancer Disease Prediction Report" :
                            report?.type === "colon" ? "Colon Cancer Prediction Report" :
                                ""}
                </h1>


                <div className='text-center mb-2 mr-4'>
                    <h1 className="text-xs font-semibold text-gray-600 mr-2">
                        Issue date
                    </h1>
                    <h1 className="text-sm font-semibold text-gray-800 mr-2">
                        {report?.date}
                    </h1>
                </div>

            </div>
            <hr className='mx-2' />
            <div className='grid sm:grid-cols-1 md:grid-cols-4'>
                <div className='col-span-1 md:border grid place-items-center'>
                    <h2 className='text-lg font-semibold text-gray-600 text-center mt-2'>Result</h2>
                    <>
                        <div className='flex space-x-2'>
                            {report?.result === "0" ? (
                                <AiOutlineCheckCircle className='text-8xl text-green-600 text-center' style={{ display: 'block', margin: '0 auto' }} />
                            ) : (
                                <AiOutlineCloseCircle className='text-8xl text-red-600 text-center' style={{ display: 'block', margin: '0 auto' }} />
                            )}

                            <div className="w-24 h-24 border rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${report?.type === "heart" ? HeartImage : report?.type === "lung" ? LungImage : report?.type === "colon" ? ColonImage : ''})` }}>
                            </div>
                        </div>
                        <h2 className='text-2xl font-semibold text-gray-800 text-center'>
                            {report?.type === "heart" ?
                                (report?.result === "1" ? "Heart Disease Likely." : "Heart Disease Unlikely.")
                                : report?.type === "lung" ?
                                    (report?.result === "1" ? "Lung Cancer Likely." : "Lung Cancer Unlikely.")
                                    : report?.type === "colon" ?
                                        (report?.result === "1" ? "Colon Cancer Likely." : "Colon Cancer Unlikely.")
                                        : ""}
                        </h2>

                        {report?.result === "0" ? (
                            <p className='text-sm font-normal text-gray-600 text-center'>
                                {report?.type === "heart"
                                    ? "This patient is safe from Heart Disease, for now."
                                    : report?.type === "lung"
                                        ? "This patient is safe from Lung Cancer, for now."
                                        : report?.type === "colon"
                                            ? "This patient is safe from Colon Cancer, for now."
                                            : "This patient is safe, for now."}
                            </p>
                        ) : (
                            <p className='text-sm font-normal text-gray-600 text-center'>
                                {report?.type === "heart"
                                    ? "This patient is at risk of Heart Disease."
                                    : report?.type === "lung"
                                        ? "This patient is at risk of Lung Cancer."
                                        : report?.type === "colon"
                                            ? "This patient is at risk of Colon Cancer."
                                            : "This patient is at risk."}
                            </p>
                        )}
                    </>

                </div>


                <div className='col-span-3 border p-4'>
                    {report?.type === "heart" ?
                        <div className="md:flex flex-wrap">
                            {renderField("Patient Age", report?.age)}
                            {renderField("Patient Sex", report?.sex)}
                            {renderField("Blood Pressure", report?.BP)}
                            {renderField("Chest Pain Type Level", report?.ChestPainType)}
                            {renderField("Cholesterol Level", report?.Cholesterol)}
                            {renderField("Fasting Blood Sugar over 120", report?.FBSOver120)}
                            {renderField("EKG Results", report?.EKGResults)}
                            {renderField("Max Heart Rate", report?.MaxHR)}
                            {renderField("Exercise-Induced Angina", report?.ExerciseAngina)}
                            {renderField("ST Depression", report?.STdepression)}
                            {renderField("Slope of the Peak Exercise ST Segment", report?.SlopeOfST)}
                            {renderField("Number of Major Vessels Colored by Flourosopy", report?.NumberOfVesselsFluro)}
                            {renderField("Thallium Stress Test Result", report?.Thallium)}
                        </div>
                        :
                        report?.type === "lung" ?

                            <div className="md:flex flex-wrap">

                                {renderField("Patient Gender", report?.GENDER)}
                                {renderField("Patient Age", report?.AGE)}
                                {renderField("Patient Smokes", report?.SMOKING)}
                                {renderField("Patient Yellow Fingers", report?.YELLOW_FINGERS)}
                                {renderField("Patient has ANXIETY", report?.ANXIETY)}
                                {renderField("PEER_PRESSURE", report?.PEER_PRESSURE)}
                                {renderField("CHRONIC_DISEASE", report?.CHRONIC_DISEASE)}
                                {renderField("FATIGUE", report?.FATIGUE)}
                                {renderField("ALLERGY", report?.ALLERGY)}
                                {renderField("WHEEZING", report?.WHEEZING)}
                                {renderField("ALCOHOL_CONSUMING", report?.ALCOHOL_CONSUMING)}
                                {renderField("COUGHING", report?.COUGHING)}
                                {renderField("SHORTNESS_OF_BREATH", report?.SHORTNESS_OF_BREATH)}
                                {renderField("SWALLOWING_DIFFICULTY", report?.SWALLOWING_DIFFICULTY)}
                                {renderField("CHEST_PAIN", report?.CHEST_PAIN)}
                            </div>
                            : report?.type === "colon" ? "Colon Cancer Prediction Report" :
                                ""}
                </div>

            </div>

        </div >
    )
}

export default ReportTile