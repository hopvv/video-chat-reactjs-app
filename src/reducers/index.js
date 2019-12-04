import { combineReducers } from 'redux'

import keyOfTheDayReducer from "./keyOfTheDayReducer";

const appReducer = combineReducers({
  // Put reducer here
  keyOfTheDayReducer,
  // ...
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;