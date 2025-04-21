import accountsReducer from '@/features/account/accountSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    // transactions: transactionReducer, // TODO: Add transactions reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
