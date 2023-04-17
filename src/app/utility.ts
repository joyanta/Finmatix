function trimObjectValues(obj: {[key: string]: string}): {[key: string]: string} {
    return Object.entries(obj).reduce((acc: {[key: string]: string}, [key, value]: [string, string]) => {
      acc[key] = value.trim();
      return acc;
    }, {});
  }

  

 // https://subscription.packtpub.com/book/web-development/9781838989439/2/ch02lvl1sec14/creating-a-basic-directive-that-allows-you-to-vertically-scroll-to-an-element



//  ng generate directive <directive-name>

import { Directive, ElementRef, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appSticky]'
})
export class StickyDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  onWindowScroll() {
    const element = this.elementRef.nativeElement;
    const offset = element.offsetTop;
    const scrollPosition = window.pageYOffset;

    if (scrollPosition >= offset) {
      this.renderer.addClass(element, 'sticky');
    } else {
      this.renderer.removeClass(element, 'sticky');
    }
  }
}


ngAfterViewInit() {
  const element = this.elementRef.nativeElement;

  this.renderer.listen(element, 'scroll', () => {
    this.onWindowScroll();
  });
}


<div appSticky>
  <!-- Content -->
</div>
