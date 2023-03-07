import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
declare function swiper_slider(elm: string, obj: object): any;
@Component({
  selector: 'app-product-card-image-popup',
  templateUrl: './product-card-image-popup.component.html',
  styleUrls: ['./product-card-image-popup.component.scss'],
})
export class ProductCardImagePopupComponent implements OnInit {
  @Input() product: any;
  @Input() selectedVariant: any;

  constructor(public activeModal: NgbActiveModal, private commonService: CommonService, private router: Router) {}

  ngOnInit(): void {
    let thumbs = swiper_slider('.product-gal-thumbs', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: false,
      watchSlidesProgress: true,
    });
    let slider = swiper_slider('.product-gal-slider', {
      slidesPerView: 1,
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: thumbs,
      },
    });
  }

  getImageUrl(imgObj: any, key: string = 'mediumURL'): any {
    if (imgObj && imgObj[`${key}`]) {
      return this.commonService.getImageUrl(imgObj[`${key}`]);
    } else {
      return '';
    }
  }

  productDetailsPage() {
    this.activeModal.dismiss();
    this.router.navigate([`/product/product-details/${this.product._id}/${this.selectedVariant._id}`]);
  }
}
