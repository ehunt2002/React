import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";

//import UserReducer from "./src/components/userReducer";
import math from "./reducers/mathReducer";

const store = createStore(
  combineReducers({ math }),
  {},
  applyMiddleware(logger)
);

export default store;
