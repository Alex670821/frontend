import { combineReducers } from "redux";
import auth from "./auth";
import stream from "./stream";
//import subscription from "./subscription";
import points from './points';
export default combineReducers({
  auth,
  stream,
  //subscription,
  points
});