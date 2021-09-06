import { combineReducers } from "redux";

import posts from "./posts";
import Auth from "./Auth";

export default combineReducers({
  posts,
  Auth,
});
