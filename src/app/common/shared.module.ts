import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { OtpVerifyComponent } from './components/otp-verify/otp-verify.component';
import { EmailMobileInputComponent } from './components/Input/email-mobile-input/email-mobile-input.component';
import { PasswordInputComponent } from './components/Input/password-input/password-input.component';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
import { BootstrapModule } from './bootstrap.module';
import { HeaderAddressSelectionComponent } from './components/header-address-selection/header-address-selection.component';
import { AddressSelectionComponent } from './components/address-selection/address-selection.component';
import { ProductCardImagePopupComponent } from '../common/components/product-card-image-popup/product-card-image-popup.component'
import { ListPaginationComponent } from './components/list-pagination/list-pagination.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    OtpVerifyComponent,
    EmailMobileInputComponent,
    PasswordInputComponent,
    ConfirmationPopupComponent,
    HeaderAddressSelectionComponent,
    AddressSelectionComponent,
    ProductCardImagePopupComponent,
    ListPaginationComponent
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpyPVZzbS7eKTpWF04nPOCdA35TVVQHVI'
    }),
  ],
  exports: [
    ProductCardComponent,
    EmailMobileInputComponent,
    PasswordInputComponent,
    OtpVerifyComponent,
    ConfirmationPopupComponent,
    HeaderAddressSelectionComponent,
    AddressSelectionComponent,
    ProductCardImagePopupComponent,
    ListPaginationComponent
  ]
})
export class SharedModule { }
