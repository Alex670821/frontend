import axios from "axios";
import { SET_STREAMS } from "./types";

export const getStreams = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8000/streams/");
    dispatch({
      type: SET_STREAMS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};
