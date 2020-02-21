import Immutable from 'seamless-immutable';
import User from "../models/user";

export default {
  keyOfTheDayReducer: Immutable({}),
  authReducer: Immutable(Object.assign(new User(), {
    loading: false,
    loggedIn: false,
    verifying: false,
    signOnProcessingStatus: false,
    verifyProcessingStatus: false,
    signInProcessingStatus: false,
    messageAuth: ""
  }))
}