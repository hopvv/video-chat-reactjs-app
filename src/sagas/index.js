import { all, take, put, call, fork, takeLatest } from 'redux-saga/effects'

import {
  watchGetAPOD,
} from "./APODSaga";

export default function* root() {
  yield all([fork(watchGetAPOD)]);
}