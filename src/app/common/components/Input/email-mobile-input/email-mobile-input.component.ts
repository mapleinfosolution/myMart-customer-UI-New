import { Component, OnInit, Self, Optional, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-email-mobile-input',
  templateUrl: './email-mobile-input.component.html',
  styleUrls: ['./email-mobile-input.component.scss']
})
export class EmailMobileInputComponent implements OnInit, ControlValueAccessor {
  @Input() disabled: any;
  @Input() label: any;
  @Input() placeholder: any;
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() fieldValue: any = '';
  @Output() fieldClicked = new EventEmitter<any>();
  value: any = '';
  public iconChange: boolean = false;
  public checkField: any = '';
  constructor(
    @Self()
    @Optional()
    private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void { }

  writeValue(value: any): void {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public onChange(e: any): void { }

  onTouched(): void { 
    // console.log('hittt');
  }

  onFocus(): void {
    // console.log('hittt');
  }

  inputChange(e: any): void { 
    if(this.fieldValue != '') {
      // if(isNaN(this.))
      if(this.fieldValue.includes('+974')) {
        this.fieldValue = this.fieldValue.split(' ')[1];
      }
      console.log(isNaN(this.fieldValue), this.fieldValue);
      this.iconChange = isNaN(this.fieldValue);
      this.fieldClicked.emit(isNaN(this.fieldValue));
    }
  }

}
