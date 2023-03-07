import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CartService } from '../../service/cart.service';
import { AddEditAddressComponent } from '../../../myaccount/components/add-edit-address/add-edit-address.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyaccountService } from 'src/app/modules/myaccount/service/myaccount.service';

@Component({
  selector: 'app-order-summery',
  templateUrl: './order-summery.component.html',
  styleUrls: ['./order-summery.component.scss'],
})
export class OrderSummeryComponent implements OnInit {
  @Input() step: any;
  @Input() totalAmount: any;
  @Input() deliveryCost: any;
  @Input() deliveryProuctList: any;
  @Input() totalSelectedProduct: any;
  @Input() allProducts: any;
  @Input() selectedGroceies: any;
  @Input() deliveryInformation: any;
  @Output() emitor: EventEmitter<any>;
  @Output() cartOrderEmitor: EventEmitter<any>;
  @Output() paymentEmitor: EventEmitter<any>;
  deliveryPage: any = false;
  nonDeliveryProductCost: any = 0;

  constructor(
    private cartService: CartService,
    private commonService: CommonService,
    private router: Router,
    private modalService: NgbModal,
    private myaccountService: MyaccountService
  ) {
    this.emitor = new EventEmitter();
    this.cartOrderEmitor = new EventEmitter();
    this.paymentEmitor = new EventEmitter();
  }

  ngOnInit(): void {
    let removeNonDeliveryProductCost = 0;
    this.deliveryProuctList && this.deliveryProuctList.length && this.deliveryProuctList.forEach((element: any) => {
      if (!element.deliveryRules.length) {
        removeNonDeliveryProductCost += element.totalPrice;
      }
    })
    this.nonDeliveryProductCost = removeNonDeliveryProductCost ? removeNonDeliveryProductCost : 0;
  }

  openAddressAddPopup(data: any): void {
    const modalRef = this.modalService.open(AddEditAddressComponent, {
      windowClass: 'modal-add-address',
    });
    modalRef.componentInstance.data = data;
    modalRef.result.then((result) => {
      if (result && result.isData) {
        this.cartOrderEmitor.emit();
      }
    });
  }

  saveNewAddress() {
    let address:any = localStorage.getItem('selectedAddress'),
    addressObj = JSON.parse(address);
    this.myaccountService
      .addEditAddress(this.deliveryInformation, { addressId: addressObj._id ? addressObj._id :'' })
      .subscribe(
        (res) => {
          // console.log(res);
          let address:any = localStorage.getItem('selectedAddress'),
          addressObj = JSON.parse(address);
          addressObj._id = res.data._id ? res.data._id : '';
          addressObj.houseNo = res.data.HouseNo;
          addressObj.Name = res.data.Name,
          addressObj.MobileNo = res.data.MobileNo,
          localStorage.setItem('selectedAddress', JSON.stringify(addressObj));

          // this.commonService.showSuccessMessage(res.message || 'Success');
          this.checkoutProucts(res.data._id);
        },
        (err) => {
          this.commonService.showErrorMessage('Something went wrong');
        }
      );
  }

  checkoutProucts(addressId:any) {
    let params: any = {};
    if (!localStorage.getItem('accessToken')) {
      params.sessionId = localStorage.getItem('uniqueId');
    }
    params.cartItemIds = this.allProducts.map((item: any) => {
      return item._id;
    });
    params.deliveryType = this.selectedGroceies;
    let lat = localStorage.getItem('latitude');
    let long = localStorage.getItem('longitude');
    params.latitude = lat ? Number(lat) : null;
    params.longitude = long ? Number(long) : null;
    // console.log(params);
    this.cartService.checkoutProducts(params).subscribe(
      (res: any) => {
        // console.log(res);
        let result = res;
        this.deliveryPage = true;
        this.emitor.emit({
          deliveryPage: this.deliveryPage,
          deliveryPageData: result,
          addressId
        });
        this.commonService.showSuccessMessage('Checkout successfully');
      },
      (err) => {
        this.commonService.showErrorMessage();
      }
    );
  }

  checkout() {
    if (!localStorage.getItem('accessToken')) {
      this.router.navigate(['/auth'], {
        queryParams: { redirectPage: 'cart' },
      });
    } else {
      if (Object.keys(this.deliveryInformation).length !== 0) {
        this.saveNewAddress();
      } else {
        this.openAddressAddPopup({});
      }
    }
  }

  placeOrder() {
    let cost = ((this.deliveryCost ? this.deliveryCost : 0) - (this.nonDeliveryProductCost ? this.nonDeliveryProductCost : 0));
    this.paymentEmitor.emit(cost);
  }

  backToList() {
    this.router.navigate(['/product/product-list'], {
      queryParams: { category: 'Grocery' },
    });
  }
}
