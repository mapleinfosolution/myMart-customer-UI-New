import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/services/common.service';
import { ProductService } from 'src/app/modules/product/service/product.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductCardImagePopupComponent } from '../product-card-image-popup/product-card-image-popup.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  @Output() productCardEmitor: EventEmitter<any>;
  imageBasePath: string = environment.apiUrl + '/uploads/';
  totalProductCartCount: any = 0;
  selectedVariant: any;


  constructor(
    private commonService: CommonService,
    private productService: ProductService,
    private modalService: NgbModal
  ) {
    this.productCardEmitor = new EventEmitter();
  }

  ngOnInit(): void {
    this.selectedVariant = this.product.prodVariant[0];
    this.cartCountByVariant();
  }

  cartCountByVariant() {
    this.product.prodVariant.forEach((variant: any) => {
      if (this.product.cartQuantity?.length) {
        this.product.cartQuantity.forEach((qty: any) => {
          if (qty.productVariantId === variant._id) {
            variant.cartCount = qty.quantity;
          }
        });
      } else {
        variant.cartCount = 0;
      }
    });
  }

  getImageUrl(imgObj: any, key: string = 'mediumURL'): any {
    if (imgObj && imgObj[`${key}`]) {
      return this.commonService.getImageUrl(imgObj[`${key}`]);
    } else {
      return '';
    }
  }

  addToCart(type?: any) {
    this.selectedVariant.cartCount = this.selectedVariant.cartCount + 1;
    let params: any = {};
    params.sellerProductId = this.product._id;
    params.productVariantId = this.selectedVariant._id;
    params.quantity = +this.selectedVariant.cartCount;
    params.customerId = '';
    if (!localStorage.getItem('accessToken')) {
      params.sessionId = localStorage.getItem('uniqueId');
    }
    this.addToCardCall(params);
  }

  cartCount(type: any) {
    let params: any = {};
    params.sellerProductId = this.product._id;
    params.productVariantId = this.selectedVariant._id;
    params.quantity = type === 'increase' ? 1 : -1;
    params.customerId = '';
    params.sessionId = localStorage.getItem('uniqueId');
    this.addToCardCall(params, type);
  }

  addToCardCall(params: any, type?: any) {
    // console.log(params);
    this.productService.addToCartProduct(params).subscribe(
      (res) => {
        this.commonService.showSuccessMessage(
          `${this.product.productname} ${this.selectedVariant.packSize} ${this.selectedVariant.packSizeMeasureUnit} has been added to your cart`
        );
        if (this.selectedVariant.cartCount > 0 && type === 'increase') {
          this.selectedVariant.cartCount++;
        } else if (this.selectedVariant.cartCount > 0 && type === 'decrease') {
          this.selectedVariant.cartCount--;
        }
        this.product.cartQuantity.forEach((qty: any) => {
          if (qty.productVariantId === this.selectedVariant._id) {
            qty.quantity = this.selectedVariant.cartCount;
          }
        });

        if (!this.product.cartQuantity.length) {
          this.product.cartQuantity = [
            {
              _id: res.data._id,
              quantity: res.data.quantity,
              productVariantId: res.data.productVariantId
            }
          ]
        }
        this.commonService.sendMessage();
        this.productCardEmitor.emit({product: this.product}); 
      },
      (err) => {
        this.commonService.showErrorMessage();
      }
    );
  }

  changeVariant(variant: any) {
    console.log(variant);
    this.selectedVariant = variant;
    this.selectedVariant.cartCount = 0;
    this.cartCountByVariant();
  }

  addRemoveWishList(product: any, sellerProductId: string): void {
    if (localStorage.getItem('accessToken')) {
      console.log(product, 'product');
      this.productService.addRemoveWishListItem({sellerProductId}, product.addedToWishlist).subscribe(
        (res) => {
          this.commonService.showSuccessMessage(res.message);
          product.addedToWishlist = product.addedToWishlist ? false : true;
        },
        (err) => {
          this.commonService.showErrorMessage();
        }
      );
    } else {
      this.commonService.showErrorMessage('Only logged in users can add/remove products from the wishlist');
    }
  }

  open() {
    const modalRef = this.modalService.open(ProductCardImagePopupComponent);
    modalRef.componentInstance.product = this.product;
    modalRef.componentInstance.selectedVariant = this.selectedVariant;
  }
}
