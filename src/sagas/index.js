import { all, take, put, call, fork, takeLatest } from 'redux-saga/effects'

import {
  watchGetAPOD,
} from "./APODSaga";
import authSaga from "./authSaga";
import userProfileSaga from "./userProfileSaga";

export default function* root() {
  yield all([
    ...authSaga,
    ...userProfileSaga
  ]);
}