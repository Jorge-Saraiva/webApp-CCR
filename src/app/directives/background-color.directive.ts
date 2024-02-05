import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBackgroundColor]'
})
export class BackgroundColorDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = "var(--elements-color)";
  }
}
