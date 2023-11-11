import * as types from "../actionTypes/ReportActionTypes";

const initialState = {
    reports: [],
  };
  
  const ReportReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.FETCH_REPORTS:
        return {
          ...state,
          reports: action.payload,
        };
      case types.CREATE_REPORT:
        return {
          ...state,
          reports: [...state.reports, action.payload],
        };
      default:
        return state;
    }
  };
  

export default ReportReducer