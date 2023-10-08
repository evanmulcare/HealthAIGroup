import * as types from "../actionTypes/patientActionTypes";

const initialState = {
  patients: [],
  isLoading: false,
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PATIENTS:
      return {
        ...state,
        patients: action.payload,
      };

    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default patientReducer;
