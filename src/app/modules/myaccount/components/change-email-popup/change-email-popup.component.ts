import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MyaccountService } from '../../service/myaccount.service';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-change-email-popup',
  templateUrl: './change-email-popup.component.html',
  styleUrls: ['./change-email-popup.component.scss']
})
export class ChangeEmailPopupComponent implements OnInit {
  changeState: any = 'step1';
  emailChangeForm!: FormGroup;
  startTimer: any = false;
  timerValue: any = 60;
  timeIntervalObs: any;
  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private myaccountService: MyaccountService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.emailChangeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: [{value: '', disabled: true}, [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });
  }

  closePopup(data: any): void {
    this.activeModal.close(data);
  }

  cancelClick(): void {
    this.closePopup({ isData: false });
  }

  goSecondStep(): void {
    this.changeState = 'step2';
  }

  sendOtp(): void {
    if (!this.emailChangeForm.controls.email.errors) {
      this.myaccountService.sendChangeEmailOtp({ email: this.emailChangeForm.value.email }).subscribe(res => {
        this.commonService.showSuccessMessage(res.message || 'Success');
        this.emailChangeForm.controls.email.disable();
        this.emailChangeForm.controls.otp.enable();
        this.startTimer = true;
        this.showTimer();
      });
    }
  }

  showTimer(): void {
    this.timerValue = 60;
    this.timeIntervalObs = setInterval(() => {
      this.timerValue -= 1;
      if (this.timerValue === 0) { this.deleteTimer(); }
    }, 1000);
  }

  deleteTimer(): void {
    this.startTimer = false;
    clearInterval(this.timeIntervalObs);
  }

  changeEmail(): void {
    if (this.emailChangeForm.invalid) { return; }
    this.myaccountService.submitChangeEmail({ ...this.emailChangeForm.getRawValue() }).subscribe(res => {
      this.commonService.showSuccessMessage(res.message || 'Success');
      this.closePopup({ isData: true, email: res.data.email });
    });
  }


}
