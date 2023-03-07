import { Component, OnInit, Output, EventEmitter, Input, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.scss']
})
export class OtpVerifyComponent implements OnInit {
  @Output() submitOtp = new EventEmitter<number>();
  @Output() resend = new EventEmitter();
  @Input() message = 'We just send you a verification code via sms <b class="block">+65556 798 241';
  @ViewChildren('formRow') rows: any;
  verifyForm: FormGroup;
  formInput = ['input1', 'input2', 'input3', 'input4'];
  resendButtonActive = false;
  timeInSecond = 60;
  intrvalTimer: any;
  continueButtonEnable = false;
  constructor() {
    this.verifyForm = this.toFormGroup(this.formInput);
  }

  ngOnInit(): void {
    this.resendTimer();
  }

  public resendTimer(): void {
    this.resendButtonActive = false;
    this.timeInSecond = 60;
    this.intrvalTimer = setInterval(() => {
      this.timeInSecond = this.timeInSecond - 1;
      if (this.timeInSecond === 0) { this.activeResend(); }
    }, 1000);
  }

  activeResend(): void {
    this.resendButtonActive = true;
    clearInterval(this.intrvalTimer);
  }

  public toFormGroup(elements: (string | number)[]): FormGroup {
    const group: any = {};

    elements.forEach((key: string | number) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  public keyUpEvent(event: any, index: number): void {
    const value = event.target.value;
    if (event.code !== 'Backspace' && (!event.target.value || isNaN(value))) {
      return;
    }
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }
    if (this.verifyForm.valid) {
      this.continueButtonEnable = true;
    } else {
      this.continueButtonEnable = false;
    }
  }

  public onSubmit(): void {
    console.log(this.verifyForm.value);
    let inputData = '';
    for (const key in this.verifyForm.value) {
      if (this.verifyForm.value[key]) { inputData = inputData + this.verifyForm.value[key]; }
    }
    this.submitOtp.emit(Number(inputData));
  }

  public omit_special_char(e: any): any {
    const k = e.keyCode;
    return (k >= 48 && k <= 57);
  }

  public resendClick(): void {
    this.resendTimer();
    this.resend.emit();
  }

  public showTimer(timeInSecond: number): string {
    if (timeInSecond > 9) {
      return `00:${timeInSecond}`;
    } else {
      return `00:0${timeInSecond}`;
    }
  }

}
