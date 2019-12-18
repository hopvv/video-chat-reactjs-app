import { all, take, put, call, fork, takeLatest } from 'redux-saga/effects'

import {
  watchGetAPOD,
} from "./APODSaga";
import {
  watchLogin, watchLogout, watchVerify, watchLoginGoogleAccount
} from "./authSaga";

export default function* root() {
  yield all([
    fork(watchGetAPOD),
    fork(watchLogin),
    fork(watchLoginGoogleAccount),
    fork(watchLogout),
    fork(watchVerify)
  ]);
}