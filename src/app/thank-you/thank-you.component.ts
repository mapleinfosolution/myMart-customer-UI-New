import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {

  public orderDetails: any = {};

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(resp=>{
      if(typeof resp.details != 'undefined') {
        let orderData = JSON.parse(resp.details);
        this.orderDetails = orderData.data;
      }
    })
  }

}
