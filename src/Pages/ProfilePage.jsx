import React, { useEffect, useState, useContext, useRef } from 'react';
import {  toast } from 'react-toastify';
import { db,storage } from '../firebase';
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {  useNavigate } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from '../Contexts/AuthContext';




const ProfilePage = () => {
    const { state } = useStateContext();
    const { userRole, partnerName } = state;
    const [userData, setUserData] = useState([]);
    const [partnerData, setPartnerData] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false); 
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPassword, setEditedPassword] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [fileURL, setfileURL] = useState('');
    const [per, setPer] = useState(null);
    const navigate = useNavigate();

    const auth = getAuth();

    useEffect(() => {
        if (currentUser) {
            const fetchUserData = async () => {
                try {
                    const userRef = collection(db, 'users');
                    const snapshot = await getDocs(userRef);

                    snapshot.forEach(async doc => {
                        if (doc.id === currentUser.uid) {
                            const userData = doc.data();
                            setUserData(userData);

                            // Fetch the user's partner data
                            const partnerRef = collection(db, 'partners');
                            const partnerSnapshot = await getDocs(partnerRef);
                            let userPartner = null;

                            await Promise.all(partnerSnapshot.docs.map(async partnerDoc => {
                                const partnerData = partnerDoc.data();
                                if (partnerData.partnerName === userData.organization) {
                                    userPartner = partnerData;
                                }
                            }));

                            setPartnerData(userPartner);
                        }
                    });
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchUserData();
        }
    }, [currentUser]);
    const handleEditSave = async () => {
        try {
            // Update user's email and/or password if edited
            if (editedEmail && editedEmail !== userData.email) {
                await updateEmail(auth.currentUser, editedEmail);
            }

            if (editedPassword) {
                await updatePassword(auth.currentUser, editedPassword);
            }

    

            if (fileURL !== userData.profileimg) {
                await updateDoc(doc(db, 'users', currentUser.uid), { profileimg: fileURL });
            }

            toast.success("Changes Saved!")

            setEditMode(false);
            setEditedEmail('');
            setEditedPassword('');
        } catch (error) {
            console.error('Error updating user data:', error);
            toast.error("error saving changes")

            // Handle the error, maybe show an error message to the user
        }
    };

    const handleLogoFileChange = (e) => {
        const file = e.target.files[0];
        if (file && isValidImageFile(file)) {
            setLogoFile(file);
            setfileURL(URL.createObjectURL(file)); // Update the fileURL with the new file's local URL
        } else {
            // Handle invalid file type and show toast message
            toast.error('Invalid image file type.', {
                position: 'top-center',
                autoClose: 3000,
            });
        }
    };


    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + logoFile.name;
            const storageRef = (storage, `/User images/${name}`);

            const uploadTask = uploadBytesResumable(storageRef, logoFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPer(progress);
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    toast.error("Error: " + error, {
                        position: 'top-center',
                        autoClose: 3000,
                    });
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            setfileURL(downloadURL); // Update fileURL with the download URL
                        })
                        .catch((error) => {
                            toast.error("Error: " + error, {
                                position: 'top-center',
                                autoClose: 3000,
                            });
                        });
                }
            );
        };

        logoFile && uploadFile();
    }, [logoFile]);

    const isValidImageFile = (file) => {
        const acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
        return acceptedTypes.includes(file.type);
    };

    return (
        <div>


            <div >
                <div>
                    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl grid md:grid-cols-2 gap-4 shadow-lg">

                        {/* Left side div with profile image and name underneath */}
                        <div className="flex flex-col items-left mb-6">
                            {/* Profile image */}
                            <div className="h-48 w-48 rounded-full overflow-hidden">
                                <img
                                    src={fileURL || userData?.profileimg} // Display the selected file or current profile image
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            {editMode && (
                                <input
                                    type="file"
                                    id="file"
                                    onChange={handleLogoFileChange}
                                    accept=".png, .jpg, .jpeg, .gif"
                                    className="form-input block tracking-wide text-gray-400 text-xs font-bold mb-2 mx-auto"
                                    required
                                />
                            )}
                            {/* Profile name */}
                            <div className="mt-3">
                                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-left ml-6">
                                    {userData?.firstname} {userData?.lastname}
                                </h2>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between mt-4 md:mt-0 md:ml-4">

                            <div className='space-y-2'>
                                <h3 className='font-medium text-gray-500 text-lg'>
                                    {editMode ? 'Editing ' : ''}{userData?.firstname}'s Information
                                </h3>                        <div className="grid grid-cols-2 gap-4">
                                    <label className='text-gray-600 font-medium text-sm uppercase' htmlFor='email'>
                                        Account email:
                                    </label>
                                    <input
                                        id='email'
                                        type='email'
                                        className='border rounded-md px-2 py-1 text-gray-800 col-span-2'
                                        value={editMode ? editedEmail : userData?.email}
                                        readOnly={!editMode} // Disable input when not in edit mode
                                        onChange={(e) => setEditedEmail(e.target.value)} // Update editedEmail state
                                    />
                                    <label className='text-gray-600 font-medium text-sm uppercase' htmlFor='password'>
                                        Account password:
                                    </label>
                                    <input
                                        id='password'
                                        type={editMode ? 'text' : 'password'} // Show plain text when in edit mode
                                        className='border rounded-md px-2 py-1 text-gray-800 col-span-2'
                                        value={editedPassword}
                                        disabled={!editMode}
                                        placeholder='********'

                                        onChange={(e) => setEditedPassword(e.target.value)}
                                    />
                                   
                                </div>
                            </div>

                            {editMode ? (
                                <div className='mt-4'>
                                    <button
                                        className='px-4 py-2 bg-blue-500 text-white rounded-md mr-2'
                                        onClick={handleEditSave}
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        className='px-4 py-2 bg-gray-400 text-white rounded-md'
                                        onClick={() => {
                                            setEditMode(false); // Cancel edit mode
                                            setEditedEmail(userData.email); // Reset editedEmail to original value
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
                                    onClick={() => setEditMode(true)} // Activate edit mode
                                >
                                    Edit
                                </button>
                            )}

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