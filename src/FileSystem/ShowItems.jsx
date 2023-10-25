import React, { useState } from 'react'
import FileTile from './FileTile';
import { useDispatch } from 'react-redux';
import { changeFolder } from '../Contexts/actionCreators/FileSystemActionCreator';
import { useNavigate } from 'react-router-dom';

const ShowItems = ({ title, items, type, setIsSubfolder, category }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // either go to subfolder or open file depending on type
  const handleClick = (itemId) => {
    if (type === 'folder') {
      dispatch(changeFolder(itemId));
      navigate(`/Patients/${category}/${category}/${itemId}`);
      setIsSubfolder(true);
    } else {
      navigate(`/file/${itemId}`);
    }
  };

  return (
    <div className="w-full">

      <div className="flex items-center mb-4 mt-4">
        <h2 className="text-xl text-gray-600">{title}</h2>
      </div>  {items.length === 0 ? (
        <p className="text-left text-gray-500">{`No ${type} items to display.`}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {items.map((item, index) => (
            <div key={index} className="mb-10"> 
              <FileTile
                name={item.name ?? ""}
                url={item.url ?? ""}
                createdBy={item.createdBy ?? ""}
                UserId={item.userId ?? ""}
                updatedAt={item.createdAt ?? ""}
                type={type}
                onDoubleClick={() => handleClick(item?.docId)}
              />
            </div>
          ))}
        </div>
      )}
    </div>


  );
};

export default ShowItems;
