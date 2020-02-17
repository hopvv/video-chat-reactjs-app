import {all, take, put, call, fork, takeLatest, takeEvery} from 'redux-saga/effects'
import {myFirebase, myFirestore} from "../firebase/myFirebase";
import Types from "../constants/types";
import User from "../models/user";
import * as CONST from "../constants/constants";
import {watchGetAPOD} from "./APODSaga";

// To apply the default browser preference.
const myFirebaseAuth = myFirebase.auth();
myFirebaseAuth.useDeviceLanguage();

/**
 *
 * @param displayName
 * @param email
 * @param password
 * @param phoneNumber
 * @returns {IterableIterator<*>}
 */
function* signOn({displayName, email, password, phoneNumber}) {
  try {
    const data = yield call([myFirebaseAuth, myFirebaseAuth.createUserWithEmailAndPassword], email, password);
    if (data) {
      const user = User.mappingObject(data.user);
      yield progressFirebaseCloudStore(Object.assign({}, {...user}, {displayName, phoneNumber}), true);
      yield put({type: Types.SIGN_ON_SUCCESS, data: user});
    } else {
      yield put({type: Types.SIGN_ON_FAILURE, data: data});
    }
  } catch (error) {
    console.error("Can not register new account:", error);
    const error_message = {code: error.code, message: error.message};
    yield put({type: Types.SIGN_ON_FAILURE, data: error_message});
  }
}

/**
 *
 * @param action: type Object
 * @returns {IterableIterator<<"PUT", PutEffectDescriptor<{data: *, type: *}>>|<"CALL", CallEffectDescriptor>|IterableIterator<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>|*>|User>}
 */
function* login({email, password}) {
  try {
    const data = yield call([myFirebaseAuth, myFirebaseAuth.signInWithEmailAndPassword], email, password);
    if (data) {
      const user = User.mappingObject(data.user);
      const userDB = yield progressFirebaseCloudStore(user);
      const u = {...user, ...userDB};
      yield put({type: Types.LOGIN_SUCCESS, data: u});
    } else {
      if (data.code === "auth/user-not-found" || data.code === "auth/wrong-password") {
        yield put({type: Types.LOGIN_FAILURE, data: "Your username or password is invalid!"});
      } else {
        yield put({type: Types.LOGIN_FAILURE, data: "There is something wrong when login. Please try again."});
      }
    }
  } catch (error) {
    const error_message = {code: error.code, message: error.message};
    console.error(error_message);
    yield put({type: Types.LOGIN_FAILURE, data: "There is something wrong when login. Please try again."});
  }
}

/**
 *
 * @param user Object
 * @param keepNotSaveLocal: using when we do not want save user to local storage
 * @returns {IterableIterator<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>|*>}
 */
function* progressFirebaseCloudStore(user, keepNotSaveLocal) {
  const userDocRef = yield myFirestore.collection(CONST.USERS).doc(user.uid);
  const doc = yield userDocRef.get();
  if (doc.exists) {
    const data = doc.data();
    if (data) {
      setUserToLocalStorage({...user, ...data});
    }
    return data;
  } else {
    try {
      const result = {
        id: user.uid,
        displayName: user.displayName,
        des: "Hello everybody, I'm new",
        photoURL: user.photoURL
      };
      yield userDocRef.set(result);
      !keepNotSaveLocal && setUserToLocalStorage({...user, ...result});
    } catch (e) {
      console.error("Can not set data to firebase", e.message);
      throw e;
    }
    return null;
  }
}

/**
 *
 * @param user Object
 */
function setUserToLocalStorage(user) {
  try {
    localStorage.setItem(CONST.ID, user.uid || "");
    localStorage.setItem(CONST.DISPLAY_NAME, user.displayName || user.email);
    localStorage.setItem(CONST.PHOTO_URL, user.photoURL || "");
    localStorage.setItem(CONST.DESCRIPTION, user.des || "");
    localStorage.setItem(CONST.ACCESS_TOKEN, user.accessToken || "");
    localStorage.setItem(CONST.REFRESH_TOKEN, user.refreshToken || "");
  } catch (e) {
    console.error('Can not using localStorage', e);
    throw e;
  }
}

/**
 * Clean user local storage
 */
function cleanUserLocalStorage() {
  try {
    localStorage.removeItem(CONST.ID);
    localStorage.removeItem(CONST.DISPLAY_NAME);
    localStorage.removeItem(CONST.PHOTO_URL);
    localStorage.removeItem(CONST.DESCRIPTION);
    localStorage.removeItem(CONST.ACCESS_TOKEN);
    localStorage.removeItem(CONST.REFRESH_TOKEN);
  } catch (e) {
    console.error('Can not using localStorage', e);
    throw e;
  }
}

/**
 * Loginby google account
 * @returns {IterableIterator<IterableIterator<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>|*>|firebase.auth.GoogleAuthProvider|<"CALL", CallEffectDescriptor>|<"PUT", PutEffectDescriptor<{data: *, type: *}>>>}
 */
function* loginGoogleAccount() {
  try {
    const authProvider = yield new myFirebase.auth.GoogleAuthProvider();
    authProvider.setCustomParameters({prompt: 'select_account'});
    const data = yield call([myFirebaseAuth, myFirebaseAuth.signInWithPopup], authProvider);
    if (data) {
      const user = User.mappingObject(data.user);
      const userDB = yield progressFirebaseCloudStore(user);
      yield put({type: Types.LOGIN_SUCCESS, data: {...user, ...userDB}});
    } else {
      yield put({type: Types.LOGIN_FAILURE, data: data});
    }
  } catch (error) {
    const error_message = {code: error.code, message: error.message};
    yield put({type: Types.LOGIN_FAILURE, data: error_message});
  }
}

/**
 * Login ny facebook account (NOT WORKING NOW)
 * @returns {IterableIterator<IterableIterator<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>|*>|firebase.auth.FacebookAuthProvider|<"CALL", CallEffectDescriptor>|<"PUT", PutEffectDescriptor<{data: *, type: *}>>>}
 */
function* loginFacebookAccount() {
  try {
    const authFacebookProvider = yield new myFirebase.auth.FacebookAuthProvider();
    authFacebookProvider.addScope('user_birthday');
    authFacebookProvider.setCustomParameters({
      'display': 'popup'
    });
    const data = yield call([myFirebaseAuth, myFirebaseAuth.signInWithPopup], authFacebookProvider);
    if (data) {
      const user = User.mappingObject(data.user);
      const userDB = yield progressFirebaseCloudStore(user);
      yield put({type: Types.LOGIN_SUCCESS, data: {...user, ...userDB}});
    } else {
      yield put({type: Types.LOGIN_FAILURE, data: data});
    }
  } catch (error) {
    const error_message = {code: error.code, message: error.message};
    yield put({type: Types.LOGIN_FAILURE, data: error_message});
  }
}

/**
 * Log out
 * @returns {IterableIterator<<"PUT", PutEffectDescriptor<{data: *, type: *}>>|<"PUT", PutEffectDescriptor<{type: *}>>>}
 */
function* logout() {
  try {
    myFirebase.auth().signOut().then(() => {
      // TODO: do something after logout success
    });
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
    myFirebaseAuth.onAuthStateChanged((user) => {
      resolve(user);
    });
  });
  
  const userData = yield promise;
  if(userData) {
    const user = User.mappingObject(userData);
    const userDB = yield progressFirebaseCloudStore(user);
    // User is signed in.
    yield put({type: Types.VERIFY_SUCCESS, data: {...user, ...userDB}});
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

function* watchSignOn() {
  yield takeLatest(Types.SIGN_ON_REQUEST, signOn)
}
//
// function deleteAllCookies() {
//   const cookies = document.cookie.split(";");
//
//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i];
//     const eqPos = cookie.indexOf("=");
//     const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//     console.log("cookie", cookie)
//     console.log("name", name)
//     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//   }
// }

export default [
  fork(watchGetAPOD),
  fork(watchLogin),
  fork(watchLoginGoogleAccount),
  fork(watchLoginFacebookAccount),
  fork(watchLogout),
  fork(watchVerify),
  fork(watchSignOn)
];