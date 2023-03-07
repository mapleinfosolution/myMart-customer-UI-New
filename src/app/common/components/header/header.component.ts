import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CommonStoreService } from '../../../services/api/common-store.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';
import {
  ConfirmationPopupConfig,
  CommonMessage,
} from '../../../services/constant/constants';
import { HeaderAddressSelectionComponent } from '../header-address-selection/header-address-selection.component';
import { CommonService } from '../../../services/common.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../modules/cart/service/cart.service';
declare function hoverIndicator(elm: string, parent: any): any;
import { setSelectedLang } from '../../language/select-language';
import { getLanguage } from '../../language/language';
import { CommonApiService } from '../../../services/api/common-api.service';
import { HomeService } from 'src/app/modules/home/service/home.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loginData$: Observable<any> = this.commonStoreService.getLoginData();
  imageBasePath: string = environment.apiUrl + '/';
  cartSubscription: Subscription;
  loginData: any;
  popupConfig = ConfirmationPopupConfig;
  headerAddress: any;
  addressPopupOpts: NgbModalOptions = {
    centered: true,
    backdrop: 'static',
    keyboard: false,
    windowClass: 'modal-w-924',
  };
  private subs: Subscription[] = [];
  isDisabled = false;
  languageList: any = [];
  selectLanguage: any = '';
  wishListCount$ = this.commonStoreService.getWishlistCount();
  cartListCount$ = this.commonStoreService.getCartListCount();
  searchList: any = [];
  searchVal: any;
  public showSearch: boolean = false;

  constructor(
    private commonStoreService: CommonStoreService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private commonService: CommonService,
    // tslint:disable-next-line: variable-name
    private _location: Location,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private commonApiService: CommonApiService,
    private homeService: HomeService
  ) {
    window.addEventListener('storage', (event) => {
      if (event.key === 'selectedAddress') {
        this.setCurrentAddress(event.newValue);
      }
    });
    this.subs.push(
      this.commonStoreService.getUserHeaderAddress().subscribe((val: any) => {
        this.headerAddress = val;
      })
    );
    this.subs.push(
      this.loginData$.subscribe((val: any) => {
        this.loginData = val;
      })
    );
    this.selectLanguage = localStorage.getItem('selectedLanguage')
      ? localStorage.getItem('selectedLanguage')
      : 'en';
    this.cartSubscription = this.commonService
      .getMessage()
      .subscribe((message) => {
        this.commonStoreService.getCartList();
      });
  }

  ngOnInit(): void {
    this.languageList = [
      { name: 'English', value: 'en', code: 'EN' },
      { name: 'عربى', value: 'ar', code: 'AR' },
    ];
    this.commonStoreService.getCartList();
    this.disabledAddressClick();
    if (!localStorage.getItem('selectedAddress')) {
      this.addressSelection();
    }
    this.headerAddress = JSON.parse(
      localStorage.getItem('selectedAddress') || '""'
    );
    this.searchVal = localStorage.getItem('searchStr')
      ? localStorage.getItem('searchStr')
      : '';
  }

  disabledAddressClick() {
    this._location.onUrlChange((url: string) => {
      if (url === '/cart') {
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      hoverIndicator('#header_shop_filter .btn', '#header_shop_filter') as any;
    }, 300);
  }

  addressSelection(): void {
    const modalRef = this.modalService.open(
      HeaderAddressSelectionComponent,
      this.addressPopupOpts
    );
    modalRef.componentInstance.data = localStorage.getItem('selectedAddress')
      ? JSON.parse(localStorage.getItem('selectedAddress') || '""')
      : {};
    modalRef.result.then((result) => {
      if (result && result.isData) {
        this.headerAddress = result;
        this.setCurrentAddress(result);
        this.commonService.sendMessage({ address: result.coordinates });
        localStorage.setItem('selectedAddress', JSON.stringify(result));
        localStorage.setItem('longitude', result.coordinates[0]);
        localStorage.setItem('latitude', result.coordinates[1]);
      }
    });
  }

  setCurrentAddress(address: any): void {
    this.commonStoreService.setUserHeaderAddress(address);
  }

  showHeaderAddress(): string {
    let address = '';
    if (this.headerAddress && Object.keys(this.headerAddress).length) {
      address = this.headerAddress.typedAddress || this.headerAddress.address;
    }
    return address;
  }

  backLink(): void {
    this._location.back();
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
    this.cartSubscription.unsubscribe();
  }

  // getCartList() {
  //   let params: any = {};
  //   if (!localStorage.getItem('accessToken')) {
  //     params.sessionId = localStorage.getItem('uniqueId');
  //   }
  //   params.category = 'Grocery';
  //   params.fastDelivery = false;
  //   params.freeDelivery = false;
  //   // params.deliveryType = this.selectedGroceies;
  //   this.cartService.getCartList(params).subscribe(
  //     (res: any) => {
  //       this.commonStoreService.setCartListCount(res.count.totalCart);
  //       let elm: any = document.getElementById('header-cart-badge');
  //       if (elm) {
  //         elm.classList.add('zoom-in');
  //         setTimeout(() => {
  //           elm.classList.remove('zoom-in');
  //         }, 3000);
  //       }

  //     },
  //     (err) => { }
  //   );
  // }

  getSeachValueByString(val: any) {
    let searchValue = val.target.value.trim();
    this.searchVal = val.target.value.trim();
    localStorage.setItem('searchStr', searchValue);
    if (searchValue.length) {
      this.homeService.getSearchByString(searchValue).subscribe(
        (res: any) => {
          console.log(res.data, searchValue);
          this.searchList = res.data;
        },
        (error) => {
          this.commonService.showErrorMessage('API Error');
        }
      );
    }
  }

  searchBtn() {
    let searchValue = this.searchVal;
    localStorage.setItem('searchStr', searchValue);
    this.commonService.sendMessage({ changeSearchValue: true });
    this.router.navigate(['/product/product-list'], {
      queryParams: { category: 'Grocery' },
    });
  }

  logout() {
    this.authenticationService.logout();
  }

  changeLang(val: any) {
    this.selectLanguage = val;
    localStorage.setItem('selectedLanguage', val);
    setSelectedLang(val);
  }

  getLang(key: any) {
    return getLanguage(key);
  }

  redirectView(val: any) {
    if (val.type === 'product') {
      let categoryName = val.subtitle.split(' ').slice(1).join(' ');
      this.router.navigate(['/product/product-list'], {
        queryParams: { category: categoryName },
      });
    } else if (val.type === 'brand') {
      this.router.navigate(['/product/product-list'], {
        queryParams: { category: 'Grocery' },
      });
    } else if (val.type === 'category') {
      this.router.navigate(['/product/product-list'], {
        queryParams: { category: val.title },
      });
      localStorage.setItem('searchStr', '');
    } else {
      // redirect to store page
    }
    this.searchList = [];
    this.commonService.sendMessage({ changeSearchValue: true });
  }

  getImageUrl(imgStr: string, key: string = 'thumbURL'): any {
    if (imgStr) {
      return this.commonService.getImageUrl1(imgStr);
    } else {
      return '';
    }
  }

  wishListNavigation(): void {
    if (this.loginData) {
      this.router.navigateByUrl('/my-account/wishlist');
    }
  }

  back(): void {
    this._location.back();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  showHideSearch() :void {
    this.showSearch = !this.showSearch;
  }

  clearSearch(): void {
    localStorage.removeItem('searchStr');
    this.searchVal = '';
  }
}
