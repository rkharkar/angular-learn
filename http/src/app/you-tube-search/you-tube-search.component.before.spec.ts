import {
  fakeAsync,
  inject,
  ComponentFixture,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { YouTubeSearchComponent } from './you-tube-search.component';
import {
  YOUTUBE_API_KEY,
  YOUTUBE_API_URL,
  YouTubeSearchService
} from './you-tube-search.service';
import { SearchResultComponent } from '../search-result/search-result.component';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { SearchResult } from './search-result.model';
import { provideHttpClient } from '@angular/common/http';

describe('YouTubeSearchComponent (before)', () => {
  let fixture: ComponentFixture<YouTubeSearchComponent>;
  let httpMock: HttpTestingController;
  let service: YouTubeSearchService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          YouTubeSearchComponent,
          SearchResultComponent,
          SearchBoxComponent
        ],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          YouTubeSearchService,
          { provide: YOUTUBE_API_KEY, useValue: 'YOUTUBE_API_KEY' },
          { provide: YOUTUBE_API_URL, useValue: 'YOUTUBE_API_URL' }
        ]
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(YouTubeSearchComponent);
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(YouTubeSearchService);
  });

  describe('search', () => {
    it(
      'parses YouTube response',
      fakeAsync(() => {
        let res: SearchResult[] = [];

        service.search('hey').subscribe(_res => {
          res = _res;
        });

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush({
          items: [
            {
              id: { videoId: 'VIDEO_ID' },
              snippet: {
                title: 'TITLE',
                description: 'DESCRIPTION',
                thumbnails: {
                  high: { url: 'THUMBNAIL_URL' }
                }
              }
            }
          ]
        });

        tick();

        const video = res[0];
        expect(video.id).toEqual('VIDEO_ID');
        expect(video.title).toEqual('TITLE');
        expect(video.description).toEqual('DESCRIPTION');
        expect(video.thumbnailUrl).toEqual('THUMBNAIL_URL');

        httpMock.verify();
      })
    );
  });
});
