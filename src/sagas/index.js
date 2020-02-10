import { all, take, put, call, fork, takeLatest } from 'redux-saga/effects'

import {
  watchGetAPOD,
} from "./APODSaga";
import authSaga from "./authSaga";

export default function* root() {
  yield all([
    ...authSaga
  ]);
}