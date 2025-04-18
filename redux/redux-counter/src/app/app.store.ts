import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counter.reducer";
import { InjectionToken } from "@angular/core";

export const AppStore = new InjectionToken("App.store");

const createAppStore = () => {
  return configureStore({
    reducer: counterReducer,
    devTools: import.meta.env ? !import.meta.env.PROD : true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  });
}

export const appStoreProviders = [
  { provide: AppStore, useFactory: createAppStore }
]
