import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  private id: string;
  public track: any;

  constructor(
    route: ActivatedRoute,
    private spotify: SpotifyService,
    private location: Location
  ) {
    route.params.subscribe((params: Params) => { this.id = params['id']; });
  }

  ngOnInit(): void {
    this.spotify
      .getTrack(this.id)
      .subscribe((res: any) => this.renderTrack(res));
  }

  public back(): void {
    this.location.back();
  }

  private renderTrack(res: any): void {
    this.track = res;
  }
}
