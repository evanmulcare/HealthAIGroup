import React from 'react';
import { FaAngleRight, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { changeFolder } from '../../Contexts/actionCreators/fileFolderActionCreator';

const Breadcrumb = ({ isSubFolder, setIsSubfolder,category }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentFolder, currentFolderData, userFolders } = useSelector((state) => ({
        currentFolder: state.filefolders.currentFolder,
        currentFolderData: state.filefolders.userFolders.find(
            (folder) => folder.docId === state.filefolders.currentFolder
        ),
        userFolders: state.filefolders.userFolders,
    }), shallowEqual);

    const handleHomeClick = (id) => {
        navigate(`/Patients/${category}`);
        setIsSubfolder(false);
        dispatch(changeFolder(id));
    };

    return (
        <div>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    {currentFolder !== "root" ? (
                        <>
                            <button
                                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                                onClick={() => {
                                    handleHomeClick("root");
                                  }}                                                              >
                                <FaHome className="w-3 h-3 mr-2.5" />
                               {category}
                            </button>    

                            <button
                                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                            >
                                <FaAngleRight className="w-3 h-3 mr-2.5" />
                               {currentFolderData.name}
                            </button>
                        </>
                    ) : (
                        <>
                           <button
                                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                            >
                                <FaHome className="w-3 h-3 mr-2.5" />
                                {category}
                            </button>
                        </>
                    )}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
