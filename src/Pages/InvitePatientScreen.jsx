import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../Contexts/actionCreators/ userActionCreator';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";

const InvitePatientScreen = () => {

    const currentUser = useSelector((state) => state.auth.currentUser);

    //const [senderID, setSenderID] = useState('');
    const [receiverID, setReceiverID] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleInvite = async (e) => {
        e.preventDefault();
        try {
            //if (invite to patient does not yet exist) {
                await setDoc(doc(db, "patientInvites", "test" /*make this a random doc ID*/), {
                    senderID: currentUser.uid,
                    receiverID: receiverID,
                    message: message
                });

                toast.success('Invite successfully sent!', {
                    position: 'top-center',
                    autoClose: 3000,
                });
            //}

            /*else {
                toast.error('An invite to this patient already exists...', {
                    position: 'top-center',
                    autoClose: 3000,
                });
            }*/
        }
        
        catch (error) {
          console.error('Error:', error);
        }
    };
    
    return (
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl grid md:grid-cols-2 gap-4 shadow-lg">
            <div className="flex flex-col justify-between mt-4 md:mt-0 md:ml-4">
                <div className='space-y-2'>
                    <h3 className='font-medium text-gray-500 text-lg'>
                        Invite a patient
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <label className='text-gray-600 font-medium text-sm uppercase' htmlFor='id'>
                            Patient's ID:
                        </label>
                        <input
                            id='id'
                            type='id'
                            className='border rounded-md px-2 py-1 text-gray-800 col-span-2'
                            placeholder='<ID>'
                            onChange = {(e) => setReceiverID(e.target.value)}
                        />

                        <label className='text-gray-600 font-medium text-sm uppercase' htmlFor='message'>
                            Message:
                        </label>
                        <textarea
                            id='message'
                            type={'message'}
                            className='border rounded-md px-2 py-1 text-gray-800 col-span-2'
                            placeholder='<Message (Optional)>'
                            onChange = {(e) => setMessage(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
                    onClick={handleInvite}
                >
                    Send invite
                </button>
            </div>
        </div>
    );
}

export default InvitePatientScreen