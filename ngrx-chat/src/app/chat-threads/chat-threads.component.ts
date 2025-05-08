import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Thread } from '../thread/thread.model';
import { Store } from '@ngrx/store';
import { selectAllThreads, selectCurrentThreadId } from '../thread/threads.reducer';
import { ThreadActions } from '../thread/threads.action';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChatThreadComponent } from '../chat-thread/chat-thread.component';

@Component({
  selector: 'app-chat-threads',
  imports: [
    ChatThreadComponent,
    NgIf,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './chat-threads.component.html',
  styleUrl: './chat-threads.component.css'
})
export class ChatThreadsComponent {
  viewModel$: Observable<{
    threads: Thread[];
    currentThreadId: string | null;
  }>

  constructor(private store: Store) {
    this.updateState();
  }

  updateState() {
    this.viewModel$ = combineLatest([
      this.store.select(selectAllThreads),
      this.store.select(selectCurrentThreadId)
    ])
      .pipe(
        map(([threads, currentThreadId]) => ({
          threads,
          currentThreadId
        }))
      );
  }

  handleThreadClicked(thread: Thread) {
    this.store.dispatch(ThreadActions.selectThread({ thread }));
  }
}
