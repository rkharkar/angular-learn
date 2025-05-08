import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { usersFeature } from './user/users.reducer';
import { threadsFeature } from './thread/threads.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(),
    provideState(usersFeature),
    provideState(threadsFeature),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      trace: true,
      traceLimit: 75,
      connectInZone: true
    })
  ]
};
