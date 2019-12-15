import { all, take, put, call, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import {myFirebase} from "../firebase/myFirebase";
import Types from "../constants/types";


function* login({email, password}) {
  try {
    const data = yield call([myFirebase.auth(), myFirebase.auth().signInWithEmailAndPassword], email, password);
    yield put({type: Types.LOGIN_SUCCESS, data});
  } catch(error) {
    const error_message = { code: error.code, message: error.message };
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

export function* watchLogout() {
  yield takeLatest(Types.LOGOUT_REQUEST, logout);
}

export function* watchVerify() {
  yield takeLatest(Types.VERIFY_REQUEST, verify);
}