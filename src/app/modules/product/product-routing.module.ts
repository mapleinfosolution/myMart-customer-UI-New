import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductDetailsComponent } from './containers/product-details/product-details.component';

const routes: Routes = [{
  path: '',
  component: ProductComponent,
  children: [{
    path: 'product-list',
    component: ProductListComponent
  }, {
    path: 'product-details/:productId/:variantId',
    component: ProductDetailsComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
