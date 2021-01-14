import { combineReducers, createStore } from "redux";
import blogAuthReducer from "./ducks/blogAuth";
import accountPrefsReducer from "./ducks/accountPrefs";

const reducer = combineReducers({
  auth: blogAuthReducer,
  prefs: accountPrefsReducer,
});

const store = createStore(reducer);

export default store;
