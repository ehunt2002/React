import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

//import UserReducer from "./src/components/userReducer";
import math from "./reducers/mathReducer";

const store = createStore(
  combineReducers({ math }),
  {},
  applyMiddleware(logger, thunk)
);

export default store;
