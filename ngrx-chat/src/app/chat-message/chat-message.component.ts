import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message/message.model';
import { FromNowPipe } from '../from-now.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-message',
  imports: [FromNowPipe, CommonModule],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css'
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  incoming: boolean;

  ngOnInit(): void {
    this.incoming = !this.message.author?.isClient;
  }
}
