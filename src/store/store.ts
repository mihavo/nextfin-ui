import accountsReducer from '@/features/account/accountSlice';
import authReducer from '@/features/auth/authSlice';
import transactionReducer from '@/features/transactions/transactionSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = {
  auth: authReducer,
  accounts: accountsReducer,
  transactions: transactionReducer,
};

const persistConfig = { key: 'root', storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers(rootReducer)),
  devTools: process.env.NODE_ENV !== 'production',
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
