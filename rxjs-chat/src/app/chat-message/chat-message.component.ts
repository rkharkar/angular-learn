import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { UsersService } from './../user/users.service';
import { Message } from './../message/message.model';
import { User } from './../user/user.model';

@Component({
    selector: 'chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.css'],
    standalone: false
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  currentUser: User | null;
  incoming: boolean;

  constructor(public UsersService: UsersService) {
  }

  ngOnInit(): void {
    this.UsersService.currentUser
      .subscribe(
        (user: User | null) => {
          this.currentUser = user;
          if (this.message.author && user) {
            this.incoming = this.message.author.id !== user.id;
          }
        });
  }
}
