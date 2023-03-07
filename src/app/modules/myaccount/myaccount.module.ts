import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyaccountRoutingModule } from './myaccount-routing.module';
import { MyProfileComponent } from './containers/my-profile/my-profile.component';
import { MyaccountComponent } from './myaccount.component';
import { MyProfileEditComponent } from './containers/my-profile-edit/my-profile-edit.component';
import { UserProfileNavComponent } from './components/user-profile-nav/user-profile-nav.component';
import { UserPersonalInfoComponent } from './components/user-personal-info/user-personal-info.component';
import { UserRecentOrdersComponent } from './components/user-recent-orders/user-recent-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountDeliveryEditComponent } from './containers/my-account-delivery-edit/my-account-delivery-edit.component';
import { PaymentMethodComponent } from './containers/payment-method/payment-method.component';
import { PaymentMethodCodComponent } from './containers/payment-method-cod/payment-method-cod.component';
import { ChangeEmailPopupComponent } from './components/change-email-popup/change-email-popup.component';
import { ChangeMobilePopupComponent } from './components/change-mobile-popup/change-mobile-popup.component';
import { AddNewAddressComponent } from './components/add-new-address/add-new-address.component';
import { AddEditAddressComponent } from './components/add-edit-address/add-edit-address.component';
import { AddressBookComponent } from './containers/address-book/address-book.component';
import { SharedModule } from '../../common/shared.module';
import { WishlistAndFollwedStoresComponent } from './containers/wishlist-and-follwed-stores/wishlist-and-follwed-stores.component';
import { MyWishlistComponent } from './components/my-wishlist/my-wishlist.component';
import { MyOrderShellComponent } from './containers/my-order-shell/my-order-shell.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderTrackingDetailsComponent } from './components/order-tracking-details/order-tracking-details.component';
import { OrderListComponent } from './components/order-list/order-list.component';

@NgModule({
  declarations: [
    MyProfileComponent,
    MyaccountComponent,
    UserProfileNavComponent,
    UserPersonalInfoComponent,
    UserRecentOrdersComponent,
    MyProfileEditComponent,
    AddressBookComponent,
    MyAccountDeliveryEditComponent,
    PaymentMethodComponent,
    PaymentMethodCodComponent,
    ChangeEmailPopupComponent,
    ChangeMobilePopupComponent,
    AddNewAddressComponent,
    AddEditAddressComponent,
    WishlistAndFollwedStoresComponent,
    MyWishlistComponent,
    MyOrderShellComponent,
    OrderDetailsComponent,
    OrderTrackingDetailsComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    MyaccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MyaccountModule { }
