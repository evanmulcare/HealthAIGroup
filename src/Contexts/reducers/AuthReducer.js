import * as types from "../actionTypes/authActionTypes";

const initialState = {
    currentUser: null,
};

const AuthReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case types.LOGIN_USER: {
            return {
                ...state,
                currentUser: action.payload,
            };
        }
        case types.LOGOUT_USER: {
            return {
                ...initialState,
            };
        }

        case types.REGISTER_USER: {
            return {
                ...state,
                currentUser: action.payload,
            };
        }
        default:
            return state;
    }
};

export default AuthReducer;
