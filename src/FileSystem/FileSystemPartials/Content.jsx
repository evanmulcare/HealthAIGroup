import React from 'react';
import ShowItems from './ShowItems';
import FolderComponent from './FolderComponent';
import { useSelector, shallowEqual } from 'react-redux';
import { FaFolderOpen } from 'react-icons/fa';

const Content = ({ isSubFolder, setIsSubfolder, category }) => {


    const { isLoading, userFolders, userFiles } = useSelector((state) => ({
        isLoading: state.filefolders.isLoading,
        userFolders: state.filefolders.userFolders.filter(folder=>folder.parent == "root"),
        userFiles: state.filefolders.userFiles.filter(folder=>folder.parent == "root"),
    }), shallowEqual)


    return (
        <div>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : isSubFolder ? (
            <FolderComponent
              isSubFolder={isSubFolder}
              setIsSubfolder={setIsSubfolder}
              category={category}
            />
          ) : (
            <>
              {userFolders.length > 0 || userFiles.length > 0 ? (
                <div className='h-full'>
                  <ShowItems
                    title={"Folders"}
                    type={"folder"}
                    items={userFolders}
                    isSubFolder={isSubFolder}
                    setIsSubfolder={setIsSubfolder}
                    category={category}
                  />
                  <ShowItems
                    title={"Files"}
                    type={"file"}
                    items={userFiles}
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
