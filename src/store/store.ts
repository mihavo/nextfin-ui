import accountsReducer from '@/features/account/accountSlice';
import authReducer from '@/features/auth/authSlice';
import employeeReducer from '@/features/employees/employeeSlice';
import holdersReducer from '@/features/holders/holderSlice';
import statsReducer from '@/features/stats/statsSlice';
import transactionReducer from '@/features/transactions/transactionSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import localForage from 'localforage';
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

const rootReducer = combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  transactions: transactionReducer,
  employees: employeeReducer,
  holders: holdersReducer,
  stats: statsReducer,
});

const persistConfig = { key: 'root', storage: localForage };

export type RootReducerType = ReturnType<typeof rootReducer>;
const store = configureStore({
  reducer: persistReducer<RootReducerType>(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.DEV,
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
