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
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  transactions: transactionReducer,
  employees: EmployeeReducer,
});

const persistConfig = { key: 'root', storage };

export type RootReducerType = ReturnType<typeof rootReducer>;
const store = configureStore({
  reducer: persistReducer<RootReducerType>(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
