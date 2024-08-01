import { combineReducers } from "@reduxjs/toolkit";
import reduxCsvReducer from "./reduxCsvReducer";

const reduxRootReducer = combineReducers({
  csv: reduxCsvReducer,
});

export default reduxRootReducer;
