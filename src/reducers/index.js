import { combineReducers } from 'redux'

import keyOfTheDayReducer from "./keyOfTheDayReducer";
import authReducer from "./authReducer";

const appReducer = combineReducers({
  // Put reducer here
  keyOfTheDayReducer,
  authReducer
  // ...
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;