import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from '@angular-slider/ngx-slider';
import { environment } from 'src/environments/environment';
import { ProductListingFilter } from '../../models/product.models';
import {
  DefaultProductFilter,
  DefaultPriceRange,
} from '../../models/product.constant';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { HeaderAddressSelectionComponent } from 'src/app/common/components/header-address-selection/header-address-selection.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CommonStoreService } from 'src/app/services/api/common-store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

@HostListener('window:resize', ['$event'])
export class ProductListComponent implements OnInit {

  public innerWidth: any = 0;
  numOfItemsAside: any = 5;
  brandFilterList_len: any = this.numOfItemsAside;
  countryFilterList_len: any = this.numOfItemsAside;
  attributeFilterList_len: any = this.numOfItemsAside;
  productList: Array<any> = [];
  filters: ProductListingFilter = DefaultProductFilter;
  brandFilterList: Array<any> = [];
  countryFilterList: Array<any> = [];
  categoryFilterList: any = [];
  attributeFilterList: Array<any> = [];
  categoryName = '';
  imageBasePath: string = environment.apiUrl + '/uploads/';
  rangeOptions: Options = DefaultPriceRange;
  selectedFilter: Array<any> = [];
  filterData: any;
  selectedFilterBrands: Array<any> = [];
  selectedFilterCountry: Array<any> = [];
  selectedFilterAttribute: Array<any> = [];
  selectedFilterCategory: Array<any> = [];
  selectedSearchStr: any = '';
  selectedSliderValue: any = {};
  totalCount: any = 0;
  defaultFilters: any = {};
  selectedCategory: any;
  subscription: any;
  sortItemsArr: Array<any> = [];
  selectedSortItem: any;
  listType: any = 'bestOffer';
  typeName: any;
  searchString: any = '';
  public showFilter: boolean= false;

  addressPopupOpts: NgbModalOptions = {
    centered: true,
    backdrop: 'static',
    keyboard: false,
    windowClass: 'modal-w-924',
  };

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private modalService: NgbModal,
    private commonStoreService: CommonStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    
    this.innerWidth = window.innerWidth;
    this.sortItemsArr = [
      { name: 'Name: Ascending', value: 'a_to_z' },
      { name: 'Name: Decreasing', value: 'z_to_a' },
      { name: 'Price: Low to High', value: 'minimum_price' },
      { name: 'Price High to Low', value: 'maximum_price' },
    ];
    this.subscription = Subscription;
    this.categoryName = this.activatedRoute.snapshot.queryParams.category;
    this.typeName = this.activatedRoute.snapshot.queryParams.type;
    this.filters.category = this.categoryName;
    this.filters.shop_by = 'best_offers';
    this.filters.searchKey = localStorage.getItem('searchStr');
    this.defaultFilters = { ...this.filters };
    this.loadProducts(this.filters);
    this.fetchFilterData();
    this.selectedSliderValue = {
      minValue: this.filters.price_min,
      maxValue: this.filters.price_max,
    };
    this.subscription = this.commonService.getMessage().subscribe((result) => {
      if (result && result.text.address) {
        this.filters.latitude = result.text.address[1];
        this.filters.longitude = result.text.address[0];
        this.loadProducts(this.filters);
      }
      if (result.text.changeSearchValue) {
        this.filters.searchKey = localStorage.getItem('searchStr');
        this.searchString = localStorage.getItem('searchStr');
        this.typeName = this.activatedRoute.snapshot.queryParams.type;
        this.filters.shop_by = 'best_offers';
        setTimeout(() => {
          this.categoryName = this.activatedRoute.snapshot.queryParams.category;
          this.filters.category = this.categoryName;
          this.loadProducts(this.filters);
          this.fetchFilterData();
          this.selectedFilter = this.selectedFilter.map((obj) =>
            obj.type === 'category'
              ? {
                  name: this.categoryName,
                  id: this.categoryName,
                  type: 'category',
                }
              : obj
          );
        }, 100);
      }
    });
    this.selectedFilter.push({
      name: this.categoryName,
      id: this.categoryName,
      type: 'category',
    });
    this.searchString = localStorage.getItem('searchStr');
  }

  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  sortProductList(data: any) {
    this.selectedSortItem = data.name;
    this.filters.sort = data.value;
    this.loadProducts(this.filters);
  }

  selectShopBy(e: any, type: any) {
    console.log('00');
    if (type === 'fastDelivery') {
      console.log('0');
      if (
        !localStorage.getItem('longitude') &&
        !localStorage.getItem('latitude')
      ) {
        console.log('1');
        const modalRef = this.modalService.open(
          HeaderAddressSelectionComponent,
          this.addressPopupOpts
        );
        modalRef.componentInstance.data = {};
        modalRef.result.then((result) => {
          if (result && result.isData) {
            console.log('2');
            this.commonStoreService.setUserHeaderAddress(result);
            this.commonService.sendMessage({ address: result.coordinates });
            localStorage.setItem('selectedAddress', JSON.stringify(result));
            localStorage.setItem('longitude', result.coordinates[0]);
            localStorage.setItem('latitude', result.coordinates[1]);
            this.listType = 'fastDelivery';
            this.filters.shop_by = 'fast_delivery';
          } else {
            console.log('3');
            this.listType = 'bestOffer';
            this.filters.shop_by = 'best_offers';
          }
        });
      } else {
        console.log('4');
        this.listType = 'fastDelivery';
        this.filters.shop_by = 'fast_delivery';
      }
    } else {
      console.log('5');
      this.filters.shop_by = 'best_offers';
    }
    let lat = localStorage.getItem('latitude');
    let long = localStorage.getItem('longitude');
    this.filters.longitude = Number(long);
    this.filters.latitude = Number(lat);
    console.log(this.filters);
    this.loadProducts({ ...this.filters });
  }

  addToCartEvent(e: any) {
    console.log(e);
    let product = e.product;
    product.cartQty = 0;
    if (product.cartQuantity.length) {
      product.cartQuantity.forEach((qty: any) => {
        product.cartQty += qty.quantity;
      });
    } else {
      product.cartQty = 1;
    }
  }

  loadProducts(query: any): void {
    let sessionId = localStorage.getItem('uniqueId');

    if (this.typeName) {
      query[this.typeName] = true;
    } else {
      query = { ...this.filters, shop_by: this.filters.shop_by };
    }
    let params = { ...query, sessionId };
    this.productService.getProductList(params).subscribe(
      (res) => {
        this.productList = [...res.data[0].data];
        this.productList.forEach((product: any) => {
          product.cartQty = 0;
          if (product.cartQuantity.length) {
            product.cartQuantity.forEach((qty: any) => {
              product.cartQty += qty.quantity;
            });
          }
        });

        this.totalCount =
          res.data[0].data && res.data[0].data.length
            ? res.data[0].metadata[0].total
            : 0;
      },
      (err) => {}
    );
  }

  fetchFilterData(): void {
    let params: any = {};
    {
      (params.language = 'english'),
        (params.category = this.categoryName),
        (params.attributes = []),
        (params.brands = []),
        (params.country = []),
        (params.price_max = this.filters.price_max),
        (params.price_min = this.filters.price_min);
      params.searchKey = localStorage.getItem('searchStr');
    }
    this.productService.getFilter(params).subscribe(
      (res: any) => {
        console.log(res.data);
        let filterData = res.data;
        this.brandFilterList = filterData.brand;
        this.brandFilterList =
          this.brandFilterList &&
          this.brandFilterList.map((brand) => {
            return {
              ...brand,
              checked: false,
            };
          });
        this.countryFilterList = filterData.country;
        this.countryFilterList =
          this.countryFilterList &&
          this.countryFilterList.map((country) => {
            return {
              ...country,
              checked: false,
            };
          });
        this.categoryFilterList = filterData.categories;
        this.attributeFilterList = filterData.attributes;
        this.attributeFilterList =
          this.attributeFilterList &&
          this.attributeFilterList.map((attribute) => {
            attribute.value =
              attribute.value &&
              attribute.value.length &&
              attribute.value.map((val: any) => {
                return {
                  name: val,
                  checked: false,
                };
              });
            return {
              ...attribute,
            };
          });
      },
      (err) => {}
    );
  }

  categorySelect(categoryData: any): void {
    console.log(categoryData);
    this.filters.category = categoryData.categoryName;
    this.categoryName = categoryData.categoryName;
    this.addOrReplace(this.selectedFilter, {
      name: this.categoryName,
      id: this.categoryName,
      type: 'category',
    });
    this.resetPagination();
    this.loadProducts(this.filters);
    this.fetchFilterData();

    const queryParams = { category: this.categoryName };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }

  resetPagination(): void {
    this.filters.page = 1;
  }

  checkFilter(e: any, data: any, type: string) {
    console.log(e.target.checked, data, type);
    if (type === 'brand') {
      if (e.target.checked) {
        this.selectedFilterBrands = [...this.selectedFilterBrands, data._id];
        this.selectedFilter = [
          ...this.selectedFilter,
          { name: data.name, id: data._id, type },
        ];
      } else {
        this.selectedFilterBrands = this.selectedFilterBrands.filter(
          (item: any) => item !== data._id
        );
        this.selectedFilter = this.selectedFilter.filter(
          (item: any) => item.id !== data._id
        );
      }
      this.filters.brandName = this.selectedFilterBrands;
      this.loadProducts(this.filters);
    } else if (type === 'country') {
      if (e.target.checked) {
        this.selectedFilterCountry = [
          ...this.selectedFilterCountry,
          data.country,
        ];
        this.selectedFilter = [
          ...this.selectedFilter,
          { name: data.country, id: data.country, type },
        ];
      } else {
        this.selectedFilterCountry = this.selectedFilterCountry.filter(
          (item: any) => item !== data.country
        );
        this.selectedFilter = this.selectedFilter.filter(
          (item: any) => item.name !== data.country
        );
      }
      // const query = this.filters;
      this.filters.countryOrigin = this.selectedFilterCountry;
      this.loadProducts(this.filters);
    } else if (type === 'attribute') {
      if (e.target.checked) {
        this.selectedFilterAttribute = [
          ...this.selectedFilterAttribute,
          data.name,
        ];
        this.selectedFilter = [
          ...this.selectedFilter,
          { name: data.name, id: data.name, type },
        ];
      } else {
        this.selectedFilterAttribute = this.selectedFilterAttribute.filter(
          (item: any) => item !== data.name
        );
        this.selectedFilter = this.selectedFilter.filter(
          (item: any) => item.name !== data.name
        );
      }
      console.log(this.selectedFilterAttribute, data.name);
      this.filters.attributes = this.selectedFilterAttribute;
      this.loadProducts(this.filters);
    }
  }

  // searchProduct() {
  //   this.filters.search_key = this.selectedSearchStr.trim();
  //   this.loadProducts(this.filters);
  // }

  sliderChange(event?: any): void {
    if (
      this.selectedSliderValue.minValue !== this.filters.price_min ||
      this.selectedSliderValue.maxValue !== this.filters.price_max
    ) {
      this.selectedSliderValue = {
        minValue: this.filters.price_min,
        maxValue: this.filters.price_max,
      };
      this.addOrReplace(this.selectedFilter, {
        minValue: this.filters.price_min,
        maxValue: this.filters.price_max,
        id: 'price',
        type: 'price',
      });
      this.loadProducts(this.filters);
    }
  }

  addOrReplace(array: any, item: any) {
    const i = array.findIndex((prc: any) => prc.type === item.type);
    if (i > -1) array[i] = item;
    else array.push(item);
  }

  updateRangeVal(event: any): void {
    this.filters.price_min = event.target.value;
    this.sliderChange();
  }

  updateRangeHighVal(event: any): void {
    this.filters.price_max = event.target.value;
    this.sliderChange();
  }

  paginationChange(event: any): any {
    this.filters.page = event;
    this.loadProducts(this.filters);
  }

  removeSelectedFilter(selectedValue: any) {
    this.selectedFilter = this.selectedFilter.filter(
      (item: any) => item.id !== selectedValue.id
    );
    if (selectedValue.type === 'brand') {
      // console.log(this.selectedFilterBrands);
      this.selectedFilterBrands = this.selectedFilterBrands.filter(
        (item: any) => item !== selectedValue.id
      );
      this.filters.brandName = this.selectedFilterBrands;
      this.brandFilterList.forEach((brand) => {
        if (brand._id === selectedValue.id) {
          brand.checked = false;
        }
      });
    } else if (selectedValue.type === 'country') {
      this.selectedFilterCountry = this.selectedFilterCountry.filter(
        (item: any) => item !== selectedValue.name
      );
      this.filters.countryOrigin = this.selectedFilterCountry;
      this.countryFilterList.forEach((country) => {
        if (country.country === selectedValue.name) {
          country.checked = false;
        }
      });
    } else if (selectedValue.type === 'attribute') {
      this.selectedFilterAttribute = this.selectedFilterAttribute.filter(
        (item: any) => item !== selectedValue.name
      );
      this.filters.attributes = this.selectedFilterAttribute;
      this.attributeFilterList.forEach((attribute) => {
        attribute.value.forEach((val: any) => {
          if (val.name === selectedValue.name) {
            val.checked = false;
          }
        });
      });
    } else if (selectedValue.type === 'price') {
      this.filters.price_max = this.defaultFilters.price_max;
      this.filters.price_min = this.defaultFilters.price_min;
    } else if (selectedValue.type === 'category') {
      this.filters.category = 'Grocery';
      this.categoryName = 'Grocery';
      this.fetchFilterData();
    }
    this.loadProducts(this.filters);
  }

  removeSelectedAllFilter() {
    this.selectedFilter.splice(1);
    this.selectedFilterBrands = [];
    this.selectedFilterCountry = [];
    this.selectedFilterAttribute = [];
    // this.selectedFilterCategory = [];
    this.filters = { ...this.defaultFilters };
    this.brandFilterList.forEach((brand) => (brand.checked = false));
    this.countryFilterList.forEach((country) => (country.checked = false));
    this.attributeFilterList.forEach((attribute) => {
      attribute.value.forEach((val: any) => {
        val.checked = false;
      });
    });
    this.loadProducts(this.filters);
    this.fetchFilterData();
  }

  //brandFilterMore
  brandFilterMore() {
    this.brandFilterList_len =
      this.brandFilterList_len > this.numOfItemsAside
        ? this.numOfItemsAside
        : this.brandFilterList.length;
  }

  //countryFilterMore()
  countryFilterMore() {
    this.countryFilterList_len =
      this.countryFilterList_len > this.numOfItemsAside
        ? this.numOfItemsAside
        : this.countryFilterList.length;
  }

  //attributeFilterMore()
  attributeFilterMore() {
    this.attributeFilterList_len =
      this.attributeFilterList_len > this.numOfItemsAside
        ? this.numOfItemsAside
        : this.attributeFilterList.length;
  }

  //category visible
  // makeChildVisible(event: any) {
  //   event.target.classList.toggle('open');
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
