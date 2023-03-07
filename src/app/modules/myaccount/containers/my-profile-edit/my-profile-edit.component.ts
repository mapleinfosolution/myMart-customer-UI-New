import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { MyaccountService } from '../../service/myaccount.service';
import { CommonStoreService } from '../../../../services/api/common-store.service';
import { ChangeEmailPopupComponent } from '../../components/change-email-popup/change-email-popup.component';
import { ConfirmationPopupConfig } from '../../../../services/constant/constants';
import { ChangeMobilePopupComponent } from '../../components/change-mobile-popup/change-mobile-popup.component';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile-edit',
  templateUrl: './my-profile-edit.component.html',
  styleUrls: ['./my-profile-edit.component.scss']
})
export class MyProfileEditComponent implements OnInit, OnDestroy {
  @ViewChild('uploadEl') uploadElRef!: ElementRef;
  private subs: Subscription[] = [];
  userDetails: any = {};
  editForm!: FormGroup;
  popupConfig = ConfirmationPopupConfig;
  constructor(
    private modalService: NgbModal,
    private myaccountService: MyaccountService,
    private commonStoreService: CommonStoreService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createEditFrom();
    this.subs.push(this.commonStoreService.getUserData().subscribe((val: any) => {
      this.userDetails = val;
      this.setEditForm(val);
    }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  createEditFrom(): void {
    this.editForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: [''],
      dob: [''],
      gender: [''],
      image: ['']
    });
  }

  setEditForm(userData: any): void {
    this.editForm.reset();
    this.editForm.patchValue(userData);
  }

  cancelClick(): void {
    this.setEditForm(this.userDetails);
    this.router.navigate(['my-account/profile']);
    
  }

  saveClick(): void {
    if (this.editForm.invalid) { return; }
    this.myaccountService.updateDetails(this.editForm.value).subscribe(res => {
      this.commonService.showSuccessMessage(res.message || 'Success');
      this.commonStoreService.callUserData();
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

  openChangeEmailPopup(): void {
    const modalRef = this.modalService.open(ChangeEmailPopupComponent, this.popupConfig);
    modalRef.componentInstance.data = {};
    modalRef.result.then(result => {
      if (result && result.isData) {
        this.commonStoreService.setUserData({ ...this.userDetails, email: result.email });
      }
    });
  }

  openChangeMobilePopup(): void {
    const modalRef = this.modalService.open(ChangeMobilePopupComponent, this.popupConfig);
    modalRef.componentInstance.data = {};
    modalRef.result.then(result => {
       if (result && result.isData) {
        this.commonStoreService.setUserData({ ...this.userDetails, phone: result.phone });
      }
    });
  }

  onSelectedImage(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadprofileImage(file);
      // this.editForm.get('image')?.setValue(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // reader.onload = (event) => {
      //   console.log(reader.result);
      // };
    }
  }

  uploadprofileImage(imageData: any): void {
    console.log(imageData, 'imageData');
    const myFormData = new FormData();
    myFormData.append('profileImage', imageData);
    this.myaccountService.uploadprofileImage(myFormData).subscribe(res => {
      this.uploadElRef.nativeElement.value = '';
      this.commonService.showSuccessMessage(res.message || 'Success');
      this.commonStoreService.callUserData();
    }, err => {
      this.commonService.showErrorMessage('Something went wrong');
    });
  }

  imageUrl(imagePath: string): any {
    if (imagePath) {
      return this.commonService.getImageUrl1(imagePath);
    } else {
      return '';
    }
  }

  openInputFile(id:string) : void {
    let file_elm: HTMLElement  = document.querySelector(id) as HTMLElement;
    file_elm.click();
  }

  showName(): string {
    let name = '';
    name = ((this.userDetails.firstname) ? this.userDetails.firstname.substr(0, 1) : '' ) + ((this.userDetails.lastname) ? this.userDetails.lastname.substr(0, 1) : '');
    return name;
  }

}
