import React, { useState, useContext, useEffect, useRef } from 'react';
import { FaUpload, FaFolderPlus, FaAngleDown, FaPlus,FaFileAlt } from 'react-icons/fa';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { getFoldersFunction, getFilesFunction } from '../../Contexts/actionCreators/FileSystemActionCreator';
import CreateFolderModal from './CreateFolderModal';
import UploadFileModal from './UploadFileModal';
import Content from './Content';
import Breadcrumb from './Breadcrumb';

const MainLayout = ({ category }) => {

  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const [isSubFolder, setIsSubfolder] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dropdownRef = useRef(null); 

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);


  const { userId } = useSelector(
    () =>
    ({
      userId: currentUser.uid,
    }),
    shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId && category) {
      dispatch(getFoldersFunction(category));
      dispatch(getFilesFunction(category));
    }
  }, [userId, category, dispatch]);

  return (
    <div className={` p-2  h-full overflow-y-scroll  ${isCreateFolderModalOpen  || isUploadFileModalOpen ? 'bg-gray-500 bg-opacity-50' : ''}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-2 border-b-1">
        <div className="text-sm mb-2 md:mb-0">
          <Breadcrumb isSubFolder={isSubFolder} setIsSubfolder={setIsSubfolder} category={category} />
        </div>
        <div className="flex flex-wrap justify-center md:justify-end items-center space-y-2 md:space-y-0 md:space-x-2">
          <button
            className="flex items-center px-2 md:px-4 py-2 text-gray-700 rounded-md md:mr-2 hover:bg-gray-100 transition duration-300"
            onClick={() => setIsUploadFileModalOpen(true)}
          >
            <FaUpload className="md:mr-2" />
            <span className="hidden md:inline">Upload File</span>
          </button>
         
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center px-2 py-2 bg-green-500 text-white rounded-md"
              onClick={toggleDropdown}
            >
              <FaPlus className="md:mr-2" />
              <span className="hidden md:inline">New</span>
              <FaAngleDown className="ml-2" />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full w-44 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md z-10 text-gray-700">
              <ul>
                <li className="px-4 w-full py-2 cursor-pointer hover:bg-gray-100 inline-flex" onClick={() => setIsCreateFolderModalOpen(true)}>
                  <FaFolderPlus className="text-md mr-2 " />
                  <span className="inline text-sm mb-2">New Folder</span>
                </li>
              </ul>
            </div>
            
            )}
          </div>


        </div>
      </div>
      <div className='p-2'>
        <div className="relative">
          {(isCreateFolderModalOpen || isUploadFileModalOpen) && (
            <div className="inset-0 bg-black opacity-50 z-50" />
          )}
          {isCreateFolderModalOpen && (
            <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-75 z-50">

              <CreateFolderModal isCreateFolderModalOpen={isCreateFolderModalOpen} setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} category={category}/>
            </div>
          )}
          {isUploadFileModalOpen && (

            <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-75 z-50">
              <UploadFileModal isUploadFileModalOpen={isUploadFileModalOpen} setIsUploadFileModalOpen={setIsUploadFileModalOpen} category={category} />
            </div>
          )}

          <Content isSubFolder={isSubFolder} setIsSubfolder={setIsSubfolder} category={category} />

        </div>
      </div>
    </div>
  );
};


export default MainLayout