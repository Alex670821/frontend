import { SET_STREAMS, SET_CURRENT_STREAM } from "../actions/types";

const initialState = {
  streams: [],
  currentStream: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_STREAMS:
      return {
        ...state,
        streams: action.payload,
      };
    case SET_CURRENT_STREAM:
      return {
        ...state,
        currentStream: action.payload,
      };
    default:
      return state;
  }
}
