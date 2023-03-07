import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { apiList } from '../../../../assets/values/apiList';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) { }

  getProductList(params: any): Observable<any> {
    const url = `${apiList.productFetch}`;
    return this.apiService.doPost({ reqBody: params, url });
  }

  getFilter(params: any): Observable<any> {
    const url = `${apiList.productListFilter}`;
    return this.apiService.doPost({ reqBody: params, url });
  }

  getProductDetails(params: any, productId: string): Observable<any> {
    const url = `${apiList.productDetails + productId}`;
    return this.apiService.doPost({ reqBody: params, url });
  }

  addToCartProduct(params: any): Observable<any> {
    const url = `${apiList.addToCart}`;
    return this.apiService.doPost({ reqBody: params, url });
  }

  addRemoveWishList(params: any, queryParams: any): Observable<any> {
    const url = `${apiList.wishList}`;
    return this.apiService.doPost({ reqBody: params, queryParams, url });
  }

  addRemoveWishListItem(sellerProductId:any, action:any) {
    const url = action ? `${apiList.removeWishList}` : `${apiList.addWishList}`;
    return this.apiService.doPost({ reqBody: sellerProductId, url });
  }
}
