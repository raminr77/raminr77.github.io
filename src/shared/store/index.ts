import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { REDUCER_NAMES } from '@/shared/constants/reducer-names';
import useReducer from '@/shared/store/user/user-slice';

const persistConfig = {
  storage,
  blacklist: [REDUCER_NAMES.USER],
  key: process.env.NEXT_PUBLIC_APP_NAME || 'Ramin'
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [REDUCER_NAMES.USER]: useReducer
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);
