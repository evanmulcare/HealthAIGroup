import React, { useState, useEffect } from 'react';
import { signUpWithEmailAndPasswordAsync } from '../../Contexts/actionCreators/authActionCreator';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';
import Select from 'react-select';
import { getUsers } from '../../Contexts/actionCreators/ userActionCreator';

//Used in the login screen
const RegisterForm = () => {

  const [fileURL, setfileURL] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const permissionsOptions = ['doctor', 'patient'];
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const selectUsers = (state) => state.users.users;
  const userData = useSelector(selectUsers);
  const doctorData = userData.filter(user => user.role === 'doctor');

  function handleChange(event) {
    const { name, value } = event.target;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  const isValidImageFile = (file) => {
    const acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    return acceptedTypes.includes(file.type);
  };

  const handleLogoFileChange = (e) => {
    const file = e.target.files[0];
    if (file && isValidImageFile(file)) {
      setLogoFile(file);
      setfileURL(logoFile);
    } else {
      toast.error('Invalid image file type.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  const doctorOptions = doctorData.map((element) => ({
    value: element.docId,
    label: element.firstname + ' ' + element.lastname,
    logoPicture: element.profileimg,
  }));


  const handleDoctorSelect = (selectedOption) => {
    setSelectedDoctor(selectedOption);
    setInput({
      ...input,
      doctor: selectedOption.value,
    });
  };

  const [input, setInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
    permissions: 'doctor'/*,
    doctor:  '',*/
  });

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
          toast.error("Error: " + error, {
            position: 'top-center',
            autoClose: 3000,
          });
        },
        () => {
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


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (input.password === input.confirmPassword) dispatch(signUpWithEmailAndPasswordAsync(input.email, input.password, input.firstname, input.lastname, input.permissions, fileURL, input.doctor));

      else {
        // Error toast.
			  toast.error('Confirmed password must match password.', {
				  position: 'top-center',
				  autoClose: 3000,
			  });
      }
     
    } catch (error) {
      console.error('Error registering and logging in:', error);

      toast.error('Unexpected error registering and logging in.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="w-full max-w-md py-5">
      <p className="font-semibold text-lg text-gray-500 text-center mb-4">New user? Sign up here!</p>
      <form onSubmit={handleRegister}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name
            </label>
            <input onChange={handleChange} name="firstname" value={input.firstname} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" required />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
              Last Name
            </label>
            <input onChange={handleChange} name="lastname" value={input.lastname} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" required />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email Address
            </label>
            <input onChange={handleChange} name="email" value={input.email} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="text" placeholder="person.name@email.com" required />

          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Password
            </label>
            <input onChange={handleChange} name="password" value={input.password} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="strong password" required />

          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Confirm Password
            </label>
            <input onChange={handleChange} name="confirmPassword" value={input.confirmPassword} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="confirm password" required />

          </div>
        </div>
        
        {/*
        <div className='w-full'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
            User Role
          </label>
          <select
            onChange={handleChange}
            name='permissions'
            value={input.permissions}
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-permissions'
            required
          >
            <option value=''>Select Permissions</option>
            {permissionsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {input.permissions === 'patient' && (

        <div className='mb-6'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
            Doctor
          </label>
          <Select
            options={doctorOptions}
            value={selectedDoctor}
            onChange={handleDoctorSelect}
            formatOptionLabel={({ label, logoPicture }) => (
              <div className="flex items-center">
                <div className="h-10 w-10  overflow-hidden">
                  <img
                    src={logoPicture}
                    alt={`${label}'s profile`}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className='ml-2'>
                  <div>{label}</div>
                </div>
              </div>
            )}
            className="form-input over"
            required
          />
        </div>
        )}
        */}

        <div className="mt-5 flex items-center">
          <div className="relative rounded-full w-32 h-32 bg-gray-300 overflow-hidden">
            {logoFile ? (
              <div className="h-full flex items-center justify-center">
                <img
                  src={URL.createObjectURL(logoFile)}
                  alt="Logo Preview"
                  className="h-32 w-auto max-h-32 object-cover"
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">

              </div>
            )}

          </div>
          <div className='ml-5'>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mx-auto">
              Upload a profile picture
            </label>
            <input
              type="file"
              id="file"
              onChange={handleLogoFileChange}
              accept=".png, .jpg, .jpeg, .gif"
              className="form-input block tracking-wide text-gray-400 text-xs font-bold mb-2 mx-auto"
            />
          </div>
        </div>



        <button
          onClick={() => (handleRegister)}
          className="w-full mt-4 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default RegisterForm