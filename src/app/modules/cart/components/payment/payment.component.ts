import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { MyaccountService } from 'src/app/modules/myaccount/service/myaccount.service';
import { CommonService } from 'src/app/services/common.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input() totalAmount: any;
  @Input() totalSelectedProduct: any;
  @Input() deliveryInformation: any;
  @Input() deliveryResult: any;
  @Input() addressId: any;
  phoneNumber: any;
  successMsg: any = '';
  otp: any;
  isChecked: any;
  deliveryLocation: any = {};
  isDisabled: any = true;
  timer = 60;
  interval: any;
  isDisabledOtp: any = false;
  public paymentType: string = '';

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private cartService: CartService,
    private myaccountService: MyaccountService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.log(this.totalAmount);
    if (localStorage.getItem('accessToken')) {
      this.customerDeliveryLocation();
    }

    let address: any = localStorage.getItem('selectedAddress'),
      addressObj = JSON.parse(address);

    this.phoneNumber = addressObj?.MobileNo;
  }

  disable() {
    let disabled = false;
    const mobileRe = /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/;
    if (!this.phoneNumber) {
      disabled = true;
    }
    if (this.phoneNumber && !mobileRe.test(this.phoneNumber)) {
      disabled = true;
    }
    return disabled;
  }

  verifyDisable() {
    let disabled = false;
    const mobileRe = /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/;
    if (
      this.phoneNumber &&
      mobileRe.test(this.phoneNumber) &&
      this.otp &&
      this.isChecked
    ) {
      disabled = false;
    } else {
      disabled = true;
    }
    return disabled;
  }

  getOtp() {
    this.isDisabledOtp = false;
    clearInterval(this.interval);
    this.timer = 60;
    let params: any = {};
    params.phone = this.phoneNumber;
    this.authService.sendOtp(params).subscribe(
      (res: any) => {
        this.successMsg = `We just send you a verification code via phone ${this.phoneNumber}`;
        this.interval = setInterval(() => {
          if (this.timer > 0) {
            this.timer--;
          } else {
            this.isDisabledOtp = true;
          }
        }, 1000);
        setTimeout(() => {
          this.successMsg = '';
        }, 6000);
      },
      (err) => {
        this.commonService.showErrorMessage('Something went wrong');
      }
    );
  }

  saveNewAddress() {
    let address: any = localStorage.getItem('selectedAddress'),
      addressObj = JSON.parse(address);
    addressObj.MobileNo = this.phoneNumber;
    this.myaccountService
      .addEditAddress(addressObj, {
        addressId: addressObj._id ? addressObj._id : '',
      })
      .subscribe(
        (res) => {
          console.log(res);

          let address: any = localStorage.getItem('selectedAddress'),
            addressObj = JSON.parse(address);
          (addressObj.MobileNo = res.data.MobileNo),
            localStorage.setItem('selectedAddress', JSON.stringify(addressObj));

          let userData: any = localStorage.getItem('userData'),
            userObj = JSON.parse(userData);
          userObj.phone = res.data.MobileNo;
          localStorage.setItem('userData', JSON.stringify(userObj));

          // this.commonService.showSuccessMessage(res.message || 'Success');
        },
        (err) => {
          this.commonService.showErrorMessage('Something went wrong');
        }
      );
  }

  action() {
    if (this.isDisabled) {
      this.verifyPhoneNumber();
    } else {
    }
  }

  verifyPhoneNumber() {
    clearInterval(this.interval);
    this.timer = 60;
    let params: any = {};
    params.phone = this.phoneNumber;
    params.otp = this.otp;
    this.authService.verifyOtp(params).subscribe(
      (res: any) => {
        this.commonService.showSuccessMessage(res.message);
        let address: any = localStorage.getItem('selectedAddress'),
          addressObj = JSON.parse(address);
        if (this.phoneNumber !== addressObj.MobileNo) {
          this.saveNewAddress();
        }
        this.commonService.sendMessage(this.phoneNumber);
        this.isDisabled = false;
        setTimeout(()=>{
          this.placeOrder();
        },500)
      },
      (err) => {
        this.commonService.showErrorMessage('Something went wrong');
      }
    );
  }

  customerDeliveryLocation() {
    this.deliveryLocation = this.deliveryInformation;
  }

  placeOrder() {
    let obj: any = localStorage.getItem('slotObj'),
      dateTimeSlot = JSON.parse(obj);

    let ruleObj: any = localStorage.getItem('deliveryRuleObj'),
      deliveryRule = JSON.parse(ruleObj);
    let params: any = {};
    params.draftOrderId = this.deliveryResult.draftOrderId;
    params.deliveryAddressId = this.addressId;
    params.total_amount = this.totalAmount;
    params.deliveryType = this.deliveryResult.adminDeliveryRules ? 'combine' : 'store';
    params.deliveryRules = [
      {
        storeId: deliveryRule.storeId,
        deliveryRuleId: deliveryRule.deliveryRuleId,
      },
    ];
    if (this.deliveryResult.adminDeliveryRules) {
      params.adminDeliveryRuleId = dateTimeSlot.selectedSlotId;
      params.slot = {
        date: dateTimeSlot.date,
        timeBlock: dateTimeSlot.time,
      };
    }
    if(this.paymentType == 'online') {
      this.cartService.getOnlinePaymentLink(params).subscribe((res: any)=>{
        if(res.status == "SUCCESS") {
          window.location.href = res.result.checkout_url;
        }
      })
    } else {
      this.cartService.placeOrderProducts(params).subscribe(
        (res: any) => {
          // console.log(res);
          localStorage.removeItem('slotObj');
          localStorage.removeItem('deliveryRuleObj');
          this.commonService.showSuccessMessage(res.message);
          this.router.navigate(['/thank-you'], { queryParams: {details: JSON.stringify(res)}});
        },
        (err) => {
          this.commonService.showErrorMessage();
        }
      );
    }
    
  }

  onChange(evnt: any) {
    this.paymentType = evnt.target.value;
  }
}
