import { all, take, put, call, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import {myFirebase} from "../firebase/myFirebase";
import Types from "../constants/types";
import User from "../models/user";

function* login({email, password}) {
  try {
    const data = yield call([myFirebase.auth(), myFirebase.auth().signInWithEmailAndPassword], email, password);
    console.log("login data", data)
    const user = User.mappingObject(data);
    console.log("login user", user)
    yield put({type: Types.LOGIN_SUCCESS, data: user});
  } catch(error) {
    const error_message = { code: error.code, message: error.message };
    yield put({type: Types.LOGIN_FAILURE, data: error_message});
  }
}

function* loginGoogleAccount() {
  try {
    const authProvider = yield new myFirebase.auth.GoogleAuthProvider();
    const data = yield call([myFirebase.auth(), myFirebase.auth().signInWithPopup], authProvider);
    console.log("login data", data)
    const user = User.mappingObject(data);
    console.log("login user", user)
    yield put({type: Types.LOGIN_SUCCESS, data: user});
  } catch(error) {
    const error_message = { code: error.codhomee, message: error.message };
    yield put({type: Types.LOGIN_FAILURE, data: error_message});
  }
}

function* logout() {
  console.log("on logout saga")
}

function* verify() {
  console.log("on verify saga")
}

export function* watchLogin() {
  yield takeLatest(Types.LOGIN_REQUEST, login);
}

export function* watchLoginGoogleAccount() {
  yield takeLatest(Types.LOGIN_GOOGLE_ACCOUNT_REQUEST, loginGoogleAccount);
}

export function* watchLogout() {
  yield takeLatest(Types.LOGOUT_REQUEST, logout);
}

export function* watchVerify() {
  yield takeLatest(Types.VERIFY_REQUEST, verify);
}