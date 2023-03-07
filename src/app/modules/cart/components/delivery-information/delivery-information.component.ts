import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { AddEditAddressComponent } from '../../../myaccount/components/add-edit-address/add-edit-address.component';


@Component({
  selector: 'app-delivery-information',
  templateUrl: './delivery-information.component.html',
  styleUrls: ['./delivery-information.component.scss']
})
export class DeliveryInformationComponent implements OnInit {
  @Input() step: any;
  @Input() deliveryInformation: any;
  @Input() deliveryRulePage: any;
  @Input() addressId: any;
  @Input() updatedPhnNumber: any;
  @Output() cartEmitor: EventEmitter<any>;
  isLoggedIn: any = false;
  selectedAddress :any = {};
  selectedAddressId:any;
  phnNoSubscription: Subscription;

  constructor(private modalService: NgbModal, private commonService: CommonService) {
    this.cartEmitor = new EventEmitter();

    this.phnNoSubscription = this.commonService
    .getMessage()
    .subscribe((message: any) => {
      this.deliveryInformation = {...this.deliveryInformation, MobileNo: message.text };
    });
   }

  ngOnInit(): void {
    console.log(this.deliveryInformation);
    if (localStorage.getItem('accessToken')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  editAddress() {
      this.openAddressAddPopup({...this.deliveryInformation, _id: this.selectedAddressId ? this.selectedAddressId : ''});
  }

  openAddressAddPopup(data: any): void {
    const modalRef = this.modalService.open(AddEditAddressComponent, {
      windowClass: 'modal-add-address',
    });
    modalRef.componentInstance.data = data;
    modalRef.result.then((result) => {
      if (result && result.isData) {
        console.log(result.data._id);
        this.selectedAddressId = result.data._id;
        let address:any = localStorage.getItem('selectedAddress'),
        addressObj = JSON.parse(address);
        addressObj._id = result.data._id ? result.data._id : '';
        addressObj.houseNo = result.data.HouseNo;
        addressObj.Name = result.data.Name,
        addressObj.MobileNo = result.data.MobileNo,
        localStorage.setItem('selectedAddress', JSON.stringify(addressObj));
        this.cartEmitor.emit();
      }
    });
  }

  ngOnDestroy(): void {
    this.phnNoSubscription.unsubscribe();
  }

}
