import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { FaFolderOpen } from 'react-icons/fa';
import ShowItems from './ShowItems';

//used if current directory is a sub folder, gets the current files and folders of that directory and displays them. used in content.
const FolderComponent = ({ isSubFolder, setIsSubfolder, category }) => {
  const { folderId } = useParams();

  const { childFolders, childFiles } = useSelector
    ((state) => ({
      childFolders: state.fileSystem.folders.filter(
        (folder) => folder.parent == folderId
      ),
      childFiles: state.fileSystem.files.filter(
        (file) => file.parent == folderId
      ),

    }), shallowEqual);

  return (

    <div>
      <div >
        {
          (childFolders.length > 0 || childFiles.length > 0) ? (
            <>
              <div className='h-screen'>
                {childFolders.length > 0 && (
                  <ShowItems
                    title={"Folders"}
                    type={"folder"}
                    items={childFolders}
                    isSubFolder={isSubFolder}
                    setIsSubfolder={setIsSubfolder}
                    category={category}
                  />
                )}
                {childFiles.length > 0 && (
                  <ShowItems
                    title={"Files"}
                    type={"file"}
                    items={childFiles}
                    isSubFolder={isSubFolder}
                    setIsSubfolder={setIsSubfolder}
                    category={category}
                  />
                )}
              </div>

            </>
          ) : (
            <div className="h-screen flex flex-col justify-center items-center">
              <FaFolderOpen className="text-6xl text-gray-500 mb-4" />
              <h1 className="text-2xl text-gray-700 font-semibold">Empty Folder</h1>
            </div>

          )
        }

      </div>


    </div>
  )
}

export default FolderComponent 