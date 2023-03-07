import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class Toastr {
  constructor(private toastr: ToastrService) {
  }

  openToastr(type: string = 'success', message: any, title: string, timeOut: number = 3000) {

    title = title ? title : type.toUpperCase();

    if (type === 'success') {
      this.toastr.success(message, title, {
        timeOut: timeOut
      });
    } else {
      this.toastr.error(message, title, {
        timeOut: timeOut
      });
    }
  }
}
