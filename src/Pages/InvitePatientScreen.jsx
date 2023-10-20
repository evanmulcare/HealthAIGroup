import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../Contexts/actionCreators/ userActionCreator';
const InvitePatientScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

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
                        />

                        <label className='text-gray-600 font-medium text-sm uppercase' htmlFor='message'>
                            Message:
                        </label>
                        <textarea
                            id='message'
                            type={'message'}
                            className='border rounded-md px-2 py-1 text-gray-800 col-span-2'
                            placeholder='<Message (Optional)>'
                        />
                    </div>
                </div>

                <button
                    className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
                    onClick={() => ""}
                >
                    Send invite
                </button>
            </div>
        </div>
    );
}

export default InvitePatientScreen