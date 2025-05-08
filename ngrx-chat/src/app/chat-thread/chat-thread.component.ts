import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Thread } from '../thread/thread.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-chat-thread',
  imports: [NgIf],
  templateUrl: './chat-thread.component.html',
  styleUrl: './chat-thread.component.css'
})
export class ChatThreadComponent {
  @Input() thread: Thread;
  @Input() selected: boolean;
  @Output() onThreadSelected: EventEmitter<Thread>;

  constructor() {
    this.onThreadSelected = new EventEmitter<Thread>();
  }

  clicked(event: Event): void {
    this.onThreadSelected.emit(this.thread);
    event.preventDefault();
  }
}
