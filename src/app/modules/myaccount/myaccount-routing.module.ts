import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyaccountComponent } from './myaccount.component';
import { MyProfileComponent } from './containers/my-profile/my-profile.component';
import { MyProfileEditComponent } from './containers/my-profile-edit/my-profile-edit.component';
import { MyAccountDeliveryEditComponent } from './containers/my-account-delivery-edit/my-account-delivery-edit.component';
import { PaymentMethodComponent } from './containers/payment-method/payment-method.component';
import { PaymentMethodCodComponent } from './containers/payment-method-cod/payment-method-cod.component';
import { AddressBookComponent } from './containers/address-book/address-book.component';
import { WishlistAndFollwedStoresComponent } from './containers/wishlist-and-follwed-stores/wishlist-and-follwed-stores.component';
import { MyOrderShellComponent } from './containers/my-order-shell/my-order-shell.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderTrackingDetailsComponent } from './components/order-tracking-details/order-tracking-details.component';

const routes: Routes = [{
  path: '',
  component: MyaccountComponent,
  children: [{
    path: 'profile',
    component: MyProfileComponent
  }, {
    path: 'profile-edit',
    component: MyProfileEditComponent
  }, {
    path: 'address',
    component: AddressBookComponent
  }, {
    path: 'address-edit',
    component: MyAccountDeliveryEditComponent
  }, {
    path: 'payment-method',
    component: PaymentMethodComponent
  }, {
    path: 'payment-method-edit',
    component: PaymentMethodCodComponent
  }, {
    path: 'wishlist',
    component: WishlistAndFollwedStoresComponent
  }, {
    path: 'my-order',
    component: MyOrderShellComponent
  }, {
    path: 'order-details/:orderId',
    component: OrderDetailsComponent
  }, {
    path: 'tracking-details/:orderId',
    component: OrderTrackingDetailsComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyaccountRoutingModule { }
