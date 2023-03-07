import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopupComponent } from '../common/components/confirmation-popup/confirmation-popup.component';
import { CommonStoreService } from './api/common-store.service';
import { CommonMessage, ConfirmationPopupConfig } from './constant/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  popupConfig = ConfirmationPopupConfig;
  constructor(
    public router: Router,
    private modalService: NgbModal,
    private commonStoreService: CommonStoreService
  ) { }

  logout(): void {
    const modalRef = this.modalService.open(ConfirmationPopupComponent, this.popupConfig);
    modalRef.componentInstance.data = { message: CommonMessage.logOutConfirmation };
    modalRef.result.then((result: boolean) => {
      if (result) {
        // localStorage.clear();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        this.commonStoreService.setLoginData(null);
        this.router.navigateByUrl('/auth/login');
        this.commonStoreService.callAfterLogout();
      }
    });
  }
}
