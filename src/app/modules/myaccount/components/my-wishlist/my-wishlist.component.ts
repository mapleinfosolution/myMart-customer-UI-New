import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MyaccountService } from '../../service/myaccount.service';

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.scss']
})
export class MyWishlistComponent implements OnInit {
  current_wishlist:boolean = true; 
  past_wishlist:boolean = false; 
  followes_stores:boolean = false;
  wishListData: any = [];
  constructor(
    private commonService: CommonService,
    private myaccountService: MyaccountService
  ) { }

  ngOnInit(): void {
    this.getWishList();
  }

  getWishList(): void {
    this.myaccountService.getWishList({}).subscribe(res => {
      this.wishListData = res.data;
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

  show_tab(type:string): void{
    this.past_wishlist = this.current_wishlist = this.followes_stores = false;
    if(type == "past-wishlist"){
      this.past_wishlist = true;
    }
    else if (type == "followes-stores"){
      this.followes_stores = true;
    } else {
      this.current_wishlist = true;
    }
  }

  imageUrl(imagePath: string): any {
    if (imagePath) {
      return this.commonService.getImageUrl1(imagePath);
    } else {
      return '';
    }
  }

}
