import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTextColor]'
})
export class TextColorDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = "var(--text-color)";
  }
}
