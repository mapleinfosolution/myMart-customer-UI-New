import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiList } from '../../../../assets/values/apiList';
import { ApiService } from '../../../../app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class MyaccountService {

  constructor(
    private apiService: ApiService
  ) { }

  userDetails(params: any): Observable<any> {
    const url = `${apiList.userDetails}`;
    return this.apiService.doGet({ query: params, url });
  }

  updateDetails(params: any): Observable<any> {
    const url = `${apiList.updateUserData}`;
    return this.apiService.doPut({ reqBody: params, url });
  }

  uploadprofileImage(params: any): Observable<any> {
    const url = `${apiList.uploadprofileImage}`;
    return this.apiService.doPut({ reqBody: params, url });
  }

  sendChangeEmailOtp(params: any): Observable<any> {
    const url = `${apiList.sendChangeEmailOtp}`;
    return this.apiService.doPut({ reqBody: params, url });
  }

  submitChangeEmail(params: any): Observable<any> {
    const url = `${apiList.submitChangeEmail}`;
    return this.apiService.doPut({ reqBody: params, url });
  }

  sendChangeMobileOtp(params: any): Observable<any> {
    const url = `${apiList.sendChangeMobileOtp}`;
    return this.apiService.doPut({ reqBody: params, url });
  }

  submitChangeMobile(params: any): Observable<any> {
    const url = `${apiList.submitChangeMobile}`;
    return this.apiService.doPut({ reqBody: params, url });
  }

  addEditAddress(params: any, queryParams: any): Observable<any> {
    const url = `${apiList.addEditAddress}`;
    return this.apiService.doPost({ reqBody: params, url, queryParams });
  }

  addressList(params: any): Observable<any> {
    const url = `${apiList.addressList}`;
    return this.apiService.doGet({ query: params, url });
  }

  makePrimary(params: any, addressId: any): Observable<any> {
    const url = `${apiList.makePrimaryAddress}${addressId}`;
    return this.apiService.doGet({ query: params, url });
  }

  deleteAddress(params: any, addressId: any): Observable<any> {
    const url = `${apiList.deleteAddress}${addressId}`;
    return this.apiService.doDelete({ query: params, url });
  }

  getWishList(params: any): Observable<any> {
    const url = `${apiList.wishList}`;
    return this.apiService.doGet({ query: params, url });
  }

  getOrderList(params: any): Observable<any> {
    const url = `${apiList.orderList}`;
    return this.apiService.doGet({ query: params, url });
  }

  getOrderDetails(orderId: any, params: any): Observable<any> {
    const url = `${apiList.orderDetails}${orderId}`;
    return this.apiService.doGet({ query: params, url });
  }
}
