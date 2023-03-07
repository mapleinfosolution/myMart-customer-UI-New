import { Component, OnInit } from '@angular/core';
import { MyaccountService } from '../../service/myaccount.service';
import { CommonService } from '../../../../services/common.service';
import { PaginationDropdown } from '../../../../services/constant/constants';
import { KeyValueNumber, PaginationModel } from '../../../../services/models/common-model';
import { OrderFilterModel, OrderListTabsModel } from '../../models/myaccount.models';
import { OrderListTabs } from '../../models/myaccount.constant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-order-shell',
  templateUrl: './my-order-shell.component.html',
  styleUrls: ['./my-order-shell.component.scss']
})
export class MyOrderShellComponent implements OnInit {
  orderTabs: OrderListTabsModel[] = OrderListTabs;
  orderList: any[] = [];
  paginationDropdown: KeyValueNumber[] = PaginationDropdown;
  filterData: OrderFilterModel = {
    page: 1,
    perPage: 5
  };
  totalCount = 0;

  constructor(
    private myaccountService: MyaccountService,
    private commonService: CommonService,
    private _activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    document.body.classList.add('order-page');
    document.querySelectorAll('.mobile-view-header')[0].classList.add('message-off', 'bell-off', 'cart-off', 'category-off', 'search-off', 'filter-off');
    document.querySelectorAll('.mobile-view-header')[0].classList.remove('title-off', 'back-off', 'more-off');
    this._activateRoute.queryParams.subscribe((resp: any) => {
      if(typeof resp.inx != 'undefined' || resp.inx != null) {
        this.showTab(resp.inx, resp.status);
      } else {
        this.getOrderList();
      }
    })
  }

  showTab(inx: number, status: string): void {
    this.orderTabs.forEach((elm: any) => {
      elm.active = false;
    });
    this.orderTabs[inx].active = true;
    this.filterData.status = status;
    this.filterData = {
      page: 1,
      perPage: 5
    };
    this.getOrderList();
  }

  getOrderList(): void {
    const payload = { ...this.filterData };
    this.myaccountService.getOrderList(payload).subscribe(res => {
      this.orderList = res.data;
      this.totalCount = res.totalCount
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

  paginatioChange(paginatioData: PaginationModel): void {
    this.filterData = { ...this.filterData, ...paginatioData }
    this.getOrderList();
  }

}
