import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { apiList } from '../../../../assets/values/apiList';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private apiService: ApiService) { }

  getCartList(params: any): Observable<any> {
    const url = `${apiList.fetchCartList}`;
    return this.apiService.doPost({ reqBody: params, url });
  }

  checkoutProducts(params: any): Observable<any> {
    const url = `${apiList.checkoutProducts}`;
    return this.apiService.doPost({ reqBody: params, url });
  }

  deleteCartProduct(params: any): Observable<any> {
    const url = `${apiList.deleteCartProduct}`;
    return this.apiService.doPost({ reqBody: params, url });
  }

  placeOrderProducts(params: any): Observable<any> {
    const url = `${apiList.placeOrderProduct}`;
    return this.apiService.doPost({ reqBody: params, url });
  }

  getDeliveryLocation(): Observable<any> {
    const url = `${apiList.fetchDeliveryLocation}`;
    return this.apiService.doGet({ query: {}, url });
  }

  getDeliverySlots(params: any): Observable<any> {
    const url = `${apiList.fetchDeliverySlots}`;
    return this.apiService.doGet({ query: params, url });
  }

  getOnlinePaymentLink(params: any): Observable<any> {
    const url = `${apiList.makeOnlinePayment}`;
    return this.apiService.doPost({ reqBody: params, url });
  }
}
