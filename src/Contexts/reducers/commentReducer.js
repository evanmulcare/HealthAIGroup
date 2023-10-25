import * as types from "../actionTypes/commentsActionTypes";

const initialState = {
  comments: [],
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case types.CREATE_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    default:
      return state;
  }
};

export default commentReducer;
