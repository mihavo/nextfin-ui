import accountsReducer from '@/features/account/accountSlice';
import authReducer from '@/features/auth/authSlice';
import EmployeeReducer from '@/features/employees/employeeSlice';
import transactionReducer from '@/features/transactions/transactionSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  transactions: transactionReducer,
  employees: EmployeeReducer,
});

// const appReducer: (
//   state: ReturnType<typeof rootReducer> | undefined,
//   action: Action
// ) => ReturnType<typeof rootReducer> = (state, action) => {
//   if (action.type === 'auth/reset') {
//     return appReducer(undefined, action);
//   }
//   return rootReducer(state, action);
// };

const persistConfig = { key: 'root', storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
