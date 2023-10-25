import * as types from "../actionTypes/userActionTypes";

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
