import {all, take, put, call, fork, takeLatest, takeEvery} from 'redux-saga/effects'
import {myFirebase, myFirestore} from "../firebase/myFirebase";
import Types from "../constants/types";
import User from "../models/user";
import * as CONSTS from "../constants/constants";

function* login({email, password}) {
  try {
    const data = yield call([myFirebase.auth(), myFirebase.auth().signInWithEmailAndPassword], email, password);
    const user = User.mappingObject(data);
    yield progressFirebaseCloudStore(user);
    yield put({type: Types.LOGIN_SUCCESS, data: user});
    return user;
  } catch (error) {
    const error_message = {code: error.code, message: error.message};
    yield put({type: Types.LOGIN_FAILURE, data: error_message});
  }
}

function* progressFirebaseCloudStore(user) {
  const userDocRef = yield myFirestore.collection(CONSTS.USERS).doc(user.uid);
  const doc = yield userDocRef.get();
  if (doc.exists) {
    const data = doc.data();
    if (data) {
      setUserToLocalStorage({...user, ...data});
    }
  } else {
    try {
      const result = {
        id: user.uid,
        displayName: user.displayName,
        des: "Hello everybody, I'm new",
        photoURL: user.photoURL
      };
      yield userDocRef.set(result);
      setUserToLocalStorage({...user, ...result});
    } catch (e) {
      console.error("Can not set data to firebase", e.message);
      throw e;
    }
  }
}

function setUserToLocalStorage(user) {
  try {
    localStorage.setItem(CONSTS.ID, user.uid || "");
    localStorage.setItem(CONSTS.DISPLAY_NAME, user.displayName || user.email);
    localStorage.setItem(CONSTS.PHOTO_URL, user.photoURL || "");
    localStorage.setItem(CONSTS.DESCRIPTION, user.des || "");
  } catch (e) {
    console.error('Can not using localStorage', e);
    throw e;
  }
}

function cleanUserLocalStorage() {
  try {
    localStorage.removeItem(CONSTS.ID);
    localStorage.removeItem(CONSTS.DISPLAY_NAME);
    localStorage.removeItem(CONSTS.PHOTO_URL);
    localStorage.removeItem(CONSTS.DESCRIPTION);
  } catch (e) {
    console.error('Can not using localStorage', e);
    throw e;
  }
}

function* loginGoogleAccount() {
  try {
    const authProvider = yield new myFirebase.auth.GoogleAuthProvider();
    const data = yield call([myFirebase.auth(), myFirebase.auth().signInWithPopup], authProvider);
    const user = User.mappingObject(data);
    yield progressFirebaseCloudStore(user);
    yield put({type: Types.LOGIN_SUCCESS, data: user});
    return user;
  } catch (error) {
    const error_message = {code: error.code, message: error.message};
    yield put({type: Types.LOGIN_FAILURE, data: error_message});
  }
}

function* logout() {
  try {
    myFirebase.auth().signOut();
    //TODO: Should clear cookie firebase if any
    cleanUserLocalStorage();
    yield put({type: Types.LOGOUT_SUCCESS});
  } catch (e) {
    const error_message = {code: error.code, message: error.message};
    yield put({type: Types.LOGOUT_FAILURE, data: error_message});
  }
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