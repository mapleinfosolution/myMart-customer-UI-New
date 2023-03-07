import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopupComponent } from '../../../../common/components/confirmation-popup/confirmation-popup.component';
import { ConfirmationPopupConfig, CommonMessage } from '../../../../services/constant/constants';
import { AuthenticationService } from '../../../../services/authentication.service';
declare var $: any;
@Component({
  selector: 'app-user-profile-nav',
  templateUrl: './user-profile-nav.component.html',
  styleUrls: ['./user-profile-nav.component.scss']
})
export class UserProfileNavComponent implements OnInit {

  constructor(

    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    $('.user-nav-item__title').click((e: any) => {
      const targetElm = $(e.target);
      if ($(e.target).parent().hasClass('on')) {
        $(e.target).next().slideUp();
        $(e.target).parent().removeClass('on');
      } else {
        targetElm.next().slideDown(500, () => {
          targetElm.parent().addClass('on');
        });
      }
    });
  }

  logOut(): void {
    this.authenticationService.logout();
  }

}
