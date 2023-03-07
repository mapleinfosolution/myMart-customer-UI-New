import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyaccountService } from '../../service/myaccount.service';
import { CommonStoreService } from '../../../../services/api/common-store.service';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.scss']
})
export class AddEditAddressComponent implements OnInit {
  @Input() public data: any;
  addressSection = false;
  addressForm!: FormGroup;
  isAdd = true;
  addressId: any = '';
  submitted = false;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private myaccountService: MyaccountService,
    private commonStoreService: CommonStoreService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.createAddressForm();
    if (Object.keys(this.data).length) {
      this.isAdd = false;
      this.addressId = this.data._id;
      console.log(this.addressId);
      this.setFormData(this.data);
    }
  }

  closePopup(data: any): void {
    this.activeModal.close(data);
  }

  cancelClick(data: any): void {
    this.closePopup({ isData: false });
  }

  createAddressForm(): void {
    this.addressForm = this.fb.group({
      Name: ['', [Validators.required]],
      MobileNo: [''],
      Zone: [''],      
      Street: [''],
      Building: [''],
      Country: ['', [Validators.required]],
      State: ['', [Validators.required]],
      Region: [''],
      Zipcode: [''],
      Locality: [''],
      Type: ['Home', [Validators.required]],
      coordinates: [''],
      location_type: ['', [Validators.required]],
      HouseNo: [''],
      BuildingName: [''],
      AreaStreet: [''],
      AdditionalDirection: [''],
      Address: ['', [Validators.required]]
    });
  }

  closeAddressPopup(data: any): void {
    console.log('closeAddressPopup==', data);
    if (data.isData) {
      this.setAddress(data);
    }
    this.addressSection = false;
  }

  mapViewEnable(data: any): void {
    this.addressSection = true;
  }

  setAddress(address: any): void {
    this.addressForm.get('Zone')?.patchValue(address.zone);
    this.addressForm.get('Street')?.patchValue(address.street);
    // this.addressForm.get('Type')?.patchValue(address.typedAddress);
    this.addressForm.get('Building')?.patchValue(address.building);
    this.addressForm.get('location_type')?.patchValue(address.locationType);
    this.addressForm.get('Country')?.patchValue(address.country);
    this.addressForm.get('State')?.patchValue(address.state);
    this.addressForm.get('Region')?.patchValue(address.region);
    this.addressForm.get('Zipcode')?.patchValue(address.Zipcode);
    this.addressForm.get('Locality')?.patchValue(address.locality);
    this.addressForm.get('coordinates')?.patchValue(address.coordinates);
    this.addressForm.get('Address')?.patchValue(address.address);
  }

  saveClick(data: any): void {
    console.log(data);
    this.submitted = true;
    if (this.addressForm.invalid) { return; }
    this.myaccountService.addEditAddress(this.addressForm.value, { addressId: this.addressId }).subscribe(res => {
      this.commonService.showSuccessMessage(res.message || 'Success');
      this.closePopup({ isData: true, data: res.data });
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

  setFormData(data: any): void {
    this.addressForm.patchValue(data);
    this.addressForm.get('coordinates')?.patchValue(data.Location?.coordinates);
  }

  setDefaultAddress(): any {
    // return this.addressForm.value;
    return {
      zone: this.addressForm.value.Zone,
      street: this.addressForm.value.Street,
      building: this.addressForm.value.Building,
      locationType: this.addressForm.value.location_type,
      address: this.addressForm.value.Address,
      coordinates: this.addressForm.value.coordinates,
      // typedAddress: this.addressForm.value.,
      country: this.addressForm.value.Country,
      locality: this.addressForm.value.Locality,
      region: this.addressForm.value.Region,
      state: this.addressForm.value.State
    }
  }
}
