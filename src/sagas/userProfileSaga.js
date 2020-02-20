import {all, take, put, call, fork, takeLatest, takeEvery} from 'redux-saga/effects'
import {myFirestore} from "../firebase/myFirebase";
import Types from "../constants/types";
import * as CONST from "../constants/constants";

function* updateProfile(user) {
  try {
    const userDocRef = yield myFirestore.collection(CONST.USERS).doc(user.uid);
    const doc = yield userDocRef.get();
    if (doc.exists) {
      const result = {
        id: user.uid,
        displayName: user.displayName,
        des: user.des,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      };
      yield userDocRef.set(result);
      yield put({type: Types.UPDATE_PROFILE_SUCCESS, data: user});
    } else {
      yield put({type: Types.UPDATE_PROFILE_FAILURE, data: "There is no user to update."});
    }
  } catch (error) {
    console.error("Can not update profile", error);
    const error_message = {code: error.code, message: error.message};
    yield put({type: Types.UPDATE_PROFILE_FAILURE, data: error_message});
  }
}

function* watchUpdateProfile() {
  yield takeLatest(Types.UPDATE_PROFILE_REQUEST, updateProfile)
}

export default [
  fork(watchUpdateProfile)
];