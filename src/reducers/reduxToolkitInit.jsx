import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import environmentSlice from './environmentSlice';
import userSlice from './userSlice';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  user: userSlice,
  environment: environmentSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['page404'],
};

const persistedReducers = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
