import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MyaccountService } from '../../service/myaccount.service';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-change-mobile-popup',
  templateUrl: './change-mobile-popup.component.html',
  styleUrls: ['./change-mobile-popup.component.scss']
})
export class ChangeMobilePopupComponent implements OnInit {
  mobileChangeForm!: FormGroup;
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
    this.mobileChangeForm = this.fb.group({
      phone: ['', [Validators.required]],
      otp: [{value: '', disabled: true}, [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });
  }

  closePopup(data: any): void {
    this.activeModal.close(data);
  }

  cancelClick(): void {
    this.closePopup({ isData: false });
  }

  sendOtp(): void {
    if (!this.mobileChangeForm.controls.phone.errors) {
      this.myaccountService.sendChangeMobileOtp({ phone: this.mobileChangeForm.value.phone }).subscribe(res => {
        this.commonService.showSuccessMessage(res.message || 'Success');
        this.mobileChangeForm.controls.phone.disable();
        this.mobileChangeForm.controls.otp.enable();
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

  changeMobile(): void {
    if (this.mobileChangeForm.invalid) { return; }
    this.myaccountService.submitChangeMobile({ ...this.mobileChangeForm.getRawValue() }).subscribe(res => {
        this.commonService.showSuccessMessage(res.message || 'Success');
        this.closePopup({ isData: true, phone: res.data.phone });
    });
  }

}
