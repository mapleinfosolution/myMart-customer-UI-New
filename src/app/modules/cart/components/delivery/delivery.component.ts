import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { CartService } from '../../service/cart.service';
import { AddEditAddressComponent } from '../../../myaccount/components/add-edit-address/add-edit-address.component';
import { Content } from '@angular/compiler/src/render3/r3_ast';
declare function swiper_slider(elm: string, obj: object): any;

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;
  @Input() totalAmount: any;
  @Input() totalSelectedProduct: any;
  @Input() deliveryResult: any;
  @Input() addressId: any;
  @Input() deliveryInformation: any;
  @Input() pickupType: any;
  @Input() deliveryRulePage: any;
  @Output() paymentEmitor: EventEmitter<any>;
  deliveryProuctList: any = [];
  placeOrderId: any;
  deliveryLocation: any = {};
  today: number = Date.now();
  selectedDeliveryRule: any = {};
  deliveryCost: any = 0;
  deliverySlotArr: any = [];
  public selectedSlot: any = [];
  selectedDeliverySlotDateArr: any = [];
  selectedDeliverySlots: any = {};
  selectedTimeRange: any = '';
  selectedDateSlot: any = '';
  nonDeliveryProductCost: any = 0;

  timeNavcontainerW:any  = null;
  timeNavCurIndex:any  = 0;
  timeNavViewNum:any  = 3;
  timeNavmaxNum:any  = null;
  timeNavSwipeValue:any = 0;
  timeNavItemWidth:any = 250;
  timeNavItemspace:any = 0;
  delivery_opt_slider: any;


  constructor(
    private commonService: CommonService,
    private cartService: CartService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.paymentEmitor = new EventEmitter();
  }

  ngOnInit(): void {
    // console.log(this.deliveryInformation, this.deliveryResult);
    this.getDeliveryData();
    if (this.deliveryResult.adminDeliveryRules) {
      this.deliverySlots();
    }
    if (localStorage.getItem('accessToken')) {
      this.customerDeliveryLocation();
    }

    let removeNonDeliveryProductCost = 0;
    console.log(this.deliveryProuctList, 'this.deliveryProuctList');
    this.deliveryProuctList && this.deliveryProuctList.length && this.deliveryProuctList.forEach((element: any) => {
      if (!element.deliveryRules.length) {
        removeNonDeliveryProductCost += element.totalPrice;
      }
    })
    this.nonDeliveryProductCost = removeNonDeliveryProductCost ? removeNonDeliveryProductCost : 0;

    
  }

  ngAfterViewInit() {
    if (this.deliveryResult.adminDeliveryRules) {
      this.modalService.open(this.content, {
        size: 'xl',
        backdrop: 'static',
        keyboard: false,
      });
    }
    this.timeNavResize();
    let $that = this;
    window.addEventListener('resize', function(event) {
      $that.timeNavResize();
    }, true);

    document.body.classList.add('check-delivery-page');


    setTimeout(() => {
      //cart item slider
      this.delivery_opt_slider = swiper_slider('.delivery_opt_slider', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        navigation: {
          nextEl: '.delivery_opt_slider .swiper-button-next',
          prevEl: '.delivery_opt_slider .swiper-button-prev',
        },
        scrollbar: {
          el: '.delivery_opt_slider .swiper-scrollbar',
          hide: true,
        },
      });
    }, 800);


  }

  ngOnDestroy(){
    document.body.classList.remove('check-delivery-page');
  }

  closeModal() {
    
    if (this.selectedDateSlot !== '' && this.selectedTimeRange !== '') {
      this.modalService.dismissAll();
      let slotObj = {
        date: this.selectedDateSlot,
        time: this.selectedTimeRange,
        selectedSlotId: this.selectedDeliverySlots._id,
      };
      this.selectedSlot = this.deliverySlotArr.filter((e: any)=> e.isChecked != false);
      this.selectedDeliveryRule.deliveryFee = this.selectedSlot[0].deliveryCharge;
      localStorage.setItem('slotObj', JSON.stringify(slotObj));
    }
  }

  updateAmount() {  // remove price for no delivery rule store

  }

  getDeliveryData() {
    this.deliveryProuctList = this.deliveryResult.data;
    this.placeOrderId = this.deliveryResult.draftOrderId;
    this.deliveryProuctList.forEach((element: any) => {
      if (element.deliveryRules && element.deliveryRules.length) {
        // element.deliveryRules.forEach((rule: any, index: any) => {
        //   rule.checked = index === 0 ? true : false;
        //   this.selectedDeliveryRule = index === 0 ? rule : {};
        // });
        element.deliveryRules[0].checked = true;
        // this.selectedDeliveryRule.deliveryFee += element.deliveryRules[0].deliveryFee != null ? +element.deliveryRules[0].deliveryFee : 0;
      } else {
        // this.paymentEmitor.emit('15');
      }
      if (element.deliveryRules && element.deliveryRules.length) {
        element.deliveryRules[0].checked = true;
        this.selectedDeliveryRule = element.deliveryRules[0];
      }
    });
  }

  deliveryRuleChange(rule: any, index: number) {
    this.selectedDeliveryRule = rule;
    if (this.deliveryProuctList[index].deliveryRules && this.deliveryProuctList[index].deliveryRules.length) {
      for(let data of this.deliveryProuctList[index].deliveryRules) {
        if(data.ruleName === rule.ruleName) {
          data.checked = true;
        } else {
          data.checked = false;
        }
      }
    }

  }

  getImageUrl(imgObj: any, key: string = 'thumbURL'): any {
    if (imgObj && imgObj[`${key}`]) {
      return this.commonService.getImageUrl(imgObj[`${key}`]);
    } else {
      return '';
    }
  }

  paymentView(e: any) {
    // console.log(e);
    this.deliveryCost = e;
    this.placeOrder('2');
  }

  placeOrder(num: any) {
    if (num === '1') {
      let amount = ((this.selectedDeliveryRule && this.selectedDeliveryRule.deliveryFee ? this.selectedDeliveryRule.deliveryFee : 0) - (this.nonDeliveryProductCost ? this.nonDeliveryProductCost : 0));
      this.paymentEmitor.emit(amount);
    } else {
      let amount = this.deliveryCost;
      this.paymentEmitor.emit(amount);
    }
    let deliveryRuleObj = {
      storeId: this.selectedDeliveryRule.storeId,
      deliveryRuleId: this.selectedDeliveryRule._id,
    };
    localStorage.setItem('deliveryRuleObj', JSON.stringify(deliveryRuleObj));
  }

  customerDeliveryLocation() {
    this.deliveryLocation = this.deliveryInformation;
  }

  deliverySlots() {
    let params: any = {};
    let lat = localStorage.getItem('latitude');
    let long = localStorage.getItem('longitude');
    params.latitude = lat ? Number(lat) : null;
    params.longitude = long ? Number(long) : null;
    this.cartService.getDeliverySlots(params).subscribe(
      (res: any) => {
        // console.log(res);
        this.deliverySlotArr = res.data;
        this.selectedDeliverySlots = res.data[0];
        this.selectedDeliverySlotDateArr = res.data[0].slots;
        this.deliverySlotArr =
          this.deliverySlotArr &&
          this.deliverySlotArr.length &&
          this.deliverySlotArr.map((slot: any, index: any) => {
            return {
              ...slot,
              isChecked: index === 0 ? true : false,
            };
          });
      },
      (err) => {
        this.commonService.showErrorMessage();
      }
    );
  }

  timeSlotSelect(time: any) {
    this.selectedDeliverySlots = time;
    this.selectedDeliverySlotDateArr = time.slots;
    this.deliverySlotArr.forEach((item: any) => {
      if (item.timeSlot === time.timeSlot) {
        item.isChecked = true;
      } else {
        item.isChecked = false;
      }
    });
  }

  selectTimeRange(range: any, slot: any) {
    console.log(range, slot, 'selectTimeRange', this.deliverySlotArr);
    this.selectedTimeRange = '';
    this.selectedDateSlot = '';
    this.selectedTimeRange = range;
    this.selectedDateSlot = slot.date;
  }

  // timeslot next and prev
  timeNavNext(){
    //alert("next");
    if(this.timeNavCurIndex < this.timeNavmaxNum - 1){
      this.timeNavCurIndex++;
      this.timeNavSwipeValue = -((this.timeNavItemWidth * this.timeNavViewNum) * this.timeNavCurIndex);
    }
    
  }
  timeNavPrev(){
    //alert("prev");
    if(this.timeNavCurIndex > 0){
      this.timeNavCurIndex--;
      this.timeNavSwipeValue = -((this.timeNavItemWidth * this.timeNavViewNum) * this.timeNavCurIndex);
    }
  }

  timeNavColumWidth(){
    setTimeout(() => {
      let p_width_elm = document.querySelectorAll('.delivery-time-lists')[0] as HTMLElement | null;
      
      this.timeNavmaxNum = Math.ceil(this.selectedDeliverySlotDateArr.length / this.timeNavViewNum);
      
      if(p_width_elm != null){
        let styles:any = getComputedStyle(p_width_elm);
        this.timeNavcontainerW = p_width_elm.offsetWidth - (parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight));
        this.timeNavItemWidth = (this.timeNavcontainerW / this.timeNavViewNum) - this.timeNavItemspace;
      }
      
    }, 200);
    
  }


  timeNavResize(){
    if(screen.width < 1200 && screen.width > 1000){
      this.timeNavViewNum = 2;
      
      
    } else 
    if(screen.width < 1000 && screen.width > 576){
      this.timeNavViewNum = 1;
      
    }
    if(screen.width < 576){
      this.timeNavViewNum = 1;
      
    }

    this.timeNavColumWidth();
    this.timeNavSwipeValue = -((this.timeNavItemWidth * this.timeNavViewNum) * this.timeNavCurIndex);
    
  }

  selectedRule(rule: any) {
    return rule.filter((e: any) => e.checked == true)[0];
  }

  selectedDeliveryTotalCost() {
    let totalCost = 0;
    this.deliveryProuctList.forEach((element: any) => {
      if (element.deliveryRules && element.deliveryRules.length) {
        element.deliveryRules.forEach((rule: any) => {
          if(rule.checked) {
            totalCost += rule.deliveryFee != null ? +rule.deliveryFee : 0;
          }
        });
      } 
    });
    return totalCost;
  }



}
