import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KeyValueNumber } from 'src/app/services/models/common-model';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  @Input() orderList: any = [];
  @Input() paginationDropdown: KeyValueNumber[] = [];
  @Output() paginationChangeEvent = new EventEmitter<any>();
  @Input() totalCount = 0;
  itemPerPage = 5;
  page = 1;
  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  getImageUrl(imgObj: any, key: string = 'thumbURL'): any {
    if (imgObj && imgObj[`${key}`]) {
      return this.commonService.getImageUrl1(imgObj[`${key}`]);
    } else {
      return '';
    }
  }

  paginationDropdownChange(event: any): void {
    const value = Number(event.target.value);
    this.paginationChangeEvent.emit({ perPage: value, page: 1 });
    this.itemPerPage = value;
    this.page = 1;
  }

  paginationChange(event: any): void {
    this.paginationChangeEvent.emit({ page: event });
    this.page = event;
  }

}
