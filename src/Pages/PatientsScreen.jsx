import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import NewPatient from '../Components/NewPatient';
import PatientTile from '../Components/PatientTile';
import { getPatients } from '../Contexts/actionCreators/patientActionCreator';
import { getUsers } from '../Contexts/actionCreators/ userActionCreator';
import { Navigate, useNavigate } from 'react-router-dom';

const PatientsScreen = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getPatients());
        dispatch(getUsers());

    }, [dispatch]);

    const selectPatients = (state) => state.patients.patients;
    const patientData = useSelector(selectPatients);

    const selectUsers = (state) => state.users.users;
    const currentUser = useSelector((state) => state.auth.currentUser);

    const doctorsPatientsWithPatientsData = useSelector((state) => {
        const users = selectUsers(state);
        const filteredUsers = users.filter(user => user?.role === 'patient' && user?.doctor === currentUser.uid);

        const usersWithPatientsData = filteredUsers.map(user => {
            const patientDataId = user.patientData;
            const patientDocument = patientData.find(patient => patient.docId === patientDataId);

            if (patientDocument) {
                return { ...user, patientDocument };
            }

            return user;
        });

        return usersWithPatientsData;
    });


    const handleUpdate = () => {
        dispatch(getPatients());
    };

    const filteredPatients = doctorsPatientsWithPatientsData.filter((patient) =>
    patient.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || patient.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||  patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

    return (
        <div >
            <div className="flex justify-between w-full pl-5 pr-5 pt-1">
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
                <div className='flex items-center '>
                    <button className="px-4 py-2 rounded-md border-1 inline-flex bg-blue-500" onClick={() => navigate('/Invite') }>
                        <AiFillPlusCircle className='text-lg mr-2 text-white' />
                        <h3 className='text-sm text-white font-semibold'>Invite</h3>
                    </button>
                </div>
            </div>


            <div className='w-full h-full p-5'>
                {filteredPatients.length === 0 ? (
                    <h1 className="text-2xl text-gray-700 font-semibold">
                        No Patients
                    </h1>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {filteredPatients.map((patient) => (
                            <div key={patient.id}>
                                <PatientTile patient={patient} patientData={patient.patientDocument} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PatientsScreen