import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  public static BASE_URL = "https://api.spotify.com/v1";

  constructor(private http: HttpClient) {}

  private query(URL: string, params?: string[]): Observable<any> {
    let queryURL = `${SpotifyService.BASE_URL}${URL}`;
    if (params) {
      queryURL = `${queryURL}?${params.join("&")}`;
    }
    const apiKey = environment.spotifyApiKey;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${apiKey}`
    });
    const options = {
      headers: headers
    };

    return this.http.request("GET", queryURL, options);
  }

  private search(query: string, type: string): Observable<any> {
    return this.query(`/search`, [`q=${query}`, `type=${type}`]);
  }

  public searchTrack(query: string): Observable<any> {
    return this.search(query, "track");
  }

  public getTrack(id: string): Observable<any> {
    return this.query(`/tracks/${id}`);
  }

  public getArtist(id: string): Observable<any> {
    return this.query(`/artists/${id}`);
  }

  public getAlbum(id: string): Observable<any> {
    return this.query(`/albums/${id}`);
  }
}

export const SPOTIFY_PROVIDERS: any[] = [
  { provide: SpotifyService, useClass: SpotifyService }
]
