import {
  Component,
  Inject,
  ElementRef
} from '@angular/core';
import * as Redux from 'redux';

import { AppStore } from '../app.store';
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import {
    addMessage,
  AppState,
  getCurrentThread,
  getCurrentUser
} from '../app.reducer';
import { uuid } from '../util/uuid';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  standalone: false
})
export class ChatWindowComponent {
  currentThread: Thread;
  draftMessage: { text: string };
  currentUser: User | null;

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>,
              private el: ElementRef) {
    store.subscribe(() => this.updateState() );
    this.updateState();
    this.draftMessage = { text: '' };
  }

  updateState() {
    const state = this.store.getState();
    this.currentThread = getCurrentThread(state);
    this.currentUser = getCurrentUser(state);
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    if (scrollPane) {
      setTimeout(() => scrollPane.scrollTop = scrollPane.scrollHeight);
    }
  }

  sendMessage(): void {
    this.store.dispatch(addMessage({
      thread: this.currentThread,
      message: {
        author: this.currentUser,
        isRead: true,
        text: this.draftMessage.text,
        thread: this.currentThread
      }
    }));
    this.draftMessage = { text: '' };
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }
}
