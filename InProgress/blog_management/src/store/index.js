import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "../slices/bookmarkSlice"; 
import blogReducer from "../slices/blogSliceAdmin";
import {persistStore, persistReducer, PERSIST, PAUSE, PURGE, FLUSH, REGISTER, REHYDRATE} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";


const persistConfig = {
  key: 'blog-bookmarks',
  storage,
  version:1,
  stateReconciler: autoMergeLevel2
};

const persistBookmark = persistReducer(persistConfig, bookmarkReducer);

export const store = configureStore({
  reducer: {
    bookmark: persistBookmark,
    blogs: blogReducer
  } ,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  },
   
  devTools:true
});

export const newStore = persistStore(store); 