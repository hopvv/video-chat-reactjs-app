import {all, take, put, call, fork, takeLatest, takeEvery} from 'redux-saga/effects'
import {myFirebase, myFirestore} from "../firebase/myFirebase";
import Types from "../constants/types";
import User from "../models/user";
import * as CONSTS from "../constants/constants";
import {watchGetAPOD} from "./APODSaga";

// To apply the default browser preference.
myFirebase.auth().useDeviceLanguage();

/**
 *
 * @param action: type Object
 * @returns {IterableIterator<<"PUT", PutEffectDescriptor<{data: *, type: *}>>|<"CALL", CallEffectDescriptor>|IterableIterator<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>|*>|User>}
 */
function* login({email, password}) {
  try {
    const data = yield call([myFirebase.auth(), myFirebase.auth().signInWithEmailAndPassword], email, password);
    if (data) {
      const user = User.mappingObject(data.user);
      yield progressFirebaseCloudStore(user);
      yield put({type: Types.LOGIN_SUCCESS, data: user});
    } else {
      yield put({type: Types.LOGIN_FAILURE, data: data});
    }
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
    localStorage.setItem(CONSTS.ACCESS_TOKEN, user.accessToken || "");
    localStorage.setItem(CONSTS.REFRESH_TOKEN, user.refreshToken || "");
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
    localStorage.removeItem(CONSTS.ACCESS_TOKEN);
    localStorage.removeItem(CONSTS.REFRESH_TOKEN);
  } catch (e) {
    console.error('Can not using localStorage', e);
    throw e;
  }
}

function* loginGoogleAccount() {
  try {
    const authProvider = yield new myFirebase.auth.GoogleAuthProvider();
    const data = yield call([myFirebase.auth(), myFirebase.auth().signInWithPopup], authProvider);
    if (data) {
      const user = User.mappingObject(data.user);
      yield progressFirebaseCloudStore(user);
      yield put({type: Types.LOGIN_SUCCESS, data: user});
    } else {
      yield put({type: Types.LOGIN_FAILURE, data: data});
    }
  } catch (error) {
    const error_message = {code: error.code, message: error.message};
    yield put({type: Types.LOGIN_FAILURE, data: error_message});
  }
}

function* loginFacebookAccount() {
  try {
    const authFacebookProvider = yield new myFirebase.auth.FacebookAuthProvider();
    authFacebookProvider.addScope('user_birthday');
    authFacebookProvider.setCustomParameters({
      'display': 'popup'
    });
    const data = yield call([myFirebase.auth(), myFirebase.auth().signInWithPopup], authFacebookProvider);
    if (data) {
      const user = User.mappingObject(data.user);
      yield progressFirebaseCloudStore(user);
      yield put({type: Types.LOGIN_SUCCESS, data: user});
    } else {
      yield put({type: Types.LOGIN_FAILURE, data: data});
    }
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


/*
 * example handle async call back function:
 * const { result, components } = yield call(() => new Fingerprint2().get((result, components) => ({ result, components })))
 *
 * or using eventChannel: more detail, please read on https://redux-saga.js.org/docs/advanced/Channels.html
 */
function* verify(dispatch) {
  const promise = new Promise(resolve => {
    myFirebase.auth().onAuthStateChanged((user) => {
      resolve(user);
    });
  });
  
  
  const user = yield promise;
  if(user) {
    // User is signed in.
    yield put({type: Types.VERIFY_SUCCESS, data: User.mappingObject(user)});
  } else {
    console.warn("No user is signed in.");
    yield put({type: Types.LOGIN_FAILURE});
  }
}

function* watchLogin() {
  yield takeLatest(Types.LOGIN_REQUEST, login);
}

function* watchLoginGoogleAccount() {
  yield takeLatest(Types.LOGIN_GOOGLE_ACCOUNT_REQUEST, loginGoogleAccount);
}

function* watchLoginFacebookAccount() {
  yield takeLatest(Types.LOGIN_FACEBOOK_ACCOUNT_REQUEST, loginFacebookAccount);
}

function* watchLogout() {
  yield takeLatest(Types.LOGOUT_REQUEST, logout);
}

function* watchVerify() {
  yield takeLatest(Types.VERIFY_REQUEST, verify);
}

export default [
  fork(watchGetAPOD),
  fork(watchLogin),
  fork(watchLoginGoogleAccount),
  fork(watchLoginFacebookAccount),
  fork(watchLogout),
  fork(watchVerify)
];