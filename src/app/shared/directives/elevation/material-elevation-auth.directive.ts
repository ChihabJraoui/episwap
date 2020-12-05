import { Directive, ElementRef, Renderer2, Input, SimpleChanges, HostListener, OnChanges } from '@angular/core';

@Directive({
  selector: '[appMaterialElevationAuth]'
})
export class MaterialElevationAuthDirective implements OnChanges {

  // *** Properties *** //

  // *** Input *** //
  @Input()
  defaultElevation = 2;

  @Input()
  raisedElevation = 8;

  // *** Output *** //

  // *** Constructor *** //
  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {
    this.setElevation(this.defaultElevation);
  }

  // *** Lifecycle *** //
  // tslint:disable-next-line:variable-name
  ngOnChanges(_changes: SimpleChanges) {
    this.setElevation(this.defaultElevation);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.setElevation(this.raisedElevation);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.setElevation(this.defaultElevation);
  }

  // *** Public Methods *** //
  public setElevation(amount: number) {

    // remove all elevation classes
    const classesToRemove = Array.from((this.element.nativeElement as HTMLElement).classList).filter(c => c.startsWith('mat-elevation-z'));
    classesToRemove.forEach((c) => {
      this.renderer.removeClass(this.element.nativeElement, c);
    });

    // add the given elevation class
    const newClass = `mat-elevation-z${amount}`;
    this.renderer.addClass(this.element.nativeElement, newClass);
  }

  // *** Private Methods *** //

}
