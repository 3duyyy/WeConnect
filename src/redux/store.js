import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import snackbarReducer from "./slices/snackbarSlice";
import settingsReducer from "./slices/settingSlice";
import dialogReducer from "./slices/dialogSlice";
import { rootApi } from "@services/rootApi";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { logoutMiddleWare } from "./middlewares";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [rootApi.reducerPath, "dialog", "settings"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    snackbar: snackbarReducer,
    settings: settingsReducer,
    dialog: dialogReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logoutMiddleWare, rootApi.middleware);
  },
});

export const persistor = persistStore(store);
