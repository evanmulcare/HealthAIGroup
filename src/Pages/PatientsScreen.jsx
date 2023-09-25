import React, { useState, useEffect, useRef } from 'react';
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { FaExclamationCircle } from 'react-icons/fa';
import NewPatient from '../Components/NewPatient';
import PatientTile from '../Components/PatientTile';

const PatientsScreen = () => {
    const [showNewPatient, setShowNewPatient] = useState(false);
    const [patientData, setPatientData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchPatientData = async () => {
        let list = [];
        try {
            const querySnapshot = await getDocs(collection(db, "patients"));
            querySnapshot.forEach((doc) => {
                const patientData = doc.data();
                list.push({ id: doc.id, ...patientData });

            });
            setPatientData(list);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPatientData();
    }, []);

    const handleUpdate = () => {
        fetchPatientData();
    };

    const filteredPatientData = patientData.filter((patient) =>
        patient?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <div className="h-full  w-full">

            {showNewPatient && (
                <NewPatient
                    setShowNewPatient={setShowNewPatient}
                    showNewPatient={showNewPatient}
                    handleUpdate={handleUpdate}

                />
            )}

            <div className="flex justify-between w-full pl-5 pr-5 pt-1">
                <div className='ml-5 text-2xl font-semibold text-gray-800 mt-2 mb-2'>Patients</div>


                <div className='flex items-center space-x-2 mt-1'>
                    <button className="px-4 py-2 rounded-md border-1 inline-flex bg-blue-500" onClick={() => setShowNewPatient(true)}>
                        <AiFillPlusCircle className='text-lg mr-2 text-white' />
                        <h3 className='text-sm text-white font-semibold'>New Patient</h3>
                    </button>

                </div>


            </div>

            <hr className='mb-4 mt-4' />



            <div className='w-full flex p-5'>
                <div className="relative flex-auto w-full">
                    <div className="relative">
                        <button
                            className="absolute left-3 inset-y-0 bottom-3 top-3 flex items-center pr-3 rounded-md"

                        >
                            <BsSearch className="text-gray-700 text-xl hover:text-blue-500 transition duration-300" />
                        </button>
                        <input
                            className="block w-full bg-white border border-gray-300 rounded-md pl-10 pr-12 py-2 focus:outline-blue-200 focus:ring-2 focus:ring-blue-400 transition duration-300"
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                    </div>
                </div>


            </div>
            <div className='w-full h-full p-5'>
                <div className='grid grid-cols-2 gap-4 '>
                    <PatientTile  />
                    <PatientTile  />
                    <PatientTile />
                    <PatientTile  />
                    <PatientTile  />
                    <PatientTile  />
                </div>
            </div>

        </div>
    )
}

export default PatientsScreen