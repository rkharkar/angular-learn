import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { TrackComponent } from './track/track.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SPOTIFY_PROVIDERS } from './spotify.service';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({ declarations: [
        AppComponent,
        SearchComponent,
        ArtistComponent,
        AlbumComponent,
        TrackComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule], providers: [
        SPOTIFY_PROVIDERS,
        { provide: APP_BASE_HREF, useValue: '/' },
        // { provide: LocationStrategy, useClass: HashLocationStrategy },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
