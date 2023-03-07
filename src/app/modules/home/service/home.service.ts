import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { apiList } from 'src/assets/values/apiList';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private apiService: ApiService
  ) { }

  getProductList(params: any): Observable<any> {
    const url = `${apiList.fetchPopularCategory}?language=english`;
    return this.apiService.doGet({ query: params, url });
  }

  getTrendingList(params: any): Observable<any> {
    const url = `${apiList.fetchTrending}`;
    return this.apiService.doPost({ reqBody: params, url });
  }

  loadBanners(params: any): Observable<any> {
    const url = `${apiList.bannerFetch}`;
    return this.apiService.doGet({ query: params, url });
  }

  loadCategories(params: any): Observable<any> {
    const url = `${apiList.categoryFetch}`;
    return this.apiService.doGet({ query: params, url });
  }

  loadBrands(params: any): Observable<any> {
    const url = `${apiList.brandListFetch}`;
    return this.apiService.doGet({ query: params, url });
  }

  getSearchByString(params: any): Observable<any> {
    const url = `${apiList.getAutoCompleteList}${params}`;
    return this.apiService.doGet({ query: {}, url });
  }
}
