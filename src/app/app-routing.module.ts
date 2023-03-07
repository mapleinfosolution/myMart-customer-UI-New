import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { MySettingsMobileComponent } from './my-settings-mobile/my-settings-mobile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthAccess, AuthGuard } from './services/user.guard';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  { path: 'categories', component: CategoryComponent },
  { path: 'my-settings', canActivate: [AuthGuard], component: MySettingsMobileComponent },
  { path: 'thank-you', canActivate: [AuthGuard], component: ThankYouComponent },
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  }, {
    path: 'product',
    loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
  }, {
    path: 'cart',
    loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule)
  }, {
    path: 'auth',
    canActivate: [AuthAccess],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }, {
    path: 'my-account',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/myaccount/myaccount.module').then(m => m.MyaccountModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule)
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
