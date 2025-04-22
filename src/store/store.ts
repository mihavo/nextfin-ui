import accountsReducer from '@/features/account/accountSlice';
import authReducer from '@/features/auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountsReducer,
    // transactions: transactionReducer, // TODO: Add transactions reducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
