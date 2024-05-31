// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import logger from 'redux-logger';
import { usersApi } from '@/lib/redux/service/usersApi';
import usersReducer from '@/lib/redux/slices/usersSlice';
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () =>
  configureStore({
    reducer: {
      [usersApi.reducerPath]: usersApi.reducer,
      users: usersReducer,
      // Tambahkan reducer lain di sini
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(usersApi.middleware)
        .concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
  });

setupListeners(makeStore().dispatch);


type Store = ReturnType<typeof makeStore>;
export type RootState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];

export const wrapper = createWrapper<Store>(makeStore);