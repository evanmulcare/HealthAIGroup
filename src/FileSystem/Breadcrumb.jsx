import React from 'react';
import { FaAngleRight, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { changeFolder } from '../Contexts/actionCreators/FileSystemActionCreator';

//Shows breadcrumb for current directory. used in main layout
const Breadcrumb = ({ setIsSubfolder, category }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentFolder, currentFolderData } = useSelector((state) => ({
        currentFolder: state.fileSystem.currentFolder,
        currentFolderData: state.fileSystem.folders.find(
            (folder) => folder.docId === state.fileSystem.currentFolder
        ),
        folders: state.fileSystem.folders,
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
                    {/*Show home button and a button for the current folder in the breadcrumb if not in root directory */}
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
                        {/*If in root just show home button in breadcrumb */}
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
