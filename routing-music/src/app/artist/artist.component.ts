import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.css'],
    standalone: false
})
export class ArtistComponent implements OnInit {
  private id: string;
  public artist: any;

  constructor(
    route: ActivatedRoute,
    private spotify: SpotifyService,
    private location: Location
  ) {
    route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.spotify
      .getArtist(this.id)
      .subscribe((res: any) => this.renderArtist(res));
  }

  public back(): void {
    this.location.back();
  }

  private renderArtist(res: any): void {
    this.artist = res;
  }
}
