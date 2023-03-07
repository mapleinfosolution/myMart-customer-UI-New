import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header-address-selection',
  templateUrl: './header-address-selection.component.html',
  styleUrls: ['./header-address-selection.component.scss']
})
export class HeaderAddressSelectionComponent {
  @Input() data: any;
  constructor(
    private activeModal: NgbActiveModal
  ) { }

  closePopup(data: any): void {
    if (data) {
      this.activeModal.close(data);
    }
  }

  cancelClick(): void {
    if (localStorage.getItem('selectedAddress')) {
      this.closePopup({ isData: false });
    }
  }
}
