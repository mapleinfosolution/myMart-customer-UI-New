import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { RegularExpression } from '../../../../services/constant/constants';
declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  otpMessageText = '';
  currentPage = 'step1';
  submitted = false;
  requestPayload: any = {};
  registrationToken: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    // add body class
    $('body').addClass('auth-pages');
    this.createForm();
  }

  get f(): any {
    return this.registerForm.controls;
  }

  public createForm(): void {
    // tslint:disable-next-line: deprecation
    this.registerForm = this.fb.group({
      fname: ['', [Validators.required]],
      lname: [''],
      gender: [''],
      dateOfBirth: [''],
      email: [''],
      phone: [''],
      emailMobile: ['', [Validators.required]],
      UserType: ['Customer', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      promotionAlert: [true]
    }, {
      validator: [
        this.matchPassword('password', 'confirmPassword'),
        this.validateEmailMobile('emailMobile')
      ]
    });
  }

  validateEmailMobile(controlName: string): any {
    return (userForm: FormGroup) => {
      const control: any = userForm.controls[controlName];
      const value = control.value;
      const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const mobileRe = /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/;
      if (isNaN(value)) {
        if (emailRe.test(value)) {
          control.setErrors(null);
        } else {
          control.setErrors({ emailMobileInvalid: true });
        }
      } else {
        if (mobileRe.test(value)) {
          control.setErrors(null);
        } else {
          control.setErrors({ emailMobileInvalid: true });
        }
      }
    };
  }

  matchPassword(controlName: string, matchingControlName: string): any {
    return (userForm: FormGroup) => {
      const control = userForm.controls[controlName];
      const matchingControl = userForm.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public submitEmailMobile(): void {
    console.log('submitEmailMobile==', this.registerForm);
    this.submitted = true;
    if (this.f.emailMobile.errors) { return; }
    const data = this.registerForm.value;
    if (isNaN(data.emailMobile)) {
      data.emailMobile = data.emailMobile.toLowerCase();
      this.registerForm.get('email')?.patchValue(data.emailMobile);
      this.requestPayload.email = data.emailMobile;
      this.otpMessageText = `We just send you a verification code via email <strong>${data.emailMobile}</strong>`;
    } else {
      this.registerForm.get('phone')?.patchValue(data.emailMobile);
      this.requestPayload.phone = data.emailMobile;
      this.otpMessageText = `We just send you a verification code via phone <strong>${data.emailMobile}</strong>`;
    }
    this.sendOtp();
  }

  sendOtp(): void {
    this.authService.sendOtp(this.requestPayload).subscribe((res) => {
      if (res.success) {
        this.commonService.showSuccessMessage(res.message);
        this.submitted = false;
        this.currentPage = 'step2';
      } else {
        this.commonService.showErrorMessage(res.message);
      }
    });
  }

  public emailMobileOtpSubmit(otp: number): void {
    console.log('otp==', otp);
    this.requestPayload.otp = otp;
    this.authService.verifyOtp(this.requestPayload).subscribe((res) => {
      if (res.success) {
        this.commonService.showSuccessMessage(res.message);
        this.registrationToken = res.tempToken;
        this.currentPage = 'step3';
      } else {
        this.commonService.showErrorMessage(res.message);
      }
    });
  }

  public submitDetails(): void {
    console.log(this.registerForm);
    this.submitted = true;
    if (this.f.fname.errors) { return; }
    this.submitted = false;
    this.currentPage = 'step4';
  }

  submitPassword(): void {
    console.log(this.registerForm);
    this.submitted = true;
    if (this.registerForm.invalid) { return; }
    const payload = this.registerForm.value;
    const token = `Bearer ${this.registrationToken}`;
    const header = { Authorization: token };
    console.log('header==', header);
    this.authService.signup(payload, header).subscribe((res) => {
      if (res.success) {
        this.commonService.showSuccessMessage(res.message);
        this.submitted = false;
        this.currentPage = 'step5';
      } else {
        this.commonService.showErrorMessage(res.message);
      }
    });
  }

  public emailOtpResend(): void {

  }

  mobileOtpResend(): void {

  }

  backToRegister(): void {
    this.currentPage = 'step1';
    this.submitted = false;
    this.requestPayload = {};
    this.createForm();
  }

  ngOnDestroy(): void {
    $('body').removeClass('auth-pages');
  }

}
