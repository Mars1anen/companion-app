import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[ShowDeleteBtn]'
})
export class ShowDeleteBtnDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter', ['$event'])
  onmouseenter(e) {
    this.renderer.addClass(this.el.nativeElement.firstChild.firstChild, 'visible');
  }
  @HostListener('mouseleave', ['$event'])
  onmouseleave(e) {
    this.renderer.removeClass(this.el.nativeElement.firstChild.firstChild, 'visible');
  }
}
