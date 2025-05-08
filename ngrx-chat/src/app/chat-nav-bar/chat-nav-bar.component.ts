import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUnreadMessageCount } from '../thread/threads.reducer';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-chat-nav-bar',
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './chat-nav-bar.component.html',
  styleUrl: './chat-nav-bar.component.css'
})
export class ChatNavBarComponent {
  unreadMessagesCount$: Observable<number>;

  constructor(private store: Store) {
    this.updateState();
  }

  updateState() {
    this.unreadMessagesCount$ = this.store.select(selectUnreadMessageCount);
  }
}
