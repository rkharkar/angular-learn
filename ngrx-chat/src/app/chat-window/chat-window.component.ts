import { Component, ElementRef, OnDestroy } from '@angular/core';
import { combineLatest, map, Subscription } from 'rxjs';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';
import { Store } from '@ngrx/store';
import { selectAllMessages, selectCurrentThread } from '../thread/threads.reducer';
import { selectCurrentUser } from '../user/users.reducer';
import { CommonModule } from '@angular/common';
import { ThreadActions } from '../thread/threads.action';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  imports: [
    CommonModule,
    ChatMessageComponent,
    FormsModule
  ],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent implements OnDestroy {
  private subscription: Subscription;
  draftMessage: { text: string };
  currentThread: Thread;
  currentUser: User | null;

  constructor(private store: Store, private el: ElementRef) {
    this.updateState();
    this.draftMessage = { text: '' };
  }

  updateState() {
    this.subscription = combineLatest([
      this.store.select(selectCurrentThread),
      this.store.select(selectCurrentUser)
    ])
      .pipe(
        map(([currentThread, currentUser]) => ({
          currentThread,
          currentUser
        }))
      )
      .subscribe(({ currentThread, currentUser }) => {
        this.currentThread = currentThread;
        this.currentUser = currentUser;
      });

    this.store.select(selectAllMessages)
      .subscribe(() => {
        this.scrollToBottom();
      })
  }

  scrollToBottom(): void {
    const scrollPane = this.el
      .nativeElement.querySelector('.msg-container-base');
    if (scrollPane) {
      setTimeout(() => scrollPane.scrollTop = scrollPane.scrollHeight);
    }
  }

  sendMessage() {
    this.store.dispatch(ThreadActions.addMessage({
      addMessage: {
        thread: this.currentThread,
        message: {
          author: this.currentUser,
          isRead: true,
          text: this.draftMessage.text,
          thread: this.currentThread
        }
      }
    }));
    this.draftMessage = { text: "" };
  }

  onEnter(event: Event) {
    this.sendMessage();
    event.preventDefault();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
