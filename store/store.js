import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  adminAuth: adminReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "adminAuth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
