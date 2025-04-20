import { Component } from '@angular/core';

@Component({
  selector: 'app-content-projection-demo',
  standalone: false,
  template: `
  <div app-message header="My Message">
    This is the content of the message
  </div>
  `
})
export class ContentProjectionDemoComponent {
}
