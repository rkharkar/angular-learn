import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from "@angular/common/http";

import { appStoreProviders } from './app.store';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ appStoreProviders, provideHttpClient() ],
  bootstrap: [AppComponent]
})
export class AppModule { }
