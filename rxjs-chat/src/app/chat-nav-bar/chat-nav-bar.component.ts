import {
  Component,
  OnInit
} from '@angular/core';
import * as _ from 'lodash';

import { ThreadsService } from './../thread/threads.service';
import { MessagesService } from './../message/messages.service';

import { Message } from './../message/message.model';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'chat-nav-bar',
    templateUrl: './chat-nav-bar.component.html',
    styleUrls: ['./chat-nav-bar.component.css'],
    standalone: false
})
export class ChatNavBarComponent implements OnInit {
  unreadMessagesCount: number;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService) {
  }

  ngOnInit(): void {
    combineLatest([this.messagesService.messages, this.threadsService.currentThread])
    .subscribe(([messages, currentThread]) => {
      this.unreadMessagesCount =
        _.reduce(
          messages,
          (sum: number, m: Message) => {
            const messageIsInCurrentThread: boolean = m.thread &&
              currentThread &&
              (currentThread.id === m.thread.id);
            // note: in a "real" app you should also exclude
            // messages that were authored by the current user b/c they've
            // already been "read"
            if (m && !m.isRead && !messageIsInCurrentThread) {
              sum = sum + 1;
            }
            return sum;
          },
          0);
    });
  }
}
