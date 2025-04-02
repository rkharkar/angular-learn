import { Component } from '@angular/core';

@Component({
  selector: 'app-demo-form-ng-model',
  templateUrl: './demo-form-ng-model.component.html',
  styleUrl: './demo-form-ng-model.component.css',
  standalone: false
})
export class DemoFormNgModelComponent {
  productName: string;

  constructor() {
    this.productName = "ng-book: The Complete Guide to Angular"
  }

  onSubmit(value: string) {
    console.log('you submitted value: ', value);
  }
}
