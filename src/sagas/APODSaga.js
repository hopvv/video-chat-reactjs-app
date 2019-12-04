import { all, take, put, call, fork, takeLatest, takeEvery } from 'redux-saga/effects'

import Types from "../constants/types";
import { NUMBER_APOD_IMAGES } from "../constants/config";
import { DATE_FORMAT_APOD_API } from "../constants/constants";
import moment from "moment";

import keyOfTheDayServices from "../services/keyOfTheDayServices";

function* getAPODs() {
  const dates = [];
  for(let i = 0; i < NUMBER_APOD_IMAGES; i++) {
    const date = moment().add(i * -1, 'days').format(DATE_FORMAT_APOD_API);
    dates.push(date);
  }
  yield all(dates.map(function* (date) {
    const res = yield call(keyOfTheDayServices.astronomyPictureOfTheDay.bind(null, date));
    if (res && res.success) {
      yield put({type: Types.GET_APOD_SUCCESS, data: res.data, date})
    }
  }));
}

export function* watchGetAPOD() {
  yield takeLatest(Types.GET_APOD, getAPODs);
}