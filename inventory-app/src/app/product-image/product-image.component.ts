import { Component, HostBinding, Input } from '@angular/core';
import { Product } from '../product.model';

@Component({
    selector: 'product-image',
    templateUrl: './product-image.component.html',
    styleUrls: ['./product-image.component.css'],
    standalone: false
})
export class ProductImageComponent {
  @Input() product: Product;
  @HostBinding('attr.class') cssClass="ui small image";
}
