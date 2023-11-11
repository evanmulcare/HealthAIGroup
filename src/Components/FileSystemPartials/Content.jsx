import React from 'react';
import ShowItems from './ShowItems';
import FolderComponent from './FolderComponent';
import { useSelector, shallowEqual } from 'react-redux';
import { FaFolderOpen } from 'react-icons/fa';

//Shows content for the folder. used in main layout
const Content = ({ isSubFolder, setIsSubfolder, category }) => {

  const { folders, files } = useSelector((state) => ({
    folders: state.fileSystem.folders.filter(folder => folder.parent == "root"),
    files: state.fileSystem.files.filter(folder => folder.parent == "root"),
  }), shallowEqual)


  return (
    <div>
      {/*If the current directory is a subfolder go to the folder component */}
      {isSubFolder ? (
        <FolderComponent
          isSubFolder={isSubFolder}
          setIsSubfolder={setIsSubfolder}
          category={category}
        />
      ) : (
        <>
          {/*If theree are files or folders show them */}

          {folders.length > 0 || files.length > 0 ? (
            <div className='h-full'>
              <ShowItems
                title={"Folders"}
                type={"folder"}
                items={folders}
                isSubFolder={isSubFolder}
                setIsSubfolder={setIsSubfolder}
                category={category}
              />
              <ShowItems
                title={"Files"}
                type={"file"}
                items={files}
                isSubFolder={isSubFolder}
                setIsSubfolder={setIsSubfolder}

              />
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center mt-20">
              <FaFolderOpen className="text-6xl text-gray-500 mb-4" />
              <h1 className="text-2xl text-gray-700 font-semibold">
                Empty Folder
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );

}

export default Content;
