import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MyaccountService } from '../../service/myaccount.service';
import { CommonStoreService } from '../../../../services/api/common-store.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit, OnDestroy {
  userDetails: any = {};
  private subs: Subscription[] = [];
  defaultAddressList: any = [];
  orderList: any = [];
  constructor(
    private myaccountService: MyaccountService,
    private commonStoreService: CommonStoreService,
    private commonService: CommonService
  ) {
    this.subs.push(this.commonStoreService.getUserData().subscribe((val: any) => {
      this.userDetails = val;
    }));
  }

  ngOnInit(): void {
    this.getDefaultAddress();
    this.getOrderData();
  }

  imageUrl(imagePath: string): any {
    if (imagePath) {
      return this.commonService.getImageUrl1(imagePath);
    } else {
      return '';
    }
  }

  showName(): string {
    let name = '';
    name = ((this.userDetails.firstname) ? this.userDetails.firstname.substr(0, 1) : '' ) + ((this.userDetails.lastname) ? this.userDetails.lastname.substr(0, 1) : '');
    return name;
  }

  getDefaultAddress(): void {
    this.myaccountService.addressList({ listType: 'primary' }).subscribe(res => {
      this.defaultAddressList = res.data;
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

  getOrderData(): void {
    this.myaccountService.getOrderList({ page: 1, perPage: 2 }).subscribe(res => {
      this.orderList = res.data;
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
