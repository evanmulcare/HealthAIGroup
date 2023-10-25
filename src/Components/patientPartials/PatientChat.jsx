import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../Contexts/actionCreators/commentActionCreator';
import { createCommentAsync } from '../../Contexts/actionCreators/commentActionCreator';
import { getUsers } from '../../Contexts/actionCreators/ userActionCreator';
import renderComment from './renderComment';

const PatientChat = ({ reciever }) => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [newComment, setNewComment] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getComments());

    }, [dispatch]);

    const selectUsers = (state) => state.users.users;
    const userData = useSelector(selectUsers);

    const selectCommentsByParentId = (state, recieverId) => {
        return state.comments.comments.filter(comment => comment.reciever === recieverId);
    };

    const comments = useSelector(state => selectCommentsByParentId(state, reciever?.docId));
    comments.sort((a, b) => a.created - b.created);


    const handleCreateComment = async () => {
        const newCommentData = {
            created: new Date(),
            creator: currentUser.uid,
            reciever: reciever?.docId,
            comment: newComment,
        };
        dispatch(createCommentAsync(newCommentData));
        setNewComment('');
    };

    return (
        <div className='overflow-y-hidden'>
            <div className="h-full flex flex-col mb-20">
                <div className="flex-grow p-4 overflow-y-scroll">
                    <div className="flex flex-col">
                        {comments.length === 0 ? (
                            <div className="h-screen w-full flex flex-col justify-center items-center">
                                <FaExclamationTriangle className="text-6xl text-gray-500 mb-4" />
                                <h1 className="text-2xl text-gray-700 font-semibold">
                                    No Discussion Yet...
                                </h1>
                            </div>
                        ) : (
                            comments && comments.map((comment) => renderComment(comment, currentUser, userData))
                        )}
                    </div>
                </div>

            </div>
            <div className='fixed bottom-0 p-3 inline-flex items-center border-t w-full bg-gray-50'>

                <div className="mr-2 flex-grow">

                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="h-10 ml-2 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        maxLength={280}
                    />
                </div>
                <button
                    className="text-blue-500 hover:text-blue-700 m-3 md:m-5" onClick={() => handleCreateComment()}
                >
                    Post
                </button>

            </div>
        </div>

    )
}

export default PatientChat