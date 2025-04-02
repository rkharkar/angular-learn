import { Component, Inject } from '@angular/core';
import { ExampleDef } from './example.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  constructor(
    @Inject('ExampleDefs') public examples: ExampleDef[]
  ) {}
}
