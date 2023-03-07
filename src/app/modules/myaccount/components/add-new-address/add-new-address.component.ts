import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.scss']
})
export class AddNewAddressComponent implements OnInit {
  @Output() mapViewEnable = new EventEmitter<any>();
  @Input() submitted = false;
  @Output() saveEvent = new EventEmitter<any>();
  @Output() cancelEvent = new EventEmitter<any>();
  @Input() addressForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal) { }

  // tslint:disable-next-line: typedef
  get f() {
    return this.addressForm.controls;
  }

  ngOnInit(): void {
  }

  enableMapView(): void {
    this.mapViewEnable.emit({});
  }

  changeType(addressType: string): void {
    this.addressForm.get('Type')?.patchValue(addressType);
  }

  saveClick(): void {
    this.saveEvent.emit({});
  }

  cancelClick(): void {
    this.cancelEvent.emit({});
  }

}
