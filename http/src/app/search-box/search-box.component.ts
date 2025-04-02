import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchResult } from '../you-tube-search/search-result.model';
import { YouTubeSearchService } from '../you-tube-search/you-tube-search.service';
import { debounceTime, filter, fromEvent, map, switchAll, tap } from 'rxjs';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css'],
    standalone: false
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube: YouTubeSearchService, private el: ElementRef) {}

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        filter((text: string) => text.length > 1),
        debounceTime(250),
        tap(() => this.loading.emit(true)),
        map((query: string) => this.youtube.search(query)),
        switchAll()
      )
      .subscribe({
        next: (results: SearchResult[]) => {
          this.loading.emit(false);
          this.results.emit(results);
        },
        error: (e) => {
          console.log(e);
          this.loading.emit(false);
        },
        complete: () => this.loading.emit(false) 
      });
  }
}
