import initialState from "./initialState";
import Types from "../constants/types";

export default (state = initialState.authReducer, action) => {
  switch (action.type) {
    case Types.LOGIN_SUCCESS: {
      state = state.merge({...action.data});
      return state
        .set("loggedIn", true)
        .set("loading", false);
    }
    case Types.LOGIN_REQUEST: {
      return state.set("loading", true);
    }
    case Types.LOGIN_GOOGLE_ACCOUNT_REQUEST: {
      return state.set("loading", true);
    }
    case Types.LOGIN_FAILURE: {
      return state.set("loading", false);
    }
    case Types.LOGOUT_SUCCESS: {
      return state
        .set("loggedIn", false)
        .set("loading", false);
    }
    case Types.LOGOUT_REQUEST: {
      return state.set("loading", true);
    }
    case Types.LOGOUT_FAILURE: {
      return state.set("loading", false);
    }
    case Types.SIGN_ON_FAILURE: {
      return state.set("loading", false);
    }
    case Types.SIGN_ON_REQUEST: {
      return state.set("loading", true);
    }
    case Types.SIGN_ON_SUCCESS: {
      state = state.merge({...action.data});
      return state.set("loading", false);
    }
    case Types.VERIFY_REQUEST: {
      return state.set("loading", true);
    }
    case Types.VERIFY_SUCCESS: {
      state = state.merge({...action.data})
        .set("loggedIn", true)
        .set("loading", false);
      return state;
    }
    default:
      return state;
  }
};