import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { LoaderState } from '../common/components/loader/loader.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  defaultSuccessMessage = 'Success!';
  defaultErrorMessage = 'Error!';
  private subject = new Subject<any>();
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  baseUrl: string = environment.apiUrl;

  constructor(private toastr: ToastrService) {}

  showSuccessMessage(messageText?: string): void {
    this.toastr.success(
      messageText && messageText !== ''
        ? messageText
        : this.defaultSuccessMessage,
        '', {
          positionClass: 'toast-bottom-right',
        } 
    );
  }

  showErrorMessage(messageText?: string): void {
    this.toastr.error(
      messageText && messageText !== '' ? messageText : this.defaultErrorMessage,
      '', {
        positionClass: 'toast-bottom-right',
      }
    );
  }

  removeToaster(): void {
    this.toastr.clear();
  }

  showLoading(): void {
    this.loaderSubject.next( { show: true } as LoaderState);
  }

  hideLoading(): void {
    this.loaderSubject.next( { show: false } as LoaderState);
  }

  sendMessage(message?: object): void {
    this.subject.next({ text: message ? message : {} });
  }

  clearMessage(): void {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  getImageUrl(imagePath: any): any {
    const apiUrl = `${this.baseUrl}/uploads/`;
    const imageUrl = `${apiUrl}/${imagePath}`;
    return imageUrl;
  }
  
  getImageUrl1(imagePath: any): any {
    const apiUrl = `${this.baseUrl}`;
    const imageUrl = `${apiUrl}/${imagePath}`;
    return imageUrl;
  }
}
