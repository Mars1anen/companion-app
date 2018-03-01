import { Directive, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[HorizontalScroll]'
})
export class HorizontalScrollDirective {

  constructor(
    private container:  ViewContainerRef,
    private template: TemplateRef<any>
  ) { }

}
