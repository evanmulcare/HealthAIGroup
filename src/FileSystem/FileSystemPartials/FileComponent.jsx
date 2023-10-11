import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck } from 'react-icons/fa'; 
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import WebViewer from '@pdftron/webviewer'
import {  ref, uploadBytes } from "firebase/storage";
import { doc, getDoc } from 'firebase/firestore';
import { storage } from '../../firebase';
import { toast } from "react-toastify";
import { db } from '../../firebase';


const FileComponent = () => {
    const { fileId } = useParams();
    const [currentFile, setCurrentFile] = useState(null);
    const navigate = useNavigate();
    const viewer = useRef(null); 
    const annotationManagerRef = useRef(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchFileData = async () => {
            try {
                const fileDoc = doc(db, 'files', fileId);
                const fileSnapshot = await getDoc(fileDoc);

                if (fileSnapshot.exists()) {
                    setCurrentFile(fileSnapshot.data()); 
                } else {
                    console.error('File not found');
                }
            } catch (error) {
                console.error('Error fetching file data:', error);
            }
        };

        fetchFileData();
    }, [fileId]);




    const spreadsheetRef = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(currentFile?.url);
                const fileBlob = await response.blob(); 
                const file = new File([fileBlob], currentFile?.name); 

                let spreadsheet = spreadsheetRef.current;
                if (spreadsheet) {
                    spreadsheet.open({ file });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [webViewerInstance, setWebViewerInstance] = useState(null); 

    useEffect(() => {
        const initializeWebViewer = async () => {
            const instance = await WebViewer({
                path: '/public',
                enableOfficeEditing: true,
                initialDoc: currentFile?.url,
                licenseKey: 'demo:1691061235692:7c40e74e030000000079be03cd2140cae584c3cee92cb8f96bfd49aebb'
            }, viewer.current);

            setWebViewerInstance(instance);
        };

        initializeWebViewer();
    }, [currentFile]);

    const handleButtonClick = async () => {
        if (webViewerInstance) {
            const { documentViewer, annotationManager } = webViewerInstance.Core;

            annotationManagerRef.current = annotationManager;

            const doc = documentViewer.getDocument();
            const xfdfString = await annotationManager.exportAnnotations();

            const data = await doc.getFileData({
                xfdfString,
                downloadType: 'office', 
            });

            const arr = new Uint8Array(data);
            const blob = new Blob([arr], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }); // Mime type for docx files

            const storageRef = ref(storage, `files/${currentFile?.category}/${currentFile?.name}`);

            setSubmitting(true);

            toast.info("Submitting...");

            uploadBytes(storageRef, blob).then((snapshot) => {
                setSubmitting(false);
                toast.success("File changes saved");

            });

        }
    };


    if (!currentFile) {
        return <div>Loading...</div>;
      }

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
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleButtonClick}
                                    className={`flex items-center px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition duration-200 ${submitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                                        }`}
                                    disabled={submitting}
                                >
                                    <FaCheck className="mr-2" />
                                    Submit Changes
                                </button>


                            </div>
                        </div>

                        <div className="flex-grow">
                            {console.log(currentFile?.extension, currentFile?.url)}
                            {currentFile?.extension &&
                                (currentFile?.extension.includes('png') ||
                                    currentFile?.extension.includes('jpg') ||
                                    currentFile?.extension.includes('jpeg') ||
                                    currentFile?.extension.includes('gif')) ? (
                                <img
                                    src={currentFile?.url}
                                    alt={currentFile?.name}
                                    className="w-full h-full object-contain"
                                />
                            ) : currentFile?.extension === 'pdf' ||
                                currentFile?.extension === 'doc' ||
                                currentFile?.extension === 'docx' ? (
                                <div className="webviewer" ref={viewer} style={{ height: "100vh" }} ></div>
                            ) : currentFile?.extension === 'xlsx' ? (
                                <SpreadsheetComponent ref={spreadsheetRef} openUrl="https://services.syncfusion.com/react/production/api/spreadsheet/open" />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <h1 className="text-white">File type not supported</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default FileComponent;
