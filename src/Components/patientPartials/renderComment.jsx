import React from 'react'
import { format } from 'date-fns';
import DefaultProfile from '../../Assets/DefaultProfile.png'

const renderComment = (comment, currentUser, userData) => {
    const commentUser = userData?.find((user) => user?.docId === comment?.creator);
    
    // Check the timestamp , comments created initally will be set to now
    const commentDate = comment?.created && comment?.created.toDate ? comment.created.toDate() : null;
    const formattedDate = commentDate ? format(commentDate, 'MMM dd, yyyy') : 'Now';
  
    const isCurrentUser = comment.creator === currentUser.uid;
    const isRightAligned = isCurrentUser ? 'text-right' : 'text-left';
  
    return (
      <div key={comment.id} className={`${isCurrentUser ? 'self-end' : 'self-start'} mb-2`}>
        <div className='flex justify-start'>
          {!isCurrentUser && (
            <div className='flex items-center'>
              <div className='h-10 w-10 mr-2 rounded-full overflow-hidden'>
                <img
                  src={commentUser?.profileimg || DefaultProfile}
                  alt={`profile`}
                  className='h-full w-full object-cover'
                />
              </div>
            </div>
          )}
          <div>
            <div className={`text-gray-700 text-xs ${isRightAligned}`}>
              {isCurrentUser ? (comment?.created ? formattedDate : 'N/A') : `${commentUser?.firstname} ${commentUser?.lastname}  ${comment?.created ? formattedDate : 'N/A'}`}
            </div>
            <div
              className={`${isCurrentUser
                ? 'bg-blue-500 text-white rounded-br-lg rounded-tl-lg '
                : 'bg-white text-gray-800 border rounded-bl-lg rounded-tr-lg'
                } p-3 max-w-xs text-center flex flex-col h-auto`}
              style={{
                width: 'max-content',
              }}
            >
              <p className='max-w-xs text-base overflow-hidden break-words'>{comment?.comment}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default renderComment