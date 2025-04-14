import { Component, HostBinding, Input } from '@angular/core';
import { Product } from '../product.model';

@Component({
    selector: 'product-row',
    templateUrl: './product-row.component.html',
    styleUrls: ['./product-row.component.css'],
    standalone: false
})
export class ProductRowComponent {
  @Input() product: Product;
  @HostBinding('attr.class') cssClass = 'item';

  constructor() {}
}
