import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreHttpRequestsComponent } from './more-http-requests.component';

describe('MoreHttpRequestsComponent', () => {
  let component: MoreHttpRequestsComponent;
  let fixture: ComponentFixture<MoreHttpRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreHttpRequestsComponent]
    });
    fixture = TestBed.createComponent(MoreHttpRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
