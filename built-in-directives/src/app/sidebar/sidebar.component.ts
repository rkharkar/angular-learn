import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { ExampleDef } from '../example.model';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    standalone: false
})
export class SidebarComponent implements OnInit {
  @Input('items') items: ExampleDef[];

  constructor() { }

  ngOnInit() {
  }

}
