import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import articleSlice from "./pages/articleSlice";

const reducers = combineReducers({
  article: articleSlice,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["article"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
