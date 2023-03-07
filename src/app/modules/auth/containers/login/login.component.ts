import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonStoreService } from 'src/app/services/api/common-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  redirectUrl = '';
  public passClicked: boolean = false;
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private authService: AuthService,
    private router: Router,
    private commonStoreService: CommonStoreService,
    private activatedRoute: ActivatedRoute
  ) { }

  get f(): any {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.createLogin();
    this.redirectUrl = this.activatedRoute.snapshot.queryParams.redirectPage;
  }

  createLogin(): void {
    // tslint:disable-next-line: deprecation
    this.loginForm = this.fb.group({
      email: [''],
      phone: [''],
      emailMobile: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }, {
      validator: this.validateEmailMobile('emailMobile')
    });
  }

  submitLogin(): void {
    this.submitted = true;
    if (this.loginForm.invalid) { return; }
    const payload = Object.assign({});
    payload.password = this.loginForm.value.password;
    if(this.loginForm.value.emailMobile.includes('+974')) {
      this.loginForm.controls.emailMobile.setValue(this.loginForm.value.emailMobile.split(' ')[1]);
    }
    if (isNaN(this.loginForm.value.emailMobile)) {
      payload.email = this.loginForm.value.emailMobile.toLowerCase();
    } else {
      payload.phone = this.loginForm.value.emailMobile;
    }
    let sessionId = localStorage.getItem('uniqueId');
    this.authService.login({ ...payload, sessionId }).subscribe((res) => {
      if (res.success) {
        this.commonService.showSuccessMessage(res.message);
        this.submitted = false;
        this.commonStoreService.setLoginData(res.data);
        localStorage.setItem('userData', JSON.stringify(res.data));
        localStorage.setItem('accessToken', JSON.stringify(res.token));
        this.commonStoreService.callAfterLogin();
        if (this.redirectUrl === 'cart') {
          this.router.navigateByUrl('/cart');
        } else {
          this.router.navigateByUrl('');
        }
      } else {
        this.commonService.showErrorMessage(res.message);
      }

    });
  }

  validateEmailMobile(controlName: string): any {
    return (userForm: FormGroup) => {
      const control: any = userForm.controls[controlName];
      const value = control.value.includes('+974') ? control.value.split(' ')[1] : control.value;
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

  passwordClicked(evnt: any): void {
    this.passClicked = evnt;
    console.log(this.loginForm.value.emailMobile);
    if(this.loginForm.value.emailMobile == parseInt(this.loginForm.value.emailMobile, 10)) {
      // this.loginForm.value.emailMobile = `+974 ${this.loginForm.value.emailMobile}`;
      this.loginForm.controls.emailMobile.setValue(`+974 ${this.loginForm.value.emailMobile}`);
    }
  }

}
