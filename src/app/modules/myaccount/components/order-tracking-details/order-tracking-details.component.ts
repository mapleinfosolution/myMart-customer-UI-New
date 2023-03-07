import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { MyaccountService } from '../../service/myaccount.service';

@Component({
  selector: 'app-order-tracking-details',
  templateUrl: './order-tracking-details.component.html',
  styleUrls: ['./order-tracking-details.component.scss']
})
export class OrderTrackingDetailsComponent implements OnInit {

  public orderId: string = '';
  public orderData: any = [];
  public itemIndx: number = 0;
  public storeIndx: number = 0;
  public selectedItemData: any = {};

  constructor(
    private route: ActivatedRoute,
    private myaccountService: MyaccountService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params.orderId;
      this.getOrderDetail();
    });

    this.route.queryParams.subscribe((params)=>{
      if(typeof params.prodInx != 'undefined' || params.prodInx != null) {
        this.itemIndx = params.prodInx;
        this.storeIndx = params.storeInx;
      }
    })
  }

  getOrderDetail(): void {
    this.myaccountService.getOrderDetails(this.orderId, {}).subscribe(res => {
      this.orderData = res.data;
      this.selectedItemData = this.orderData.stores[this.storeIndx].items[this.itemIndx];
      if(typeof this.selectedItemData.orderStatusLog != 'undefined' && this.selectedItemData.orderStatusLog.some((e: any)=> e.status != 'pending' )) {
        this.selectedItemData.orderStatusLog.unshift({ 'status': 'pending', 'time': this.selectedItemData.createdAt });
      } else if(typeof this.selectedItemData.orderStatusLog == 'undefined') {
        this.selectedItemData.orderStatusLog = [];
        this.selectedItemData.orderStatusLog.push({ 'status': 'pending', 'time': this.selectedItemData.createdAt });
      }
      console.log(this.selectedItemData.orderStatusLog);
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

  capitalizeFirstLetter(status: string) {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
  

}
