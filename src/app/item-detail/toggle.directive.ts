import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appToggle]',
})
export class ToggleDirective {
  elementSelected: boolean = false;
  disabled: boolean = false;
  @Output() toggleChange: EventEmitter<boolean> = new EventEmitter();
  @Input() set disabledControl(val: boolean) {
    this.disabled = val;
    if (!this.disabled) {
      this.el.nativeElement.firstChild.classList.remove('toggle-pointDisabled');
      this.el.nativeElement.firstChild.classList.remove(
        'toggle-pointActiveDisabled'
      );
      if (this.elementSelected) {
        this.el.nativeElement.classList.add('toggleActive');
        this.el.nativeElement.firstChild.classList.add('toggle-pointActive');
      } else {
        this.el.nativeElement.classList.remove('toggleActive');
        this.el.nativeElement.firstChild.classList.remove('toggle-pointActive');
      }
    } else if (this.elementSelected) {
      this.el.nativeElement.firstChild.classList.add(
        'toggle-pointActiveDisabled'
      );
    } else {
      this.el.nativeElement.firstChild.classList.add('toggle-pointDisabled');
    }
  }
  @Input() set Selected(val: boolean) {
    this.elementSelected = val;
  }
  @HostListener('click') onClick() {
    if (!this.disabled) {
      if (this.elementSelected == false) {
        this.el.nativeElement.classList.add('toggleActive');
        this.el.nativeElement.firstChild.classList.add('toggle-pointActive');
        this.elementSelected = true;
        this.toggleChange.emit(true);
      } else {
        this.el.nativeElement.classList.remove('toggleActive');
        this.el.nativeElement.firstChild.classList.remove('toggle-pointActive');
        this.elementSelected = false;
        this.toggleChange.emit(false);
      }
    }
  }

  constructor(public el: ElementRef) {}
  ngOnInit() {
    if (!this.disabled) {
      if (this.elementSelected) {
        this.el.nativeElement.classList.add('toggleActive');
        this.el.nativeElement.firstChild.classList.add('toggle-pointActive');
      } else {
        this.el.nativeElement.classList.remove('toggleActive');
        this.el.nativeElement.firstChild.classList.remove('toggle-pointActive');
      }
    } else if (this.elementSelected) {
      this.el.nativeElement.firstChild.classList.add(
        'toggle-pointActiveDisabled'
      );
    } else {
      this.el.nativeElement.firstChild.classList.add('toggle-pointDisabled');
    }
  }
}
