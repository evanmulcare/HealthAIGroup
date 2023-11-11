import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const FileComponent = () => {
    const { fileId } = useParams();
    const navigate = useNavigate();

    const currentFile = useSelector((state) => {
        const files = state.fileSystem.files;
        return files.find((file) => file.docId === fileId);
    });

    return (
        <div>
            <div className="fixed top-0 left-0 w-full h-full bg-white">
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
                        <div className="flex items-center space-x-4">
                            <button className="text-xl" onClick={() => navigate(-1)}>
                                <FaArrowLeft />
                            </button>
                            <h2 className="text-lg font-semibold">{currentFile?.name}</h2>
                        </div>
                    </div>
                    <div className="flex-grow">
                        {currentFile?.extension === "pdf" ? (
                            <iframe
                                src={currentFile?.url}
                                width="100%"
                                height="100%"
                                title={currentFile?.name}
                            ></iframe>
                        ) : (
                            <h1 className="text-3xl font-bold text-gray-700 text-center mt-10">
                                File type not supported yet, Sorry!   
                            </h1>

                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FileComponent;
