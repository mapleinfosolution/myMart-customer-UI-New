import { Component, OnInit, Self, Optional, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit, ControlValueAccessor {
  @Input() disabled: any;
  @Input() label: any;
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' = 'password';
  @Output() passwordClicked = new EventEmitter<any>();
  value: any = '';
  isVisible = false;
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

  registerOnChange(event: any): void {
    this.onChange = event;
  }

  registerOnTouched(event: any): void {
    this.onTouched = event;
  }

  public onChange(e: Event): void { }

  public onTouched(): void { }

  public inputChange(e: Event): void { 
    this.passwordClicked.emit(true);
  }

  iconVisible(isVisible: boolean): void {
    this.isVisible = isVisible;
    if (this.isVisible) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

}
