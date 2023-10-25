import React, { useState, useEffect, useRef } from 'react';
import { FaFolder, FaFile, FaCircle, FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFilePowerpoint, FaDownload } from 'react-icons/fa';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../Contexts/actionCreators/ userActionCreator';

//displays each file in its individual tile, changes depending on type 'file' or 'folder' and styles it based of file properties i.e file extension
const FileTile = ({ name, type, onDoubleClick, UserId, updatedAt, url }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);

  //colors depending if the tile is a file or a folder
  const iconColor = type === 'folder' ? 'text-blue-500' : 'text-gray-500';
  const tileBgColor = type === 'folder' ? 'bg-blue-50' : 'bg-gray-50';
  const tileBorderColor = type === 'folder' ? 'border-blue-200' : 'border-gray-200';

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // get the user who uploaded the file from the redux store
  const userData = useSelector((state) => {
    const allUserData = state.users.users;
    return allUserData.find(user => user.docId === UserId);
  });

  const handleDownload = () => {
    window.open(url, '_blank');
  };

  const tileRef = useRef(null);

    //if a click is inside the file tile, then show the downlaod menu
  const handleTileClick = () => {
    setIsChecked(!isChecked);
    setShowEditMenu(!showEditMenu);

  };

  //if a click is outside the file tile, then hide the downlaod menu
  const handleDocumentClick = (event) => {
    if (tileRef.current && !tileRef.current.contains(event.target)) {
      setIsChecked(false);
      setShowEditMenu(false);
    }
  };

  //listen for any document clicks
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);


 //convert db timestap to string format
  const formattedTimestampDateFns = updatedAt && updatedAt.toDate
    ? format(updatedAt.toDate(), 'MMM dd')
    : 'N/A';

  //check for . in file then split it so the last part is the extension 
  const fileExtension = name.includes('.') ? name.split('.').pop() : '';
  let fileIcon;

  //determine file icon to show for file
  switch (fileExtension) {
    case 'pdf':
      fileIcon = <FaFilePdf className={`text-7xl text-purple-500 ${isChecked ? 'text-blue-600' : ''}`} />;
      break;
    case 'docx':
      fileIcon = <FaFileWord className={`text-7xl text-blue-500 ${isChecked ? 'text-blue-600' : ''}`} />;
      break;
    case 'xlsx':
      fileIcon = <FaFileExcel className={`text-7xl text-green-500 ${isChecked ? 'text-blue-600' : ''}`} />;
      break;
    case 'pptx':
      fileIcon = <FaFilePowerpoint className={`text-7xl text-red-500 ${isChecked ? 'text-blue-600' : ''}`} />;
      break;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      fileIcon = <FaFileImage className={`text-7xl text-yellow-500 ${isChecked ? 'text-blue-600' : ''}`} />;
      break;
    default:
      fileIcon = <FaFile className={`text-7xl ${isChecked ? 'text-blue-600' : ''}`} />;
      break;
  }


  return (
    <div className='h-full p-2 justify-center mb-5 mt-5' onDoubleClick={onDoubleClick} ref={tileRef}>
      
        <>
          <div className="relative">
            <div className="absolute top-2 right-2 bg-white rounded-md p-1 text-gray-700 text-xs uppercase font-semibold">
              {type === 'folder' ? 'Folder' : fileExtension}
            </div>
          </div>
          <div className={`h-3/4 rounded-lg items-center justify-center text-center border ${tileBgColor} ${tileBorderColor} ${isChecked ? 'bg-blue-100 border-blue-300' : ''}`}>
            <div
              className={`w-full h-full flex items-center justify-center  ${iconColor}`}
              onClick={handleTileClick}
            >
              {type === 'folder' ? (
                <FaFolder className={`text-7xl ${isChecked ? 'text-blue-600' : ''}`} />
              ) : (
                fileIcon
              )}
            </div>
          </div>

          {showEditMenu && (
            <div className="relative">
              <div className="absolute top-full w-44 left-20 mt-2 bg-white border border-gray-300 rounded-md shadow-md z-10 text-gray-700">
                <ul>
                  <li className="px-4 w-full py-2 cursor-pointer hover:bg-gray-100 inline-flex" onClick={handleDownload}>
                    <FaDownload className="text-md mr-2  " />
                    <span className="inline text-sm mb-2">Download</span>
                  </li>
                </ul>
              </div>
            </div>

          )}
          {isChecked && (
            <div className="relative">

              <div className="absolute top-0 right-0 p-2">
                <input type="checkbox" checked={isChecked} />
              </div>
            </div>
          )}
          <p className="mt-3 text-left truncate text-base">
            {name.replace(/\.[^/.]+$/, '')}
          </p>
          <div className="flex items-center">
            <div className="h-5 w-5 rounded-full overflow-hidden">
              <img
                src={userData?.profileimg || ''}
                alt="Partner Logo"
                className="h-full w-full object-cover rounded-full bg-white border-1 opacity-90"
              />
            </div>

            <p className="text-gray-400 text-xs ml-1 mr-1">
              {userData?.firstname} {userData?.lastname}
            </p>


            <FaCircle className="text-gray-400 text-xs h-1 w-1 mt-0.5 mx-1" />

            <div className="ml-1 rounded-md border-1 border-gray-400">
              <p className="text-gray-400 text-xs  ml-1 mr-1 justify-end">
                {formattedTimestampDateFns}
              </p>
            </div>

          </div>
        </>
    </div>
  );
};

export default FileTile;
