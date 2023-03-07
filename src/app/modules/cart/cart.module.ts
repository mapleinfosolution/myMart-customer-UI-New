import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartStepComponent } from './components/cart-step/cart-step.component';
import { CartPageComponent } from './containers/cart-page/cart-page.component';
import { OrderSummeryComponent } from './components/order-summery/order-summery.component';
import { DeliveryInformationComponent } from './components/delivery-information/delivery-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { PaymentComponent } from './components/payment/payment.component';


@NgModule({
  declarations: [
    CartComponent,
    CartStepComponent,
    CartPageComponent,
    OrderSummeryComponent,
    DeliveryInformationComponent,
    DeliveryComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CartModule { }
