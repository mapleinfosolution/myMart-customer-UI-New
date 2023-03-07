import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartComponent} from './cart.component';
import {CartPageComponent} from './containers/cart-page/cart-page.component';

const routes: Routes = [{
  path: '',
  component: CartComponent,
  children: [{
    path: '',
    component: CartPageComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
