import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { createFolderFunction } from '../../Contexts/actionCreators/FileSystemActionCreator';
import { toast } from 'react-toastify';
import { FaFolderPlus } from 'react-icons/fa'

//creates a folder in the current directory. called from main layout as a popup modal
const CreateFolderModal = ({ setIsCreateFolderModalOpen, category }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);


  const [folderName, setFolderName] = useState("");

  const { folders, user, currentFolder, currentFolderData } = useSelector((state) => ({
    folders: state.fileSystem.folders,
    user: currentUser,
    currentFolder: state.fileSystem.currentFolder,
    currentFolderData: state.fileSystem.folders.find((folder) => folder.docId == state.fileSystem.currentFolder),
  }), shallowEqual);

  const dispatch = useDispatch();

  //check if folder name already exists in the folder
  const checkFolderAlreadyPresent = (name) => {
    const folderPresent = folders.find((folder) => folder.parent === currentFolder && folder.name === name);
    return folderPresent !== undefined;
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (folderName) {
      if (folderName.length > 3) {
        if (!checkFolderAlreadyPresent(folderName)) {
        //define document data for firebase
          const data = {
            createdAt: new Date(),
            name: folderName,
            userId: user.uid,
            category: category,
            createdBy: user.email,
            path: currentFolder == "root" ? [] : [...currentFolderData?.path, currentFolder],
            parent: currentFolder,
            lastAccessed: null,
            updatedAt: new Date()
          };
          //dispatch the create folder action
          dispatch(createFolderFunction(data, category));
        }
        else {
          toast.error("Folder already present ");

        }
      }
      else {
        toast.error("Folder name must be more than 3 characters ");
      }
      setIsCreateFolderModalOpen(false);
    }
  }

  return (
    <div className="w-4/5 h-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 flex flex-col p-5 bg-white rounded-3xl shadow-md overflow-y-scroll">
      <div className="flex flex-col items-center mb-6">
        <div className="h-20 w-20 overflow-hidden text-blue-600" >
          <FaFolderPlus className='w-full h-full' />
        </div>
        <h1 className="text-2xl font-bold text-gray-700 mt-4" >
          Create a New Folder
        </h1>
      </div>
      <div className="flex-grow flex flex-col">
        <div className="px-6 py-4">
          <div className="mt-4">
            <label className="block text-gray-800 text-sm font-medium mb-2">
              Folder Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>
        </div>

      </div>

      <div className="mt-6 flex justify-center">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={HandleSubmit}
        >
          Create
        </button>
        <button
          className="px-4 py-2 ml-4 text-gray-600 rounded-md hover:text-gray-800"
          onClick={() => setIsCreateFolderModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>

  );
};

export default CreateFolderModal;
