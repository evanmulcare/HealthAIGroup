import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db, storage } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { useTranslation } from 'react-i18next';
import ProfilePageView from './ProfilePageView';

const ProfilePage = () => {
	const users = useSelector((state) => state.users.users);
	const currentUser = useSelector((state) => state.auth.currentUser);
	const currentUserData = users.find(
		(user) => user.docId === currentUser?.uid
	);

	const [editMode, setEditMode] = useState(false);
	const [editedEmail, setEditedEmail] = useState(users.email);
	const [editedPhone, setEditedPhone] = useState(currentUserData.phone);
	const [editedPassword, setEditedPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [logoFile, setLogoFile] = useState(null);
	const [fileURL, setFileURL] = useState(currentUserData.profileimg);

	const auth = getAuth();

	const { t } = useTranslation();

	const handleEditSave = async () => {
		try {
			if (editedEmail && editedEmail !== users.email) {
				await updateEmail(auth.currentUser, editedEmail);
			}

			if (editedPhone && editedPhone !== currentUserData.phone) {
				await updateDoc(doc(db, 'users', currentUser.uid), {
					phone: editedPhone
				});
			}

			if (editedPassword !== '' && confirmPassword !== '') {
				if (editedPassword === confirmPassword) {
					await updatePassword(auth.currentUser, editedPassword);
				}

				else toast.warning(t('profileScreen.passwordNotMatchToast'))
			}

			if (fileURL !== currentUserData.profileimg) {
				await updateDoc(doc(db, 'users', currentUser.uid), {
					profileimg: fileURL
				});
			}

			// Set defaults.
			users.email = editedEmail;
			currentUserData.phone = editedPhone;
			currentUserData.profileimg = fileURL;
			setEditedPassword('');
			setConfirmPassword('');

			toast.success(t('profileScreen.savedToast'));

			setEditMode(false);
		}
		
		catch (error) {
			console.error('Error updating user data:', error);
			toast.error('Error saving changes');
		}
	};

	const handleLogoFileChange = (e) => {
		const file = e.target.files[0];

		if (file && isValidImageFile(file)) {
			setLogoFile(file);
			setFileURL(URL.createObjectURL(file));
		} else {
			toast.error('Invalid image file type', {
				position: 'top-center',
				autoClose: 3000,
			});
		}
	};

	useEffect(() => {
		const uploadFile = () => {
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
					toast.error(`Error: ${error}`, {
						position: 'top-center',
						autoClose: 3000,
					});
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref)
						.then((downloadURL) => {
							setFileURL(downloadURL);
						})
						.catch((error) => {
							toast.error(`Error: ${error}`, {
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
		const acceptedTypes = [
			'image/png',
			'image/jpeg',
			'image/jpg',
			'image/gif',
		];
		return acceptedTypes.includes(file.type);
	};

	return (
		<ProfilePageView
			fileURL={fileURL}
			currentUserData={currentUserData}
			editMode={editMode}
			editedEmail={editedEmail}
			editedPhone={editedPhone}
			editedPassword={editedPassword}
			confirmPassword={confirmPassword}
			handleLogoFileChange={handleLogoFileChange}
			handleEditSave={handleEditSave}
			setEditMode={setEditMode}
			setEditedEmail={setEditedEmail}
			setEditedPhone={setEditedPhone}
			setEditedPassword={setEditedPassword}
			setConfirmPassword={setConfirmPassword}
			users={users}
		/>
	);
};

export default ProfilePage;
