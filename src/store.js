import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import logger from "./middleware/logger";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer,
  middleware: [thunk, logger],
});
