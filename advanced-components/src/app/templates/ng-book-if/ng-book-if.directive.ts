import {
  Directive,
  ViewContainerRef,
  TemplateRef,
  Input
} from '@angular/core';

@Directive({
  selector: '[ngBookIf]',
  standalone: false
})
export class NgBookIfDirective {
  constructor(private viewContainer: ViewContainerRef,
              private template: TemplateRef<any>) {}

  @Input() set ngBookIf(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.template);
    } else {
      this.viewContainer.clear();
    }
  }
}
