import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoreHttpRequestsComponent } from './more-http-requests.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('MoreHttpRequestsComponent', () => {
  let component: MoreHttpRequestsComponent;
  let fixture: ComponentFixture<MoreHttpRequestsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreHttpRequestsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    fixture = TestBed.createComponent(MoreHttpRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    httpMock.verify();
  })

  it(
    'performs a POST',
    waitForAsync(() => {
      component.makePost();

      const req = httpMock.expectOne(
        'https://jsonplaceholder.typicode.com/posts'
      );
      expect(req.request.method).toEqual('POST');
      req.flush({ response: 'OK' });
      expect(component.data).toEqual({ response: 'OK' });
    })
  );

  it(
    'performs a DELETE',
    waitForAsync(() => {
      component.makeDelete();

      const req = httpMock.expectOne(
        'https://jsonplaceholder.typicode.com/posts/1'
      );
      expect(req.request.method).toEqual('DELETE');
      req.flush({ response: 'OK' });
      expect(component.data).toEqual({ response: 'OK' });
    })
  );

  it(
    'sends correct headers',
    waitForAsync(() => {
      component.makeHeaders();

      const req = httpMock.expectOne(
        req =>
          req.headers.has('X-API-TOKEN') &&
          req.headers.get('X-API-TOKEN') == 'ng-book'
      );

      req.flush({ response: 'OK' });
      expect(component.data).toEqual({ response: 'OK' });
    })
  );
});
