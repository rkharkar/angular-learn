import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SpotifyService } from './spotify.service';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('SpotifyService', () => {
  let service: SpotifyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(SpotifyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // sets up an expectation that the correct URL will being requested
  function expectURL(backend: HttpTestingController, url: string) {
    const testRequest = backend.expectOne(url);
    testRequest.flush({ name: "felipe" });
    return testRequest;
  }

  describe("getTrack", () => {
    it("retrieves using the track ID", fakeAsync(() => {
      let res;
      service.getTrack("TRACK_ID").subscribe(_res => {
        console.log("_res: ", _res);
        res = _res;
      });
      expectURL(httpTestingController, "https://api.spotify.com/v1/tracks/TRACK_ID");
      tick();
      expect(res!.name).toBe("felipe");

      httpTestingController.verify();
    }));
  });

  describe("getArtist", () => {
    it("retrieves using the artist ID", fakeAsync(() => {
      let res;
      service.getArtist("ARTIST_ID").subscribe(_res => {
        res = _res;
      });
      expectURL(httpTestingController, "https://api.spotify.com/v1/artists/ARTIST_ID");
      tick();
      expect(res!.name).toBe("felipe");
    }));
  });

  describe("getAlbum", () => {
    it("retrieves using the album ID", fakeAsync(() => {
      let res;
      service.getAlbum("ALBUM_ID").subscribe(_res => {
        res = _res;
      });
      expectURL(httpTestingController, "https://api.spotify.com/v1/albums/ALBUM_ID");
      tick();
      expect(res!.name).toBe("felipe");
    }));
  });

  describe("searchTrack", () => {
    it("searches type and term", fakeAsync(() => {
      let res;
      service.searchTrack("TERM").subscribe(_res => {
        res = _res;
      });
      expectURL(
        httpTestingController,
        "https://api.spotify.com/v1/search?q=TERM&type=track"
      );
      tick();
      expect(res!.name).toBe("felipe");
    }));
  });
});
