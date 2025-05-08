import { Component } from '@angular/core';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatExampleDataService } from './data/chat-example-data';

@Component({
  selector: 'app-root',
  imports: [
    ChatPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    chatExampleDataService: ChatExampleDataService
  ) {
    chatExampleDataService.initializeData();
  }
}
