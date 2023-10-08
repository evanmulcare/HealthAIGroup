// rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import patientReducer from './patientReducer.js';
import authReducer from './AuthReducer.js';

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}
const appReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  patients: patientReducer
});

export default rootReducer;
