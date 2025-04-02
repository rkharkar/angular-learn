import { Component, OnInit } from '@angular/core';
import { SearchResult } from './search-result.model';

@Component({
    selector: 'app-you-tube-search',
    templateUrl: './you-tube-search.component.html',
    styleUrls: ['./you-tube-search.component.css'],
    standalone: false
})
export class YouTubeSearchComponent implements OnInit {
  public results: SearchResult[];
  public loading: boolean;

  constructor() {}
  ngOnInit(): void {}

  public updateResults(results: SearchResult[]): void {
    this.results = results;
  }
}
