import {
  fakeAsync,
  inject,
  ComponentFixture,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';

import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { YouTubeSearchComponent } from './you-tube-search.component';
import {
  YOUTUBE_API_KEY,
  YOUTUBE_API_URL,
  YouTubeSearchService
} from './you-tube-search.service';
import { SearchResultComponent } from '../search-result/search-result.component';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { provideHttpClient } from '@angular/common/http';
import { SearchResult } from './search-result.model';

const defaultResponse = {
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
};

describe('YouTubeSearchComponent', () => {
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

  beforeEach(
    waitForAsync(() => {
      fixture = TestBed.createComponent(YouTubeSearchComponent);
      fixture.detectChanges();
      httpMock = TestBed.inject(HttpTestingController);
      service = TestBed.inject(YouTubeSearchService);
    })
  );


  afterEach(() => {
    httpMock.verify();
  });

  describe('search', () => {
    function search(term: string, response: any, callback: any) {
      return fakeAsync(() => {
        let res;

        // search
        service.search(term).subscribe(_res => {
          res = _res;
        });

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(response);
        tick();

        callback(req.request, res);
      })
    };

    it(
      'parses YouTube video id',
      search('hey', defaultResponse, (_req: Request, res: SearchResult[]) => {
        const video = res[0];
        expect(video.id).toEqual('VIDEO_ID');
      })
    );

    it(
      'parses YouTube video title',
      search('hey', defaultResponse, (_req: Request, res: SearchResult[]) => {
        const video = res[0];
        expect(video.title).toEqual('TITLE');
      })
    );

    it(
      'parses YouTube video description',
      search('hey', defaultResponse, (_req: Request, res: SearchResult[]) => {
        const video = res[0];
        expect(video.description).toEqual('DESCRIPTION');
      })
    );

    it(
      'parses YouTube video thumbnail',
      search('hey', defaultResponse, (_req: Request, res: SearchResult[]) => {
        const video = res[0];
        expect(video.description).toEqual('DESCRIPTION');
      })
    );

    it(
      'sends the query',
      search('term', defaultResponse, (req: Request, _res: SearchResult[]) => {
        expect(req.url).toContain('q=term');
      })
    );

    it(
      'sends the API key',
      search('term', defaultResponse, (req: Request, _res: SearchResult[]) => {
        expect(req.url).toContain('key=YOUTUBE_API_KEY');
      })
    );

    it(
      'uses the provided YouTube URL',
      search('term', defaultResponse, (req: Request, _res: SearchResult[]) => {
        expect(req.url).toMatch(/^YOUTUBE_API_URL\?/);
      })
    );
  });
});
