import { Component } from '@angular/core';
import { ChatNavBarComponent } from '../chat-nav-bar/chat-nav-bar.component';
import { ChatThreadsComponent } from '../chat-threads/chat-threads.component';
import { ChatWindowComponent } from '../chat-window/chat-window.component';

@Component({
  selector: 'app-chat-page',
  imports: [
    ChatNavBarComponent,
    ChatThreadsComponent,
    ChatWindowComponent
  ],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {

}
