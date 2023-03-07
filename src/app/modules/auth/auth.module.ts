import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { SignupComponent } from './containers/signup/signup.component';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { SignupStepOneComponent } from './components/signup-step-one/signup-step-one.component';
import { SignupStepThreeComponent } from './components/signup-step-three/signup-step-three.component';
import { SignupStepFourComponent } from './components/signup-step-four/signup-step-four.component';
import { SharedModule } from '../../common/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninOtherSectionComponent } from './components/signin-other-section/signin-other-section.component';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { SignupStepFiveComponent } from './components/signup-step-five/signup-step-five.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthComponent,
    SignupStepOneComponent,
    SignupStepThreeComponent,
    SignupStepFourComponent,
    SigninOtherSectionComponent,
    ForgotPasswordComponent,
    SignupStepFiveComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
