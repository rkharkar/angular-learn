import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { ChatThreadsComponent } from './chat-threads.component';

describe('ChatThreadsComponent', () => {
  let component: ChatThreadsComponent;
  let fixture: ComponentFixture<ChatThreadsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatThreadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
