import { Component, Input } from '@angular/core';

@Component({
    selector: 'price-display',
    templateUrl: './price-display.component.html',
    styleUrls: ['./price-display.component.css'],
    standalone: false
})
export class PriceDisplayComponent {
  @Input() price: number;
}
