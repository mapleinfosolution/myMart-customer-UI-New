import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { environment } from '../../../environments/environment';
import { apiList } from '../../../assets/values/apiList';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {
  private GOOGLE_API_KEY: string = environment.GOOGLE_API_KEY;
  constructor(
    private apiService: ApiService
  ) { }

  getLatLon(params: any): Observable<any> {
    const url = `https://services.gisqatar.org.qa/server/rest/services/Vector/QARS_wgs84/MapServer/0/query?where=zone_no%3D${params.zone}+and+street_no%3D${params.street}+and+building_no%3D${params.building}&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=X_COORD%2CY_COORD&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&f=pjson`;
    return this.apiService.externalApi({ url });
  }

  getLocationByCoordinate(params: any): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${params.lat},${params.lng}&key=${this.GOOGLE_API_KEY}`;
    return this.apiService.externalApi({ url });
  }

  userDetails(params: any): Observable<any> {
    const url = `${apiList.userDetails}`;
    return this.apiService.doGet({ query: params, url });
  }

  getWishListCount(params: any): Observable<any> {
    const url = `${apiList.wishListCount}`;
    return this.apiService.doGet({ query: params, url });
  }

  getCartList(params: any): Observable<any> {
    const url = `${apiList.fetchCartList}`;
    return this.apiService.doPost({ reqBody: params, url });
  }
}
