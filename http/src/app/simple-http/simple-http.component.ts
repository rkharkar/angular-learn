import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-simple-http',
    templateUrl: './simple-http.component.html',
    styleUrls: ['./simple-http.component.css'],
    standalone: false
})
export class SimpleHttpComponent implements OnInit {
  public data: Object;
  public loading: boolean;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  public makeRequest(): void {
    this.loading = true;
    this.http
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .subscribe((data) => {
        this.data = data;
        this.loading = false;
      });
  }
}
