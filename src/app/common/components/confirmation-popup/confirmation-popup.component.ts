import { Component, OnInit, Inject, Input } from '@angular/core';
import { ConfirmationPopupData } from '../../../services/models/common-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonMessage } from 'src/app/services/constant/constants';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {
  confirmationData!: ConfirmationPopupData;
  @Input() public data: any;
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.confirmationData = {
      title: CommonMessage.confirmationTitle,
      message: '',
      ok: true,
      cancel: true,
      okTitle: CommonMessage.okTitle,
      cancelTitle: CommonMessage.cancelTitle,
      ...this.data
    };
  }

  closePopup(isClose: boolean): void {
    this.activeModal.close(isClose);
  }

  cancelClick(): void {
    this.closePopup(false);
  }

  submitClick(): void {
    this.closePopup(true);
  }

}
