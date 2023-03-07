import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-wishlist-and-follwed-stores',
  templateUrl: './wishlist-and-follwed-stores.component.html',
  styleUrls: ['./wishlist-and-follwed-stores.component.scss']
})
export class WishlistAndFollwedStoresComponent implements OnInit {
  current_wishlist:boolean = true; 
  past_wishlist:boolean = false; 
  followes_stores:boolean = false; 
  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  getWishList(): void {
    
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