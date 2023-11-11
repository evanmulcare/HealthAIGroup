import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import authReducer from './AuthReducer.js';
import fileSystemsReducer from './FileSystemReducer.js';
import commentReducer from './commentReducer.js';
import ReportReducer from './ReportReducer.js';
import TranslationReducer from './TranslationReducer.js';

const rootReducer = (state, action) => {

  // reset the entire state by passing the 'appReducer' with 'undefined' if logout is dispatched
  if (action.type === 'LOGOUT_USER') {
    return appReducer(undefined, action)
  }
  //if the action is not logout, return the state with the updated actions changes
  return appReducer(state, action)
}
//combine all the reducer into a single 'appReducer'
const appReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  fileSystem: fileSystemsReducer,
  comments: commentReducer,
  reports: ReportReducer,
  language: TranslationReducer
});

export default rootReducer;
