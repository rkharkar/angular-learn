import { YOUTUBE_API_KEY, YOUTUBE_API_URL, YouTubeSearchService } from "./you-tube-search.service";

export const youTubeSearchInjectables: any[] = [
  { provide: YouTubeSearchService, useClass: YouTubeSearchService },
  { provide: YOUTUBE_API_KEY, useValue: YOUTUBE_API_KEY },
  { provide: YOUTUBE_API_URL, useValue: YOUTUBE_API_URL }
];
