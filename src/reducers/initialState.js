import Immutable from 'seamless-immutable';
import User from "../models/user";

export default {
  keyOfTheDayReducer: Immutable({}),
  authReducer: Immutable(Object.assign(new User(), {
    loading: false,
    loggedIn: false,
    signOnProcessingStatus: false,
    signInProcessingStatus: false,
    messageAuth: ""
  }))
}