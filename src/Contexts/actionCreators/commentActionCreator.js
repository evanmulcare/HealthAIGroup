import * as types from "../actionTypes/commentsActionTypes";
import fire from "../../firebase";
import { toast } from "react-toastify";

const fetchComments = (comments) => ({
  type: types.FETCH_COMMENTS,
  payload: comments,
});

const addComment = (comment) => ({
  type: types.CREATE_COMMENT,
  payload: comment,
});


export const getComments = () => async (dispatch) => { 
  try {
    fire
    .firestore()
    .collection("comments") 
    .get()
    .then((comments) => { 
      const commentsData = [];
      comments.forEach((comment) => { 
        const commentData = comment.data(); 
        const commentId = comment.id; 
        const commentWithId = { ...commentData, docId: commentId };
        commentsData.push(commentWithId);
      });
      dispatch(fetchComments(commentsData)); 
    })
  
  } catch (error) {
    console.error("Error fetching comments: ", error); 
  }
};
export const createCommentAsync = (newCommentData) => async (dispatch) => {
  try {
    const docRef = await fire.firestore().collection("comments").add(newCommentData);
    const commentId = docRef.id; 
    const commentData = { ...newCommentData, docId: commentId };
    dispatch(addComment(commentData));
  } catch (error) {
    console.error("Error creating comment: ", error);
    toast.error("Error creating comment");
  }
};