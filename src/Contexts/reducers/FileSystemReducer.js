import * as types from '../actionTypes/FileSystemActionTypes';

const initialState = {
    currentFolder: "root",
    folders: [],
    files: [],
}

const fileSystemReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_FOLDERS:
            return {
                ...state,
                folders: action.payload,
            };
        case types.GET_FILES:
            return {
                ...state,
                files: action.payload,
            };
        case types.CREATE_FOLDER:
            return {
                ...state,
                folders: [...state.folders, action.payload],
            };
        case types.CREATE_FILE:
            return {
                ...state,
                files: [...state.files, action.payload],
            };
        case types.CHANGE_FOLDER:
            return {
                ...state,
                currentFolder: action.payload,
            };

        default: return state;

    }
}

export default fileSystemReducer;