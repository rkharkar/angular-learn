import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-form-sku',
    templateUrl: './demo-form-sku.component.html',
    styleUrls: ['./demo-form-sku.component.css'],
    standalone: false
})
export class DemoFormSkuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: any) {
    console.log('you submitted value:', form);
  }
}
