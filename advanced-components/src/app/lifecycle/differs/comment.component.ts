import {
  Component,
  Input,
  Output,
  EventEmitter,
  KeyValueDiffers,
  DoCheck
} from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  standalone: false
})
export class CommentComponent implements DoCheck {
  @Input() comment: any;
  @Output() onRemove: EventEmitter<any>;
  differ: any;

  constructor(differs: KeyValueDiffers) {
    this.differ = differs.find([]).create();
    this.onRemove = new EventEmitter();
  }

  ngDoCheck(): void {
    const changes = this.differ.diff(this.comment);

    if (changes) {
      changes.forEachAddedItem((r: any) =>
        this.logChange('added', r)
      );
      changes.forEachRemovedItem((r: any) =>
        this.logChange('removed', r)
      );
      changes.forEachChangedItem((r: any) =>
        this.logChange('changed', r)
      );
    }
  }

  logChange(action: any, r: any) {
    if (action === 'changed') {
      console.log(
        r.key,
        action,
        'from',
        r.previousValue,
        'to',
        r.currentValue
      );
    }
    if (action === 'added') {
      console.log(action, r.key, 'with', r.currentValue);
    }
    if (action === 'removed') {
      console.log(
        action,
        r.key,
        '(was ' + r.previousValue + ')'
      );
    }
  }

  remove(): void {
    this.onRemove.emit(this.comment);
  }

  clear(): void {
    delete this.comment.comment;
  }

  like(): void {
    this.comment.likes += 1;
  }
}
