import cartReducer from "./cartReducer.js";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// import storage from "redux-persist/lib/storage";
// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig={
    key: 'root',
    storage: AsyncStorage,
};

// import storageSession from 'redux-persist/lib/storage/session/session.js';
// const persistConfig = {
//   key: 'root',
//   storage: storage.session, // Use sessionStorage here
// };

// import createWebStorage from 'redux-persist/lib/storage/createWebStorage.js';
// const storage = createWebStorage({
//   keyPrefix: 'new_strapi_app:',
// });
// const persistConfig = {
//   key: 'root',
//   storage: storage, // Use the async storage for web
// };


const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);