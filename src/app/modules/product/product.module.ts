import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSliderModule } from '@angular-slider/ngx-slider'

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductDetailsComponent } from './containers/product-details/product-details.component';
import { SharedModule } from '../../common/shared.module';
import { BootstrapModule } from '../../common/bootstrap.module';
import { FormsModule } from '@angular/forms';
import { ChildCategoryMenuListComponent } from 'src/app/common/components/category-menu-list/child-category-menu-list/child-category-menu-list.component';
import { CategoryMenuListComponent } from 'src/app/common/components/category-menu-list/category-menu-list.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ChildCategoryMenuListComponent,
    CategoryMenuListComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    NgxSliderModule,
    BootstrapModule,
    FormsModule
  ]
})
export class ProductModule { }
