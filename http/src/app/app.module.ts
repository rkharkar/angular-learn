import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SimpleHttpComponent } from './simple-http/simple-http.component';
import { MoreHttpRequestsComponent } from './more-http-requests/more-http-requests.component';
import { YouTubeSearchComponent } from './you-tube-search/you-tube-search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { youTubeSearchInjectables } from './you-tube-search/you-tube-search.injectables';

@NgModule({
  declarations: [
    AppComponent,
    SimpleHttpComponent,
    MoreHttpRequestsComponent,
    YouTubeSearchComponent,
    SearchResultComponent,
    SearchBoxComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [youTubeSearchInjectables, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
