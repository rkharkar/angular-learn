import {
  Component,
  Inject
} from '@angular/core';
import { AppStore } from '../app.store';
import * as Redux from 'redux';
import {
  Thread
} from '../thread/thread.model';
import {
  AppState,
  getCurrentThread,
  getAllThreads,
  selectThread
} from '../app.reducer';

@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css'],
  standalone: false
})
export class ChatThreadsComponent {
  threads: Thread[];
  currentThreadId: string;

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>) {
    store.subscribe(() => this.updateState());
    this.updateState();
  }

  updateState() {
    const state = this.store.getState();

    // Store the threads list
    this.threads = getAllThreads(state);

    // We want to mark the current thread as selected,
    // so we store the currentThreadId as a value
    this.currentThreadId = getCurrentThread(state).id;
  }

  handleThreadClicked(thread: Thread) {
    this.store.dispatch(selectThread(thread));
  }
}
