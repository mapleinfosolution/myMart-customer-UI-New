import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyaccountService } from '../../service/myaccount.service';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderId: any;
  orderData: any = {};
  constructor(
    private route: ActivatedRoute,
    private myaccountService: MyaccountService,
    private commonService: CommonService
  ) {
    this.route.params.subscribe((params) => {
      this.orderId = params.orderId;
      this.getOrderDetail();
    });
  }

  ngOnInit(): void {
  }

  getOrderDetail(): void {
    this.myaccountService.getOrderDetails(this.orderId, {}).subscribe(res => {
      this.orderData = res.data;
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

  getImageUrl(imgObj: any, key: string = 'thumbURL'): any {
    if (imgObj && imgObj[`${key}`]) {
      return this.commonService.getImageUrl1(imgObj[`${key}`]);
    } else {
      return '';
    }
  }

  displayAddress(addressData: any): string {
    let address = '';
    if (addressData?.Address) { address = address + addressData.Address; }
    return address;
  }

}
