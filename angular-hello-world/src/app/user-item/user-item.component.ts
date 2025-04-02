import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.css'],
    standalone: false
})
export class UserItemComponent implements OnInit {
  @Input() name: string;

  constructor() {}

  ngOnInit(): void {}
}
