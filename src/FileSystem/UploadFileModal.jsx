import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { createFileFunction } from '../Contexts/actionCreators/FileSystemActionCreator';
import { toast } from 'react-toastify';
import { FaUpload } from 'react-icons/fa'


const UploadFileModal = ({ setIsUploadFileModalOpen, category }) => {

  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const { files, user, currentFolder } = useSelector((state) => ({
    files: state.fileSystem.files,
    currentFolder: state.fileSystem.currentFolder,
    user: currentUser,
  }), shallowEqual);

  
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setFile("");
      setSuccess(false);
      setIsUploadFileModalOpen(false);
    }
  }, [success])

  const checkFileAlreadyPresent = (name) => {
    const filePresent = files.find((file) => file.parent === currentFolder && file.name === name);
    return filePresent !== undefined;
  };

  
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      if (!checkFileAlreadyPresent(file.name)) {
        const data = {
          createdAt: new Date(),
          name: file.name,
          userId: user.uid,
          category: category,
          createdBy: user.email,
          path: [],
          parent: currentFolder,
          lastAccessed: null,
          updatedAt: new Date(),
          extension: file.name.split(".")[1],
          data: null,
          url: "",
        };
        dispatch(createFileFunction(file, data,setSuccess,category ));
      } else {
        toast.error("File already present ");
      }
    } else {
      toast.error("File name cannot be empty ");
    }

    setIsUploadFileModalOpen(false);
  }

  return (
    <div className="w-4/5 h-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 flex flex-col p-5 bg-white rounded-3xl shadow-md overflow-y-scroll">
      <div className="flex flex-col items-center mb-6">
        <div className="h-20 w-20 overflow-hidden text-blue-600" >
          <FaUpload className='w-full h-full' />
        </div>
        <h1 className="text-2xl font-bold text-gray-700 mt-4">
          Upload a New File
        </h1>
      </div>
      {/* Center the upload section */}
      <div className="flex-grow flex flex-col">
        <div className="px-6 py-4">
          <div className="mt-4">
            <label className="block text-gray-800 text-sm font-medium mb-2">
              Select File
            </label>
            <input
              type="file"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              id="file"
              placeholder="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={HandleSubmit}
        >
          Upload
        </button>
        <button
          className="px-4 py-2 ml-4 text-gray-600 rounded-md hover:text-gray-800"
          onClick={() => setIsUploadFileModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>

  );
};

export default UploadFileModal;
