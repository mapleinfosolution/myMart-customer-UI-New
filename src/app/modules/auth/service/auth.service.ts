import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { apiList } from '../../../../assets/values/apiList';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: ApiService
  ) { }

  sendOtp(params: any): Observable<any> {
    const url = `${apiList.sendOtp}`;
    return this.apiService.doPost({ reqBody: params, url });
  }

  verifyOtp(params: any): Observable<any> {
    const url = `${apiList.verifyOtp}`;
    return this.apiService.doPost({ reqBody: params, url });
  }

  signup(params: any, headerData: any): Observable<any> {
    const url = `${apiList.signUp}`;
    return this.apiService.doPostCopy({ reqBody: params, url }, headerData);
  }

  login(params: any): Observable<any> {
    const url = `${apiList.login}`;
    return this.apiService.doPost({ reqBody: params, url });
  }
}
