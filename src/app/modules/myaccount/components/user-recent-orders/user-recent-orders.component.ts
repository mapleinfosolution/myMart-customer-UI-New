import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-recent-orders',
  templateUrl: './user-recent-orders.component.html',
  styleUrls: ['./user-recent-orders.component.scss']
})
export class UserRecentOrdersComponent implements OnInit {
  @Input() orderList: any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
