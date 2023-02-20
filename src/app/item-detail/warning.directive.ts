import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appWarning]',
})
export class WarningDirective {
  val: string | undefined = '';
  disabled: boolean = false;
  @Input() set Val(val: string | null) {
    if (typeof val == 'string') {
      this.val = val;
      this.setWarning();
    }
  }
  @Input() set Disabled(val: boolean) {
    this.disabled = val;
    this.setWarning();
  }
  @HostListener('keyup') onChange() {
    this.setWarning();
  }
  setWarning() {
    this.el.nativeElement.classList.remove('invalidInput');
    this.el.nativeElement.classList.remove('invalidInputBorder');

    if (this.disabled) {
      if (this.el.nativeElement.value != this.val) {
        this.el.nativeElement.classList.add('invalidInput');
      } else {
        this.el.nativeElement.classList.remove('invalidInput');
      }
    } else if (this.el.nativeElement.value != this.val) {
      this.el.nativeElement.classList.add('invalidInputBorder');
    } else {
      this.el.nativeElement.classList.remove('invalidInputBorder');
    }
  }
  constructor(private el: ElementRef) {}
  ngOnInit() {
    this.setWarning();
  }
}
