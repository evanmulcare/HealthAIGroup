import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../Contexts/actionCreators/ userActionCreator';
const ProfilePage = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const selectUsers = (state) => state.users.users;
    const userData = useSelector(selectUsers);
    const currentUserData = userData.find(user => user.docId === currentUser?.uid);

    return (
        <div>


            <div >
                <div>
                    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl grid md:grid-cols-2 gap-4 shadow-lg">

                        <div className="flex flex-col items-left mb-6">
                            <div className="h-48 w-48 rounded-full overflow-hidden">
                                <img
                                    src={currentUserData?.profileimg}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="mt-3">
                                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-left ml-6">
                                    {currentUserData?.firstname} {currentUserData?.lastname}
                                </h2>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between mt-4 md:mt-0 md:ml-4">

                            <div className='space-y-2'>
                                <h3 className='font-medium text-gray-500 text-lg'>
                                    {currentUserData?.firstname}'s Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className='text-gray-600 font-medium text-sm uppercase' htmlFor='email'>
                                        Account email:
                                    </label>
                                    <input
                                        id='email'
                                        type='email'
                                        className='border rounded-md px-2 py-1 text-gray-800 col-span-2'
                                        value={currentUserData?.email}
                                    />
                                    <label className='text-gray-600 font-medium text-sm uppercase' htmlFor='password'>
                                        Account password:
                                    </label>
                                    <input
                                        id='password'
                                        type={'password'}
                                        className='border rounded-md px-2 py-1 text-gray-800 col-span-2'
                                        value={""}
                                        placeholder='********'
                                    />

                                </div>
                            </div>

                            <button
                                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
                                onClick={() => ""}
                            >
                                Edit
                            </button>

                        </div>

                    </div>


                    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl flex flex-col md:flex-row justify-start shadow-lg">
                        <div className="w-full md:w-1/2 space-y-4">
                            <h3 className='font-medium text-gray-500 text-lg'>Notification Settings</h3>

                            <div className='flex items-center'>
                                <p className='w-1/3 text-gray-600 font-medium text-sm uppercase'>Push notification</p>
                                <label className="switch">
                                    <input type="checkbox" className="toggle-input absolute opacity-0 w-0 h-0" />
                                    <span className="slider bg-gray-300 dark:bg-gray-600 w-14 h-8 rounded-full flex items-center transition duration-300 ease-in-out">
                                        <span className="dot w-6 h-6 bg-white dark:bg-gray-300 rounded-full shadow-md transform transition duration-300 ease-in-out"></span>
                                    </span>
                                </label>
                            </div>

                            <div className='flex items-center'>
                                <p className='w-1/3 text-gray-600 font-medium text-sm uppercase'>Email Notification</p>
                                <label className="switch">
                                    <input type="checkbox" className="toggle-input absolute opacity-0 w-0 h-0" />
                                    <span className="slider bg-gray-300 dark:bg-gray-600 w-14 h-8 rounded-full flex items-center transition duration-300 ease-in-out">
                                        <span className="dot w-6 h-6 bg-white dark:bg-gray-300 rounded-full shadow-md transform transition duration-300 ease-in-out"></span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>


                    <div>


                    </div>


                </div>
            </div>
        </div>
    );
}

export default ProfilePage