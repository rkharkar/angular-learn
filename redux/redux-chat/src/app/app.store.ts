import { InjectionToken } from '@angular/core';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './app.reducer';

export const AppStore = new InjectionToken('App.store');

const createAppStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: import.meta.env? !import.meta.env.PROD : true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  });
}

export const appStoreProviders = [
   { provide: AppStore, useFactory: createAppStore }
];
