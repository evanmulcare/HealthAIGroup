import React from 'react'
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import DefaultProfile from '../../Assets/DefaultProfile.png';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doc, updateDoc } from "firebase/firestore";
import { getUsers } from '../../Contexts/actionCreators/ userActionCreator';

const RemovePatientModal = ({ setShowRemoveModal, patient }) => {
    const dispatch = useDispatch();
    const removePatient = async () => {
        try {
            const userDocRef = doc(db, "users", patient?.docId);

            await updateDoc(userDocRef, {
                doctor: '',
            });
            
            dispatch(getUsers());
            toast.success("Patient has been removed from your list doctor.")
            setShowRemoveModal(false);
        } catch (error) {
            toast.error("there was an error removing the patient from your list doctor.")

            console.error('Error updating patient record:', error);
        }
    };
    return ReactDOM.createPortal(
        <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black bg-opacity-75 z-50 ">
            <div className="absolute top-2 right-2 inline-flex">
                <button
                    className="px-4 py-2 ml-4 text-white"
                    onClick={() => setShowRemoveModal(false)}
                >
                    <AiOutlineClose className='text-3xl' />
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-y-scroll w-3/4 h-1/2">
                <h1 className='text-xl font-semibold text-gray-800'> Remove {patient?.firstName} {patient?.lastName} from your patient list?</h1>

                <div className='flex space-x-2 mt-10 items-center w-full justify-center'>
                    <div className="h-32 w-32 rounded-full overflow-hidden mr-10">
                        <img
                            src={patient.profileimg || DefaultProfile}
                            alt="Profile"
                            className="h-full w-full object-cover rounded-full bg-black opacity-90"
                        />
                    </div>
                    <button
                        className='px-6 py-2 text-lg bg-red-600 text-white rounded-md mr-4'
                        onClick={removePatient}
                    >
                        Remove
                    </button>
                    <button className='px-4 py-2 text-lg bg-gray-200 text-gray-800 border rounded-md' onClick={() => { setShowRemoveModal(false) }}
                    >Cancel</button>
                </div>

            </div>
        </div>,
        document.getElementById('modal-root')
    )
}

export default RemovePatientModal