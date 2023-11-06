import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db, storage } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";

const ProfilePage = () => {

    const users = useSelector((state) => state.users.users);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const currentUserData = users.find((user) => user.docId === currentUser?.uid);


    const [editMode, setEditMode] = useState(false);
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPassword, setEditedPassword] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [fileURL, setfileURL] = useState('');

    const auth = getAuth();


    const handleEditSave = async () => {
        try {
            //This needs to be fixed, currently users changes arent being saved properly
            if (editedEmail && editedEmail !== users.email) {
                await updateEmail(auth.currentUser, editedEmail);
            }

            if (editedPassword) {
                await updatePassword(auth.currentUser, editedPassword);
            }

            if (fileURL !== users.profileimg) {
                await updateDoc(doc(db, 'users', currentUser.uid), { profileimg: fileURL });
            }

            toast.success("Changes Saved!")

            //exit edit mode and reset fields 
            setEditMode(false);
            setEditedEmail('');
            setEditedPassword('');
        } catch (error) {
            console.error('Error updating user data:', error);
            toast.error("error saving changes")

        }
    };

    const handleLogoFileChange = (e) => {
        //get the file from the input
        const file = e.target.files[0];

        if (file && isValidImageFile(file)) {
            setLogoFile(file);

            //create url for file so that it can be shown in the src
            setfileURL(URL.createObjectURL(file));
        } else {
            toast.error('Invalid image file type.', {
                position: 'top-center',
                autoClose: 3000,
            });
        }
    };


    useEffect(() => {
        const uploadFile = () => {
            //unique file name
            const name = new Date().getTime() + logoFile.name;

            const storageRef = ref(storage, `/User images/${name}`);
            const uploadTask = uploadBytesResumable(storageRef, logoFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                      );
                      toast.info(`Uploading File: ${progress}%`);
                },
                (error) => {
                    toast.error("Error: " + error, {
                        position: 'top-center',
                        autoClose: 3000,
                    });
                },
                () => {
                    // get new file url from firebase and update it for the displayed profile
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            setfileURL(downloadURL);
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

    //only alow profile image files if its in the acceptefdTypes array
    const isValidImageFile = (file) => {
        const acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
        return acceptedTypes.includes(file.type);
    };

    return (
        <div>
            <div >
                <div>
                    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl grid md:grid-cols-2 gap-4 shadow-lg">

                        <div className="flex flex-col items-left mb-6">
                            <div className="h-48 w-48 rounded-full overflow-hidden">
                                <img
                                    src={fileURL || currentUserData?.profileimg}
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
                                    className="border text-gray-800 rounded-md text-xs py-2 px-2 w-2/5"
                                    required
                                />
                            )}


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
                                        value={editMode ? editedEmail : currentUserData?.email}
                                        placeholder={editMode ? currentUserData?.email : ''}
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
                                            setEditMode(false);
                                            setEditedEmail(users.email);
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
                    <div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage