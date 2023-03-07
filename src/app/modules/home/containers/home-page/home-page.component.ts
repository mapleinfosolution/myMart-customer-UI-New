import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import KeenSlider from 'keen-slider';
import { HomeService } from '../../service/home.service';
import { ProductService } from '../../../../modules/product/service/product.service';
import { CommonService } from '../../../../services/common.service';
declare function best_seller_slider(): any;
declare var $: any;
declare function hoverIndicator(elm:string, parent:any): any;

declare function recomanded_product_slider(): any;
declare function swiper_slider(elm:string, obj:object): any;
import { getLanguage } from '../../../../common/language/language';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement> =
    new ElementRef<HTMLElement>(document.getElementById('sliderRef') as HTMLCanvasElement);

  public baseUrl: string = environment.apiUrl+'/uploads/';
  slider: any = null;
  sliderInterval: any = null;
  recomandedProdInterval: any = null;
  bestSellerInterval: any = null;
  doResize: any = false;
  productList: Array<any> = [];
  banners: Array<any> = [];
  categoryList: Array<any> = [];
  trendingProductList: Array<any> = [];
  curParentCat: any = {};
  curSelectedCat: any = {};
  isTrendingSlider: any = false;
  isMegaCat: any = false;
  isMegaMenuHover: any = false;

  new_trending_slider: any = null;
  recomanded_prods_slider: any = null;
  best_seller_slider: any = null;

  /* Recommended product slider */
  recoProductSliderOpts = {
    gap: '10px',
    type: 'loop',
    perPage: 5,
    pagination: false,
    lazyLoad: 'nearby',
    grid: {
      rows: 2,
      gap: {
        row: '10px',
        col: '10px',
      }
    },
    breakpoints: {
      1030: {
        perPage: 4,
      },
      992: {
        perPage: 3,
      },
      700: {
        perPage: 2,
        arrows: false
      }
    }
  };

  /* highlight slider data */
  highlightSlider = [
    { img: 'assets/images/camera.png', title: 'Exclusive', sub_title: 'Camera' },
    { img: 'assets/images/laptop_bg.png', title: 'Exclusive', sub_title: 'Camera' },
    { img: 'assets/images/fruit_bg.png', title: 'Exclusive', sub_title: 'Camera' },
    { img: 'assets/images/game_bg.png', title: 'Exclusive', sub_title: 'Camera' },
    { img: 'assets/images/camera.png', title: 'Exclusive', sub_title: 'Camera' },
    { img: 'assets/images/laptop_bg.png', title: 'Exclusive', sub_title: 'Camera' },
    { img: 'assets/images/fruit_bg.png', title: 'Exclusive', sub_title: 'Camera' },
  ];

  highlightSliderConfig = {
    infinite: false,
    autoplay: false,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          variableWidth: true,
          arrows: false,
        }
      }
    ]
  };

  /* brand-carosual */
  brandsCarousel: Array<{ name: string, img: string, url: string }> = [];

  brandsCarouselConfig = {
    infinite: true,
    variableWidth: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          infinite: true,
          arrows: false,
          variableWidth: true,

        }
      }
    ]
  };

  selectedCategoryOnHover: any = {};
  popularCategoryList: Array<any> = [];
  trendingList: Array<any> = [];
  bestSellerList: Array<any> = [];
  recentlyPurchasedList: Array<any> = [];
  recomandedList: Array<any> = [];
  viewRecentlyPurchased: any = false;
  perRowView: any = 5;

  constructor(
    private router: Router,
    private homeService: HomeService,
    private productService: ProductService,
    private commonService: CommonService
  ) {
    // this.sliderOption.slidesPerView = utility.checkLargeScreen() ? 5 : 2;
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBanners();
    // this.loadTrendingProducts();
    this.loadProducts();
    this.loadBrands();
    this.getPopularCategory();
    // this.getTrending();
    this.loadBestSellerProduct();
    this.loadRecentlyPurchasedProduct();
    this.loadRecomandeProducts();
    this.loadNewAndTrendingProducts();

    if (localStorage.getItem('accessToken')) {
      this.viewRecentlyPurchased = true;
    }
  }

  ngAfterViewInit(): void {

    //add body class for home

    document.body.classList.add('home-page');

    setTimeout(() => {
       hoverIndicator ("#banner_shop_filter .btn", "#banner_shop_filter") as any;
    }, 300);
     


    this.recomandedProdInterval = setInterval(() => {
      if (document.querySelectorAll('.recomanded_prods_sec .splide__slide').length > 0) {
        clearInterval(this.recomandedProdInterval);
        recomanded_product_slider();
      }
    }, 500);
    this.bestSellerInterval = setInterval(() => {
      if (document.querySelectorAll('.best_seller_sec .splide__slide').length > 0) {
        clearInterval(this.bestSellerInterval);
        best_seller_slider();
      }
    }, 500);

    this.sliderInterval = setInterval(() => {
      if (document.querySelectorAll('#trending_slider .keen-slider__slide').length > 0) {
        clearInterval(this.sliderInterval);
        this.runTrendingSlider();
      }
    }, 500);

    const $this = this;
    $('.mega_menu_container').mouseleave(() => {
      $this.isMegaCat = false;
      $this.isMegaMenuHover = false;
      $this.close_mega_menu();
    });
    $('.mega_menu_container').mouseenter(() => {
      $this.isMegaCat = true;
      $this.isMegaMenuHover = true;
    });

    this.new_trending_slider = swiper_slider(".new_trending_sec", {
      slidesPerView: 'auto',
      spaceBetween: 10,
      navigation: {
        nextEl: ".new_trending_sec .swiper-button-next",
        prevEl: ".new_trending_sec .swiper-button-prev"
      },
      scrollbar: {
        el: ".new_trending_sec .swiper-scrollbar",
        hide: true,
      },
    });

    this.recomanded_prods_slider = swiper_slider('.recomanded_prods_slider', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      navigation: {
        nextEl: ".recomanded_prods_slider .swiper-button-next",
        prevEl: ".recomanded_prods_slider .swiper-button-prev"
      },
      scrollbar: {
        el: ".recomanded_prods_slider .swiper-scrollbar",
        hide: true,
      },
    })

    
    this.best_seller_slider = swiper_slider('.best_seller_slider', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      navigation: {
        nextEl: ".best_seller_slider .swiper-button-next",
        prevEl: ".best_seller_slider .swiper-button-prev"
      },
      scrollbar: {
        el: ".best_seller_slider .swiper-scrollbar",
        hide: true,
      },

    })



  }

  ngOnDestroy(): void {
    if (this.slider) {
      this.slider.destroy();
    }
    document.body.classList.remove('home-page');
  }

  loadBanners(): void {
    this.homeService.loadBanners({}).subscribe(res => {
      this.banners = res.data;
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

  loadCategories(): void {
    this.homeService.loadCategories({ language: 'english', category: 'Grocery' }).subscribe(res => {
      this.categoryList = res.data;
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

  loadBestSellerProduct() {
    this.loadProducts('bestSeller');
  }

  loadRecentlyPurchasedProduct() {
    this.loadProducts('recentlyPurchased');
  }

  loadRecomandeProducts() {
    this.loadProducts('recomandedProducts');
  }

  loadNewAndTrendingProducts() {
    this.loadProducts('newAndTrending');
  }

  loadProducts(typeName?:string): void {
    const query:any = {
      page: 1,
      perPage: 15,
      // price_min: 2,
      // price_max: 10,
      language: 'english',
      // search_key: '',
      // brandName: '',
      // category: '',
      // subcategory2: '',
      // subcategory3: '',
      // subcategory4: '',
      // subcategory5: '',
      // countryOrigin: '',
      // /
      minimum_distance: true,
      best_offers: false,
      longitude: '-73.97',
      latitude: '40.78'
    };
    if (typeName) {
      query[typeName]= true;   
   }
    this.productService.getProductList(query).subscribe((response: any) => {
      if (typeName) {
        if (typeName === 'newAndTrending') {
          this.trendingList = response.data[0].data;
        } else if (typeName === 'recomandedProducts') {
          this.recomandedList = response.data[0].data;
        } else if (typeName === 'recentlyPurchased') {
          this.recentlyPurchasedList = response.data[0].data;
        } else {
          this.bestSellerList = response.data[0].data;
        }
      } else {
       this.productList = response.data[0].data; 
      }
      
    }, ((error) => {
      this.commonService.showErrorMessage('API Error');
    }));
  }

  loadTrendingProducts(): void {
    const data = {
      category: 'Grocery',
      language: 'english'
    };
    this.homeService.getTrendingList(data).subscribe(res => {
      this.trendingProductList = res.data.docs;
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

  loadBrands(): void {
    const data = {
      category: 'Grocery',
      language: 'english'
    };
    this.homeService.loadBrands(data).subscribe(res => {
      this.brandsCarousel = res.data?.map((item: any) => {
        return {
          name: item.name,
          img: (item.brandImageId && item.brandImageId.originalURL) ? item.brandImageId.originalURL : '',
          url: '#'
        };
      });
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

  goToProductList(category: string): void {
    console.log(category);
    this.router.navigate(['/product/product-list'], { queryParams: { category } });
  }

  categoryMouseEnterli(a: any): void {
    if (this.curParentCat.categoryName !== a.categoryName) {
      this.categoryList.forEach((item) => {
        item.active = false;
      });
      a.active = !a.active;
      this.curParentCat = a;
    }
  }

  categoryMouseLeaveli(a: any): void {
    const $that = this;
    setTimeout(() => {
      if ($that.isMegaCat === false) {
        a.active = !a.active;
        this.curParentCat = {};
      }
    }, 600);
  }

  // category submenu
  categoryMouseEnter(category: any): void {
    this.selectedCategoryOnHover = category;
    if (category.children?.length) {
      this.curParentCat.children.forEach((item: any) => {
        item.active = false;
      });
      category.active = true;
      this.curSelectedCat = category;
      this.open_mega_menu();
      // console.log(this.curSelectedCat);s
    }
  }

  categoryMouseLeave(a: any): void {
    // a.active = false;
    this.curSelectedCat = {};
    setTimeout(() => {
      if (!this.isMegaMenuHover && !Object.keys(this.curSelectedCat).length) {
        this.close_mega_menu();
      }
    }, 400);
  }

  open_mega_menu(): void {
    this.isMegaCat = true;
  }

  close_mega_menu(): void {
    this.isMegaCat = false;
    this.curParentCat.children.forEach((item: any) => {
      item.active = false;
    });
  }

  getPopularCategory(): void {
    this.homeService.getProductList({}).subscribe((response: any) => {
      this.popularCategoryList = response.data;
    }, error => {
      this.commonService.showErrorMessage('API Error');
    });
  }

  // getTrending(): void {
  //   const payload = {
  //     page: 1,
  //     perPage: 10,
  //     longitude: localStorage.getItem('longitude') ? localStorage.getItem('longitude') : '',
  //     latitude: localStorage.getItem('latitude') ? localStorage.getItem('latitude') : ''
  //   };
  //   this.homeService.getTrendingList(payload)
  //     .subscribe((response: any) => {
  //       this.trendingList = response.data;
  //       console.log(this.trendingList);
  //     }, ((error) => {
  //       this.commonService.showErrorMessage('API Error');
  //     }));
  // }

  // category view more
  categoryViewMore(category: any): void {
    if (typeof category.view_more === 'undefined') {
      category.view_more = false;
    }
    category.view_more = !category.view_more;
  }


  runTrendingSlider(): void {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      slidesPerView: 2,
      loop: true,
      mode: 'free',
      spacing: 10,
      resetSlide: true,
      breakpoints: {
        '(min-width: 768px)': {
          slidesPerView: 3
        },
        '(min-width: 992px)': {
          slidesPerView: 4
        },
        '(min-width: 1100px)': {
          slidesPerView: 5
        }
      }
    });
  }

  getImageUrl(imgObj: any, key: string = 'mediumURL'): any {
    // console.log(imgObj, key);
    if (imgObj && imgObj[`${key}`]) {
      return this.commonService.getImageUrl(imgObj[`${key}`]);
    } else {
      return '';
    }
  }

  imageUrl(imagePath: string): any {
    if (imagePath) {
      return this.commonService.getImageUrl(imagePath);
    } else {
      return '';
    }
  }

  stringSlice(txt:any, cutnum:number){
    return txt.length > cutnum ? txt.substring(0, cutnum)+"..." : txt;
  }

  getLang(key:any) {
    return getLanguage(key);
  }

  seeAll(type:any) {
    this.router.navigate(['/product/product-list'], {
      queryParams: { category: 'Grocery', type },
    });
  }

  redirectToList(categoryName:any) {
    this.router.navigate(['/product/product-list'], {
      queryParams: { category: categoryName },
    });
  }

  loadMore() {
    this.perRowView = this.perRowView + 5;
  }
}
