import initialState from "./initialState";
import Types from "../constants/types";

export default (state = initialState.authReducer, action) => {
  switch (action.type) {
    case Types.LOGIN_SUCCESS: {
      console.log("action LOGIN_SUCCESS", action);
      state = state.merge({...action.data});
      console.log("state", state);
      return state
        .set("loggedIn", true)
        .set("loading", false);
    }
    case Types.LOGIN_REQUEST: {
      console.log("action LOGIN_REQUEST", action);
      return state.set("loading", true);
    }
    case Types.LOGIN_FAILURE: {
      console.log("action LOGIN_FAILURE", action);
      return state.set("loading", false);
    }
    case Types.LOGOUT_SUCCESS: {
      console.log("action", action);
      return state
        .set("loggedIn", false)
        .set("loading", false);
    }
    case Types.LOGOUT_REQUEST: {
      console.log("action", action);
      return state.set("loading", true);
    }
    case Types.LOGOUT_FAILURE: {
      console.log("action", action);
      return state.set("loading", false);
    }
    case Types.VERIFY_REQUEST: {
      console.log("action", action);
      return state;
    }
    case Types.VERIFY_SUCCESS: {
      console.log("action", action);
      return state;
    }
    default:
      return state;
  }
};