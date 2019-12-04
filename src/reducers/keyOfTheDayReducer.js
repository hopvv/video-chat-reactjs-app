import initialState from "./initialState";
import {forEach} from "react-bootstrap/cjs/ElementChildren";

export default function keyOfTheDayReducer(state = initialState.keyOfTheDayReducer, action) {
  switch (action.type) {
    case "GET_APOD_SUCCESS": {
      const newState = {
        ...state,
        [action.date]: action.data
      };


      return newState;
    }
    default:
      return state;
  }
}

function sortDateState(state) {
  let keys = Object.keys(state);
};