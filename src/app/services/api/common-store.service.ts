import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CommonApiService } from './common-api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonStoreService {
  private loginData$ = new BehaviorSubject(null);
  private userData$ = new BehaviorSubject({});
  private userHeaderAddress$ = new BehaviorSubject(null);
  private wishListCount$ = new BehaviorSubject(0);
  private cartListCount$ = new BehaviorSubject(0);
  constructor(
    private commonApiService: CommonApiService
  ) { }

  callAfterLogin(): void {
    this.callUserData();
    this.callWishListCount();
    this.getCartList();
  }

  callAfterLogout(): void {
    this.wishListCount$.next(0);
    this.setCartListCount(0);
  }

  getLoginData(): any {
    return this.loginData$.asObservable();
  }

  setLoginData(data: any): void {
    this.loginData$.next(data);
  }

  getUserData(): any {
    return this.userData$.asObservable();
  }

  setUserData(data: any): void {
    this.userData$.next(data);
  }

  callUserData(): void {
    this.commonApiService.userDetails({}).subscribe(res => {
      this.setUserData(res.data);
    });
  }

  getUserHeaderAddress(): any {
    return this.userHeaderAddress$.asObservable();
  }

  setUserHeaderAddress(data: any): void {
    this.userHeaderAddress$.next(data);
  }

  callWishListCount(): void {
    this.commonApiService.getWishListCount({}).subscribe((res: any) => {
      this.wishListCount$.next(res.data.count);
    }, (err) => { });
  }

  getCartList() {
    let params: any = {};
    if (!localStorage.getItem('accessToken')) {
      params.sessionId = localStorage.getItem('uniqueId');
    }
    params.category = 'Grocery';
    params.fastDelivery = false;
    params.freeDelivery = false;
    // params.deliveryType = this.selectedGroceies;
    this.commonApiService.getCartList(params).subscribe(
      (res: any) => {
        this.setCartListCount(res.count.totalCart);
        let elm: any = document.getElementById('header-cart-badge');
        let elm2: any = document.getElementById('header-cart-badge-mob');
        if (elm) {
          elm.classList.add('zoom-in');
          setTimeout(() => {
            elm.classList.remove('zoom-in');
          }, 3000);
        }
        if (elm2) {
          elm2.classList.add('zoom-in');
          setTimeout(() => {
            elm2.classList.remove('zoom-in');
          }, 3000);
        }

      },
      (err) => { }
    );
  }

  getWishlistCount(): Observable<number> {
    return this.wishListCount$.asObservable();
  }

  setCartListCount(countData: any) {
    this.cartListCount$.next(countData);
  }

  getCartListCount(): Observable<number | any> {
    return this.cartListCount$.asObservable();
  }
}
