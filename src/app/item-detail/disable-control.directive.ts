import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
  selector: '([formControlName], [formControl])[disabledControl]',
})
export class DisableControlDirective {
  @Input() set disabledControl(state: boolean) {
    const action = state ? 'disable' : 'enable';
    if (action == 'disable') {
      console.log(true);
    } else {
      this.ngControl.control?.enable();
    }
  }
  constructor(private ngControl: NgControl) {}
}
