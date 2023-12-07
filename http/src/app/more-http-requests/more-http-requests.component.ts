import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-more-http-requests',
  templateUrl: './more-http-requests.component.html',
  styleUrls: ['./more-http-requests.component.css']
})
export class MoreHttpRequestsComponent implements OnInit {
  public loading: boolean;
  public data: Object;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  public makePost(): void {
    this.loading = true;
    this.http.post(
      'https://jsonplaceholder.typicode.com/posts',
      JSON.stringify({
        body: 'bar',
        title: 'foo',
        userId: 1
      })
    )
      .subscribe((data) => {
        this.data = data;
        this.loading = false;
      })
  }

  public makeDelete(): void {
    this.http.delete(
      'https://jsonplaceholder.typicode.com/posts/1'
    )
      .subscribe((data) => {
        this.data = data;
        this.loading = false;
      })
  }

  public makeHeaders(): void {
    const headers = new HttpHeaders({
      'X_API_TOKEN': 'ng-book'
    });

    const req = new HttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        headers
      }
    );

    this.http.request(req).subscribe((data: any) => {
      this.data = data['body'];
    })
  }
}
