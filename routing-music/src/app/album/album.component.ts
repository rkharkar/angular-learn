import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  private id: string;
  public album: any;

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
      .getAlbum(this.id)
      .subscribe((res: any) => this.renderAlbum(res));
  }

  public back(): void {
    this.location.back();
  }

  private renderAlbum(res: any): void {
    this.album = res;
  }
}
