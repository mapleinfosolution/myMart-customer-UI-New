import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/modules/product/service/product.service';
import { CommonService } from 'src/app/services/common.service';
import { CartService } from '../../service/cart.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
declare function swiper_slider(elm: string, obj: object): any;

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  cartData: any;
  cardListArr: any = [];
  allStoreProductCount: any = 0;
  totalAmount: any = 0;
  selectedProductCount: any = 0;
  allSelectedProduct: any = [];
  allCount: any;
  allChecked = false;
  selectedValue: any;
  checkboxArr: any = [];
  selectedGroceies: any = 'store';
  deliveryRulePage: any = false;
  closeResult = '';
  selectedDeleteRecord: any = [];
  deliveryResult: any = {};
  deliveryLocation: any = {};
  cart_item_slider: any;
  addressId: any;
  orderStep: any = 1;
  totalCost: any;

  constructor(
    private cartService: CartService,
    private commonService: CommonService,
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    document.body.classList.add('cart-page');
    document
      .querySelectorAll('.mobile-view-header')[0]
      .classList.add(
        'message-off',
        'bell-off',
        'cart-off',
        'category-off',
        'search-off',
        'filter-off'
      );
    document
      .querySelectorAll('.mobile-view-header')[0]
      .classList.remove('title-off', 'back-off', 'more-off', 'trash-off');
    window.scrollTo(0, 0);
    this.getCartList();
    this.checkboxArr = [
      { name: 'All Items', value: 'allItems', checked: true },
      { name: 'Grocery Items Only', value: 'groceryItem', checked: false },
      // {name: 'Non-Grocery Items Only' , value: 'nonGroceryItem', checked: false},
      { name: 'Fast Delivery Only', value: 'fastDelivery', checked: false },
      {
        name: 'Free Delivery Items only',
        value: 'freeDelivery',
        checked: false,
      },
    ];
    this.customerDeliveryLocation();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      //cart item slider
      this.cart_item_slider = swiper_slider('.cart_top_opt_slider', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        navigation: {
          nextEl: '.cart_top_opt_slider .swiper-button-next',
          prevEl: '.cart_top_opt_slider .swiper-button-prev',
        },
        scrollbar: {
          el: '.cart_top_opt_slider .swiper-scrollbar',
          hide: true,
        },
      });
    }, 800);
  }

  getImageUrl(imgObj: any, key: string = 'thumbURL'): any {
    if (imgObj && imgObj[`${key}`]) {
      return this.commonService.getImageUrl(imgObj[`${key}`]);
    } else {
      return '';
    }
  }

  getCartList(name?: any) {
    let params: any = {};
    // params.customerId = localStorage.getItem('accessToken');
    if (!localStorage.getItem('accessToken')) {
      params.sessionId = localStorage.getItem('uniqueId');
    }
    params.category = 'Grocery';
    params.fastDelivery = name === 'fastDelivery' ? true : false;
    params.freeDelivery = name === 'freeDelivery' ? true : false;
    let lat = localStorage.getItem('latitude');
    let long = localStorage.getItem('longitude');
    params.latitude = lat ? Number(lat) : null;
    params.longitude = long ? Number(long) : null;
    // params.deliveryType = this.selectedGroceies;
    this.cartService.getCartList(params).subscribe(
      (res: any) => {
        this.allCount = res.count;
        this.cartData = res.data[0];
        this.cardListArr = res.data;
        this.cardListArr.forEach((store: any) => {
          if (store.products) {
            store.percentage = 0;
            // console.log(store.products);
            this.allStoreProductCount += store.products.length;
            store.checked = false;
          }
          store.products.forEach((product: any) => {
            product.checked = false;
          });
        });
        // console.log(this.cardListArr);
      },
      (err) => {}
    );
  }

  cartCount(type: any, cartData: any, cart: any) {
    let params: any = {};
    params.sellerProductId = cartData.sellerProductId;
    params.productVariantId = cartData.productVariantId;
    params.quantity = type === 'increase' ? 1 : -1;
    params.customerId = '';
    if (!localStorage.getItem('accessToken')) {
      params.sessionId = localStorage.getItem('uniqueId');
    }
    this.addToCardCall(params, cartData, cart, type);
  }

  addToCardCall(params: any, cartData: any, store: any, type?: any) {
    console.log(params);
    this.productService.addToCartProduct(params).subscribe(
      (res) => {
        this.commonService.showSuccessMessage(
          `${cartData.productDetails.displayCategory} ${cartData.selectedVariant.packSize} ${cartData.selectedVariant.packSizeMeasureUnit} has been added to your cart`
        );
        if (type === 'increase') {
          cartData.quantity++;
        } else if (type === 'decrease') {
          cartData.quantity--;
              if (cartData.quantity === 0) {
                store.products = store.products.filter(
                  (cart: any) => cart._id !== cartData._id
                );
              }
              console.log(this.cartData.products);
        }
        this.commonService.sendMessage();
      },
      (err) => {
        this.commonService.showErrorMessage();
      }
    );
  }

  selectAllStoreProduct(e: any) {
    let amount = 0;
    let allProductArr = [];
    this.cardListArr.forEach((store: any) => {
      if(store.deliveryRules.length > 0) {
        store.checked = e.target.checked ? true : false;
        allProductArr = store.products.map((product: any) => {
          return {
            ...product,
          };
        });
        this.allSelectedProduct = e.target.checked
          ? [...this.allSelectedProduct, ...allProductArr]
          : [];

        this.allSelectedProduct = [
          ...new Map(
            this.allSelectedProduct.map((item: any) => [item._id, item])
          ).values(),
        ];

        // console.log(this.allSelectedProduct);
        store.products.forEach((product: any) => {
          product.checked = e.target.checked ? true : false;
        });
      }
    });
    this.allSelectedProduct.forEach((item: any) => {
      amount +=
        (item.selectedVariant.specialPrice
          ? item.selectedVariant.specialPrice
          : item.selectedVariant.sellerPrice) * item.quantity;
    });
    this.totalAmount = amount;
  }

  removeAllStoreProduct(content?: any) {
    // this.allChecked = false;
    // this.cardListArr.forEach((store: any) => {
    //   store.checked = false;
    //   // this.allSelectedProduct = [];
    //   store.products.forEach((product: any) => {
    //     product.checked = false;
    //     this.totalAmount = 0;
    //   });
    // });
    this.open(content, this.allSelectedProduct, 'M');
  }

  checkedByAllProductByStore(data: any, e: any) {
    this.checkedAllBox();
    let amount = 0;
    this.cardListArr.forEach((store: any) => {
      store.products.forEach((product: any) => {
        if (store._id === data._id) {
          if (e.target.checked) {
            let totalPrice = store.products.reduce((a:any, item: any)=>a + item.totalPrice, 0);
            store.percentage = totalPrice > store.deliveryRules[0].minOrderValue ? 100 : ((totalPrice * 100) / store.deliveryRules[0].minOrderValue).toFixed(2);
            product.checked = true;
            this.allSelectedProduct = [
              ...this.allSelectedProduct,
              { ...product },
            ];
            this.allSelectedProduct = [
              ...new Map(
                this.allSelectedProduct.map((item: any) => [item._id, item])
              ).values(),
            ];
          } else {
            product.checked = false;
            this.allChecked = false;
            this.allSelectedProduct = this.allSelectedProduct.filter(
              (item: any) => item._id !== product._id
            );
            store.percentage = 0;
          }
          // console.log(this.allSelectedProduct);
        }
      });
    });
    this.allSelectedProduct.forEach((item: any) => {
      amount +=
        (item.selectedVariant.specialPrice
          ? item.selectedVariant.specialPrice
          : item.selectedVariant.sellerPrice) * item.quantity;
    });
    this.totalAmount = amount;
    console.log(this.cardListArr, 'cardListArr');
  }

  checkedByStore(data: any, e: any) {
    this.checkedAllBox();
    // console.log(e.target.checked);
    this.cardListArr.forEach((store: any) => {
      store.checked = false;
      store.products.forEach((product: any) => {
        if (product._id === data._id) {
          if (e.target.checked) {
            this.allSelectedProduct = [
              ...this.allSelectedProduct,
              { ...product },
            ];
            this.allSelectedProduct = [
              ...new Map(
                this.allSelectedProduct.map((item: any) => [item._id, item])
              ).values(),
            ];
            this.totalAmount =
              this.totalAmount +
              (product.selectedVariant.specialPrice
                ? product.selectedVariant.specialPrice
                : product.selectedVariant.sellerPrice) *
                product.quantity;
          } else {
            this.allChecked = false;
            this.allSelectedProduct = this.allSelectedProduct.filter(
              (item: any) => item._id !== data._id
            );
            this.totalAmount =
              this.totalAmount -
              (product.selectedVariant.specialPrice
                ? product.selectedVariant.specialPrice
                : product.selectedVariant.sellerPrice) *
                product.quantity;
          }
        }
      });
      store.checked = store.products.every((x: any) => x.checked === true);
      let totalPrice = store.products.reduce((a: any, item: any)=> item.checked ? a + item.totalPrice : a+0, 0);
      console.log(totalPrice, 'totalPrice');
      if(totalPrice != 0) {
        store.percentage = totalPrice > store.deliveryRules[0].minOrderValue ? 100 : ((totalPrice * 100) / store.deliveryRules[0].minOrderValue).toFixed(2);
      } else {
        store.percentage = 0;
      }
    });
  }

  checkedAllBox() {
    this.cardListArr.forEach((store: any) => {
      store.products.forEach((product: any) => {
        if (store.checked && product.checked) {
          this.allChecked = true;
        }
      });
    });
  }

  cartSlectedBox(name: any) {
    this.checkboxArr = this.checkboxArr.map((item: any) => {
      return {
        ...item,
        checked: item.value === name ? true : false,
      };
    });
    this.getCartList(name);
  }

  groceries(type: any) {
    this.selectedGroceies = type;
  }

  afterCheckout(e: any) {
    console.log(e);
    this.deliveryRulePage = true;
    this.orderStep = 2;
    this.deliveryResult = e.deliveryPageData;
    this.addressId = e.addressId;
  }

  paymentView(e: any) {
    console.log(e);
    this.totalCost = this.totalAmount + (+e);
    this.orderStep = 3;
  }

  open(content: any, data: any, type: any) {
    console.log(content);
    if (type === 'S') {
      this.selectedDeleteRecord = [data._id];
    } else {
      this.selectedDeleteRecord = data.map((item: any) => item._id);
    }
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  confirmDelete() {
    let params: any = {};
    params.id = this.selectedDeleteRecord;
    console.log(params);
    this.cartService.deleteCartProduct(params).subscribe(
      (res) => {
        this.commonService.showSuccessMessage('Product deleted successfully');
        this.commonService.sendMessage();
        this.modalService.dismissAll();
        this.allSelectedProduct = [];
        this.totalAmount = 0;
        this.getCartList();
      },
      (err) => {
        this.commonService.showErrorMessage();
        this.modalService.dismissAll();
      }
    );
  }

  customerDeliveryLocation() {
    let address: any = localStorage.getItem('selectedAddress'),
      userData: any = localStorage.getItem('userData'),
      addressObj = JSON.parse(address),
      userObj = JSON.parse(userData);

    let deliveryInfo: any = {
      Address: addressObj?.address,
      Type: 'Home',
      HouseNo: addressObj?.houseNo,
      BuildingName: addressObj?.building,
      Name: `${userObj?.firstname} ${userObj?.lastname}`,
      MobileNo: userObj?.phone,
      Zone: addressObj?.zone,
      Street: addressObj?.street,
      Country: addressObj?.country,
      State: addressObj?.state,
      Region: addressObj?.region,
      Locality: addressObj?.locality,
      Zipcode: '',
      AreaStreet: addressObj?.address,
      AdditionalDirection: '',
      coordinates: addressObj?.coordinates,
      location_type: 'SEARCH_LOCATION',
      Building: '',
    };
    if (addressObj._id) {
      deliveryInfo._id = addressObj._id;
    }

    this.deliveryLocation = deliveryInfo;
  }

  afterUpdateAddress(e: any) {
    this.customerDeliveryLocation();
  }

  afterAddNewAddress(e: any) {
    // this.customerDeliveryLocation();
  }

  addRemoveWishList(cartItem: any, sellerProductId: string): void {
    if (localStorage.getItem('accessToken')) {
    this.productService
      .addRemoveWishListItem({ sellerProductId }, cartItem.addedToWishlist)
      .subscribe(
        (res) => {
          this.commonService.showSuccessMessage(res.message);
          cartItem.addedToWishlist = cartItem.addedToWishlist ? false : true;
        },
        (err) => {
          this.commonService.showErrorMessage();
        }
      );
    } else {
      this.commonService.showErrorMessage('Only logged in users can add/remove products from the wishlist');
    }
  };
  cartStepChange(e: any) {
    this.orderStep = e;
  }
}
