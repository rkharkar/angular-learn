import { Component, Input, OnInit } from '@angular/core';
import { SearchResult } from '../you-tube-search/search-result.model';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css'],
    standalone: false
})
export class SearchResultComponent implements OnInit {
  @Input() result: SearchResult;

  constructor() {}

  ngOnInit(): void {}
}
