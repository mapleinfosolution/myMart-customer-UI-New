import {Injectable} from '@angular/core';
// import {CookieService} from 'ngx-cookie-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  public baseUrl: any = environment.apiUrl + '/api';
  public jwtToken: any = ''; // = this.cookieService.get('access_token');

  /* set common header */
  private httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
      // 'Access-Control-Allow-Headers': 'Content-Type',
      Authorization: 'Bearer ' + this.jwtToken
    })
  };

  constructor(public http: HttpClient) { }

  // updateToken() {
  //   this.jwtToken = this.cookieService.get('access_token');
  //   this.httpOptions = {
  //     headers: new HttpHeaders({
  //       // 'Content-Type': 'application/json',
  //       // 'Accept': 'application/json',
  //       // 'Access-Control-Allow-Headers': 'Content-Type',
  //       Authorization: 'Bearer ' + this.jwtToken
  //     })
  //   };
  // }

  get(endpoint: string, queryParams = {}): Observable<any> {
    const header = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken()
      })
    };
    return this.http.get(this.baseUrl + endpoint + this.buildQuery(queryParams), header);
  }

  post(url: any, data: any = {}): Observable<any> {
    const header = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken()
      })
    };
    return this.http.post(this.baseUrl + url, data, header);
  }

  getToken(): string {
    // return this.cookieService.get('access_token');
    return '';
  }

  // getCustomers(endpoint: string, sort: string, order: number, skip: number, limit: number,condition?: any): Observable<any> {
  //   const url = this.baseUrl + endpoint;
  //   let data = { sort: sort, order: order, skip: skip, limit: limit, condition: condition}
  //   return this.http.post(url, data, this.httpOptions);
  // }

  buildQuery(params: any = {}): string {
    const keys = Object.keys(params);
    let query = '?';
    for (let i = 0; i < keys.length; i++) {
      query += keys[i] + '=' + params[keys[i]];
      if (i !== keys.length - 1) {
        query += '&';
      }
    }
    return query;
  }

  public doPost(postParam: any, headerData: any = {}): Observable<any> {
    const queryUrl = (postParam.queryParams && Object.keys(postParam.queryParams).length) ? this.buildQuery(postParam.queryParams) : '';
    const apiEnd = this.baseUrl + postParam.url + queryUrl;
    const reqBody = postParam.reqBody;
    const headersObj = Object.assign(headerData);
    const options = { headers: headersObj };
    return this.http.post(apiEnd, reqBody, options);
  }

  public doPostCopy(postParam: any, headerData: any = {}): Observable<any> {
    const queryUrl = (postParam.queryParams && Object.keys(postParam.queryParams).length) ? this.buildQuery(postParam.queryParams) : '';
    const apiEnd = this.baseUrl + postParam.url + queryUrl;
    const reqBody = postParam.reqBody;
    reqBody.headers = headerData;
    const options = { headers: {} };
    // const headersObj = Object.assign(headerData);
    // const options = { headers: headersObj };
    // const header = {
    //   headers: new HttpHeaders({'Authorization': headerData.Authorization, 'headerExist': 'true'})
    // };
    return this.http.post(apiEnd, reqBody, options);
  }

  public doPut(postParam: any): Observable<any> {
    const apiEnd = this.baseUrl + postParam.url;
    const reqBody = postParam.reqBody;
    const options = { headers: {} };
    return this.http.put(apiEnd, reqBody, options);
  }

  public doGet(getParams: any): Observable<any> {
    const queryUrl = (getParams.query && Object.keys(getParams.query).length) ? this.buildQuery(getParams.query) : '';
    const apiEnd = this.baseUrl + getParams.url + queryUrl;
    const headers = new HttpHeaders();
    return this.http.get(apiEnd, { headers });
  }

  public doDelete(getParams: any): Observable<any> {
    const queryUrl = (getParams.query && Object.keys(getParams.query).length) ? this.buildQuery(getParams.query) : '';
    const apiEnd = this.baseUrl + getParams.url + queryUrl;
    const options = { headers: {} };
    return this.http.delete(apiEnd, options);
  }

  public externalApi(getParams: any): Observable<any> {
    const apiEnd = getParams.url;
    const headers = new HttpHeaders({'header': 'true'});
    return this.http.get(apiEnd, { headers: {'header': 'true'} });
  }

}

