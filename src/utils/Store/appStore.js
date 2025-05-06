import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage for web (localStorage)
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice";
import connectionReducer from "./slices/connectionsSlice";
import requestReducer from "./slices/requestSlice";
import postReducer from "./slices/postSlice";

// Persist configuration for the user slice
const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"], // Only persist the `user` slice
};

// Combine all reducers
const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer), // Persisted user slice
  feed: feedReducer,
  connection: connectionReducer,
  request: requestReducer,
  post: postReducer,
});

// Configure the store
const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

// Create a persistor
export const persistor = persistStore(appStore);

export default appStore;
