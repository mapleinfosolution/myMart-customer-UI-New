import { Component, OnInit, ViewChild, Output, EventEmitter, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { CommonApiService } from 'src/app/services/api/common-api.service';
import { CommonStoreService } from 'src/app/services/api/common-store.service';
import { Observable, Subscription } from 'rxjs';
import { MyaccountService } from 'src/app/modules/myaccount/service/myaccount.service';
declare function hoverIndicator(elm: string, parent: any): any;

@Component({
  selector: 'app-address-selection',
  templateUrl: './address-selection.component.html',
  styleUrls: ['./address-selection.component.scss']
})
export class AddressSelectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() presentAddress: any;
  @ViewChild('addresstext') addresstext: any;
  @Output() closeEvent = new EventEmitter<any>();
  loginData$: Observable<any> = this.commonStoreService.getLoginData();
  headerAddressOpt: any = 'via_map';
  markerDraggble = true;
  lat: any = 25.2854473;
  lng: any = 51.53103979999999;
  addressDetails!: FormGroup;
  autocomplete: any;
  searchDebounceTimer: any;
  private subs: Subscription[] = [];
  loginData: any;
  map: any;
  addressList: any = [];
  checkedAddress: any;
  constructor(
    private commonService: CommonService,
    private commonApiService: CommonApiService,
    private fb: FormBuilder,
    private commonStoreService: CommonStoreService,
    private myaccountService: MyaccountService
  ) { }

  get address(): any {
    return (this.addressDetails as FormGroup).controls;
  }

  ngOnInit(): void {
    this.subs.push(
      this.loginData$.subscribe((val: any) => {
        this.loginData = val;
        if (this.loginData) {
          this.getAddressList();
        }
      })
    );
    this.createLocationForm();
    if (this.presentAddress) {
      if (this.presentAddress.coordinates && this.presentAddress.coordinates.length) {
        this.lat = this.presentAddress.coordinates[1];
        this.lng = this.presentAddress.coordinates[0];
      }
      this.setAddress(this.presentAddress);
    }
  }

  updateAddressOpt(event: any, type: any): void {
    event.preventDefault();
    this.headerAddressOpt = type;
    this.addressDetails.reset();
    if (type === 'via_blue_plate') {
      this.markerDraggble = false;
      this.addressDetails.get('locationType')?.patchValue('BLUE_PLATE');
    } else if (type === 'via_save_address') {
      this.markerDraggble = false;
      this.addressDetails.get('locationType')?.patchValue('via_save_address');
    } else {
      this.markerDraggble = true;
      this.addressDetails.reset();
      this.addressDetails.get('locationType')?.patchValue('SEARCH_LOCATION');
    }
  }

  closePopup(data: any): void {
    this.closeEvent.emit(data);
  }

  cancelClick(): void {
    if (localStorage.getItem('selectedAddress')) {
      this.closePopup({ isData: false });
    }
  }

  createLocationForm(): void {
    this.addressDetails = this.fb.group({
      zone: [''], // 56
      street: [''], // 1148
      building: [''], // 17
      locationType: ['SEARCH_LOCATION'], // 'BLUE_PLATE' or 'SEARCH_LOCATION', or 'GET_LOCATION'
      address: [''],
      coordinates: [],
      typedAddress: [''],
      country: [''],
      locality: [''],
      region: [''],
      state: ['']
    });
  }

  debounceBluePlate(): void {
    const timeout = 2000;
    clearTimeout(this.searchDebounceTimer);
    if (!(this.address.zone.value && this.address.street.value && this.address.building.value)) { return; }
    this.searchDebounceTimer = setTimeout(() => {
      this.searchBluePlate();
      clearTimeout(this.searchDebounceTimer);
    }, timeout);
  }

  searchBluePlate(): void {
    const data = { zone: this.address.zone.value, street: this.address.street.value, building: this.address.building.value };
    this.commonApiService.getLatLon(data).subscribe((res: any) => {
      if (res && res.features && res.features[0] && res.features[0].geometry && res.features[0].geometry.x && res.features[0].geometry.y) {
        this.getAddressByLatLng({ lat: res.features[0].geometry.y, lng: res.features[0].geometry.x });
      } else {
        this.commonService.showErrorMessage('Not able to find the location');
      }
    }, (err: any) => {
      this.commonService.showErrorMessage('Not able to find the location');
    });
  }

  getCurrentLocation(): any {
    this.addressDetails.get('locationType')?.patchValue('GET_LOCATION');
    this.markerDraggble = false;
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.lat = lat;
        this.lng = lng;
        this.getAddressByLatLng({ lat: this.lat, lng: this.lng });
      } else {
        this.commonService.showErrorMessage('Unable to fetch current location');
      }
    }, err => {
      this.commonService.showErrorMessage('Unable to fetch current location');
    });
  }

  getAddressByLatLng(params: any): void {
    this.commonApiService.getLocationByCoordinate(params).subscribe((res: any) => {
      const place = res.results[0];
      if (place) {
        const address = this.formatAutoCompleteAddress(place, 'latLon');
        this.setAddress(address);
      }
    }, (err: any) => {
      this.commonService.hideLoading();
    });
  }

  setAddress(address: any): void {
    this.addressDetails.get('country')?.patchValue(address.country);
    this.addressDetails.get('locality')?.patchValue(address.locality);
    this.addressDetails.get('region')?.patchValue(address.region);
    this.addressDetails.get('state')?.patchValue(address.state);
    this.addressDetails.get('coordinates')?.patchValue(address.coordinates);
    this.addressDetails.get('address')?.patchValue(address.address);
    if (this.addressDetails.value.locationType === 'SEARCH_LOCATION') {
      this.addressDetails.get('typedAddress')?.patchValue(address.address);
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.getPlaceAutocomplete();
    setTimeout(() => {
      hoverIndicator('#address_choose_indicators .btn', '#address_choose_indicators');
    }, 200);
  }

  private getPlaceAutocomplete(): void {
    this.autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement, {
      // componentRestrictions: { country: 'US' },
      types: ['geocode']  // 'establishment' / 'address' / 'geocode'
    });
    google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
      const place = this.autocomplete.getPlace();
      this.markerDraggble = true;
      if (place) {
        this.addressDetails.get('locationType')?.patchValue('SEARCH_LOCATION');
        const address = this.formatAutoCompleteAddress(place, 'auto');
        this.setAddress(address);
      }
    });
  }

  formatAutoCompleteAddress(address: any, addressType: any): any {
    const formattedAddress: any = {};
    formattedAddress.address = address.formatted_address;
    address.address_components.forEach((item: any) => {
      if (item.types.includes('locality')) { formattedAddress.locality = item.long_name; }
      else if (item.types.includes('administrative_area_level_2')) { formattedAddress.region = item.long_name; }
      else if (item.types.includes('administrative_area_level_1')) { formattedAddress.state = item.long_name; }
      else if (item.types.includes('country')) { formattedAddress.country = item.long_name; }
      else if (item.types.includes('postal_code')) { formattedAddress.zipcode = item.long_name; }
    });
    if (addressType === 'auto') {
      this.lat = address.geometry.location.lat();
      this.lng = address.geometry.location.lng();
    } else {
      this.lat = address.geometry.location.lat;
      this.lng = address.geometry.location.lng;
    }
    formattedAddress.coordinates = [this.lng, this.lat];
    return formattedAddress;
  }

  centerChanged(event: any): void {
    // console.log(event, 'event');
    this.getAddressByLatLng({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  }

  submitClick(): void {
    console.log(this.addressDetails.value.address);
    const coordinates = this.addressDetails.value.coordinates;
    if (coordinates && coordinates.length) {
      if (this.addressDetails.value.address !== '') {
        this.closePopup({ ...this.addressDetails.value, isData: true });
      }
    }
  }

  public mapReadyHandler(map: google.maps.Map): void {
    this.map = map;
    if (map) {
      map.setOptions({
        streetViewControl: false,
        fullscreenControl: false
      });
    }
    this.map.addListener('click', (e: google.maps.MouseEvent) => {
      if (this.addressDetails.value.locationType === 'SEARCH_LOCATION') {
        this.lat = e.latLng.lat();
        this.lng = e.latLng.lng();
        this.getAddressByLatLng({ lat: this.lat, lng: this.lng });
      }
    });
  }

  getAddressList(): void {
    this.myaccountService.addressList({}).subscribe(res => {
      this.addressList = res.data;
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

  makePrimary(item: any) {
    this.checkedAddress = item;
    if (item.Location.coordinates && item.Location.coordinates.length) {
      this.lat = item.Location.coordinates[1];
      this.lng = item.Location.coordinates[0];
    }
    this.setAddress({
      address: item.Address,
      coordinates: item.Location.coordinates,
      country: item.Country,
      locality: item.Locality,
      region: item.Region,
      state: item.State,
      zipcode: item.Zipcode
    });
    // this.myaccountService.makePrimary({}, item._id).subscribe(res => {
    //   this.getAddressList();
    // }, err => {
    //   this.commonService.showErrorMessage('Something went wrong');
    // });
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
