import { combineReducers } from "redux";
import auth from "./auth";
//import subscription from "./subscription";
import points from './points';
export default combineReducers({
  auth,
  //subscription,
  points
});