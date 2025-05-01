import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { TrackComponent } from './track/track.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'artists/:id',
    component: ArtistComponent
  },
  {
    path: 'albums/:id',
    component: AlbumComponent
  },
  {
    path: 'tracks/:id',
    component: TrackComponent
  }
];
