import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductService } from '../../service/product.service';
import { CommonService } from 'src/app/services/common.service';
import { countryList } from '../../../../common/country/country';

declare function swiper_slider(elm: string, obj: object): any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: any = '';
  productDetails: any = {};
  imageBasePath: string = environment.apiUrl + '/uploads/';
  productSliderThumbs: any = null;
  productSliderBig: any = null;
  productFullscreenSlider: any = null;
  prodFullScreenOn: any = false;
  prodCurSlide: any = 0;
  selectedVariant: any;
  selectedVariantId: any;
  totalProductCartCount: any = 1;
  selectedTab: any = 'overview';
  countryList: any = [];
  variantId: any;
  selectedVariantPrice: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private commonService: CommonService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.productId = params.productId;
      this.variantId = params.variantId;
      this.getProductDetails();
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.countryList = countryList;
    this.productSliderThumbs = swiper_slider('.product-detail-thumbs', {
      slidesPerView: 'auto',
      direction: 'vertical',
      spaceBetween: 10,
      watchOverflow: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.product-detail-thumbs .product-details-btn-next',
        prevEl: '.product-detail-thumbs .product-details-btn-prev',
      },
    });

    this.productSliderBig = swiper_slider('.product-detail-big-slide', {
      navigation: {
        nextEl: '.product-details-btn-next',
        prevEl: '.product-details-btn-prev',
      },
      thumbs: {
        swiper: this.productSliderThumbs,
      },
      autoplay: false,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
    });
    this.productSliderBig.on('slideChange', () => {
      this.prodCurSlide = this.productSliderBig.activeIndex;
    });

    //product-full-modal-slider
  }

  ngAfterViewInit():void {
    document.body.classList.add('product-details-page');
  }

  ngOnDestroy():void {
    document.body.classList.remove('product-details-page');
  }

  getProductDetails(): void {
    // const query = this.filters;
    const productId = this.productId;
    let params: any = {};
    let lat = localStorage.getItem('latitude');
    let long = localStorage.getItem('longitude');
    params.language = 'english';
    params.latitude = lat ? Number(lat) : null;
    params.longitude = long ? Number(long) : null;
    params.productVariationId = this.variantId;

    this.productService.getProductDetails(params, productId).subscribe(
      (res) => {
        this.productDetails = res.data;

        const found = this.productDetails.prodVariant.find(
          (variant: any) => variant._id === this.variantId
        );

        this.selectedVariant = `${found.packSize} ${found.packSizeMeasureUnit}`;
        this.selectedVariantId = found._id;
        this.selectedVariantPrice = found.sellerPrice;
        this.productDetails.attributes.map((attribute: any) => {});
        let attributeArr: any = [];
        this.productDetails.attributes.forEach((item: any) => {
          let existing = attributeArr.filter((v: any, i: any) => {
            return v.name == item.name;
          });
          if (existing.length) {
            let existingIndex = attributeArr.indexOf(existing[0]);
            attributeArr[existingIndex].value = attributeArr[
              existingIndex
            ].value.concat(item.value);
          } else {
            if (typeof item.value == 'string') item.value = [item.value];
            attributeArr.push(item);
          }
        });
        this.productDetails.attributeArr = attributeArr;

        const countryObj = this.countryList.find(
          (item: any) => item.name === this.productDetails.countryOrigin
        );
        this.productDetails.countryFlag = countryObj?.flag;
      },
      (err) => {}
    );
  }

  getImageUrl(imgObj: any, key: string = 'mediumURL'): any {
    if (imgObj && imgObj[`${key}`]) {
      return this.commonService.getImageUrl(imgObj[`${key}`]);
    } else {
      return '';
    }
  }

  getLogoImageUrl(imgObj: any, key: string = 'mediumURL') {
    if (imgObj && imgObj[`${key}`]) {
      return this.commonService.getImageUrl(imgObj[`${key}`]);
    } else {
      return '';
    }
  }

  productVariantSize(product: any) {
    this.selectedVariant = `${product.packSize} ${product.packSizeMeasureUnit}`;
    this.selectedVariantId = product._id;
    this.selectedVariantPrice = product.sellerPrice;
    this.variantId = this.selectedVariantId;
    this.getProductDetails();
  }

  // product big slider fullscreen button
  eventFullscreenBtn(): void {
    this.prodFullScreenOn = !this.prodFullScreenOn;
    setTimeout(() => {
      this.productFullscreenSlider = swiper_slider(
        '.product-full-modal-slider',
        {
          initialSlide: this.prodCurSlide,
          navigation: {
            nextEl: '.product-full-modal-slider .product-details-btn-next',
            prevEl: '.product-full-modal-slider .product-details-btn-prev',
          },

          autoplay: false,
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
          },
        }
      );
      //this.productFullscreenSlider.slideTo(this.prodCurSlide, 10, false);
    }, 300);
  }

  closeFullscreenPop(event: any): void {
    event.preventDefault();
    let get_index = this.productFullscreenSlider.activeIndex;
    this.productFullscreenSlider.destroy();
    setTimeout(() => {
      this.productSliderBig.slideTo(get_index, 10, false);
      this.prodFullScreenOn = false;
    }, 100);
  }

  autoplayButton(event: any): void {
    event.preventDefault();
    if (this.productSliderBig.autoplay.running) {
      this.productSliderBig.autoplay.stop();
    } else {
      this.productSliderBig.autoplay.start();
    }
  }

  autoplayButtonPopup(event: any): void {
    event.preventDefault();
    if (this.productFullscreenSlider.autoplay.running) {
      this.productFullscreenSlider.autoplay.stop();
    } else {
      this.productFullscreenSlider.autoplay.start();
    }
  }

  addToCart() {
    let params: any = {};
    params.sellerProductId = this.productDetails._id;
    params.productVariantId = this.selectedVariantId;
    params.quantity = 1;
    params.customerId = '';
    if (!localStorage.getItem('accessToken')) {
      params.sessionId = localStorage.getItem('uniqueId');
    }
    this.productService.addToCartProduct(params).subscribe(
      (res) => {
        this.commonService.showSuccessMessage(
          `${this.productDetails.productname} ${this.selectedVariant} has been added to your cart`
        );
        this.commonService.sendMessage();
        // setTimeout(() => {
        //    this.router.navigate(['/cart']);
        // }, 200);
      },
      (err) => {
        this.commonService.showErrorMessage();
      }
    );
  }

  buyNow() {
    this.addToCart();
    setTimeout(() => {
      this.router.navigate(['/cart']);
    }, 200);
  }

  cartCount(type: any) {
    if (type === 'increase') {
      this.totalProductCartCount++;
    } else {
      this.totalProductCartCount--;
    }
  }

  tabChange(type: any) {
    this.selectedTab = type;
  }

  redirectToProuctList() {
    this.router.navigate(['/product/product-list'], {
      queryParams: { category: this.productDetails.displayCategory },
    });
  }

  addRemoveWishList(productDetails: any, sellerProductId: string): void {
    if (localStorage.getItem('accessToken')) {
      console.log(productDetails, 'product');
      this.productService.addRemoveWishListItem({sellerProductId}, productDetails.addedToWishlist).subscribe(
        (res) => {
          this.commonService.showSuccessMessage(res.message);
          productDetails.addedToWishlist = productDetails.addedToWishlist ? false : true;
        },
        (err) => {
          this.commonService.showErrorMessage();
        }
      );
    } else {
      this.commonService.showErrorMessage('Only logged in users can add/remove products from the wishlist');
    }
  }
}
