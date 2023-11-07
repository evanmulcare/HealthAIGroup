import * as types from "../actionTypes/TranslationActionTypes";

const initialState = {
    selectedLanguage: 'english', 
  };

  const TranslationReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.CHANGE_TRANSLATION:
        return {
          ...state,
          selectedLanguage: action.payload,
        };
      
      default:
        return state;
    }
  };
  
  export default TranslationReducer;
