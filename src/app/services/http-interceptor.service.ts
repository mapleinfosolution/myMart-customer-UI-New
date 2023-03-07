import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Toastr } from '../common/class/toastr';
import { CommonService } from './common.service';
import { getSelectedLang } from '../common/language/select-language';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private commonService: CommonService,
    private authenticationService: AuthenticationService,
    private toastr: Toastr
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader();
    const token: any = JSON.parse(localStorage.getItem('accessToken') || '""');
    let headers;
    if (req.headers.get('header') === 'true') {
      headers = new HttpHeaders({});
    } else if (req.body?.headers && Object.keys(req.body.headers).length) {
      headers = new HttpHeaders(req.body.headers);
      delete req.body.headers;
    } else {
      headers = new HttpHeaders({
        'Authorization': (token ? `Bearer ${token}` : ''),
        'lang': getSelectedLang()
      });
    }
    req = req.clone({headers});
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.onEnd();
      }
    }, (err: any) => {
      const status = err.status;
      switch (status) {
        case 401:
        case 403:
          this.authenticationService.logout();
          this.toastr.openToastr('Error', err.error?.message || 'Access permission denied', 'Forbidden');
          break;

        case 400:
          this.toastr.openToastr('Error', err.error?.message || 'Something went wrong', '', 7000);
          break;

        default:
          this.toastr.openToastr('Error', err.message, 'API ERROR', 7000);
          break;
      }
      this.onEnd();
    }));
  }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    this.commonService.showLoading();
  }

  private hideLoader(): void {
    this.commonService.hideLoading();
  }
}
