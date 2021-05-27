import { combineReducers } from "redux";
import login from "./login";
import test from "./test";
import users from "./users";

import { sessionReducer } from "redux-react-session";

export default combineReducers({
  session: sessionReducer,
  login,
  test,
  users
});
