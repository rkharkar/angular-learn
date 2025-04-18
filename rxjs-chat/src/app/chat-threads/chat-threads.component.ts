import {
  Component
} from '@angular/core';
import { Observable } from 'rxjs';
import { ThreadsService } from './../thread/threads.service';

@Component({
    selector: 'chat-threads',
    templateUrl: './chat-threads.component.html',
    styleUrls: ['./chat-threads.component.css'],
    standalone: false
})
export class ChatThreadsComponent {
  threads: Observable<any>;

  constructor(public threadsService: ThreadsService) {
    this.threads = threadsService.orderedThreads;
  }
}
