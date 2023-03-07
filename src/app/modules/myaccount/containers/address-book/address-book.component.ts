import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditAddressComponent } from '../../components/add-edit-address/add-edit-address.component';
import { MyaccountService } from '../../service/myaccount.service';
import { CommonStoreService } from '../../../../services/api/common-store.service';
import { CommonService } from '../../../../services/common.service';
import { ConfirmationPopupComponent } from '../../../../common/components/confirmation-popup/confirmation-popup.component';
import { ConfirmationPopupConfig, CommonMessage } from '../../../../services/constant/constants';


@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  addressList: any = [];
  popupConfig = ConfirmationPopupConfig;
  constructor(
    private modalService: NgbModal,
    private myaccountService: MyaccountService,
    private commonStoreService: CommonStoreService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getAddressList();
  }

  openAddressAddPopup(data: any): void {
    const modalRef = this.modalService.open(AddEditAddressComponent, { windowClass: 'modal-add-address' });
    modalRef.componentInstance.data = data;
    modalRef.result.then((result) => {
      if (result && result.isData) {
        this.getAddressList();
      }
    });
  }

  getAddressList(): void {
    this.myaccountService.addressList({}).subscribe(res => {
      this.addressList = res.data;
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

  deleteClick(item: any): void {
    const modalRef = this.modalService.open(ConfirmationPopupComponent, this.popupConfig);
    modalRef.componentInstance.data = { message: CommonMessage.addressDeleteConfirmation };
    modalRef.result.then((result) => {
      if (result) { this.makeDelete(item); }
    });
  }

  makeDelete(item: any): void {
    this.myaccountService.deleteAddress({}, item._id).subscribe(res => {
      let address:any = localStorage.getItem('selectedAddress'),
      addressObj = JSON.parse(address);
      if (item._id === addressObj._id) {
        delete addressObj._id;
      }
      localStorage.setItem('selectedAddress', JSON.stringify(addressObj));
      this.getAddressList();
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

  editClick(data: any): void {
    console.log(data);
    this.openAddressAddPopup(data);    
  }

  makePrimary(item: any) {
    this.myaccountService.makePrimary({}, item._id).subscribe(res => {
      this.getAddressList();
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

}
