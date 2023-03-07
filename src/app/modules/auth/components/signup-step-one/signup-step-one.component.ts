import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup-step-one',
  templateUrl: './signup-step-one.component.html',
  styleUrls: ['./signup-step-one.component.scss']
})
export class SignupStepOneComponent implements OnInit {
  @Output() submitEmailMobile = new EventEmitter();
  @Input() formData!: FormGroup;
  @Input() submitted: any;
  constructor() { }

  ngOnInit(): void {
  }

  get f(): any {
    return this.formData.controls;
  }

  public continueClick(): void {
    this.submitEmailMobile.emit();
  }

  fieldClicked(evnt: any) {
    if(!evnt) {
      if(!this.formData.value.emailMobile.includes('+974')) {
        console.log('1');
        this.formData.controls.emailMobile.setValue(`+974 ${this.formData.value.emailMobile}`);
      } else {
        this.formData.controls.emailMobile.setValue(this.formData.value.emailMobile)
      }
    } else {
      if(this.formData.value.emailMobile.includes('+974')) {
        this.formData.controls.emailMobile.setValue(this.formData.value.emailMobile.split[' '][1]);
      } else {
        this.formData.controls.emailMobile.setValue(this.formData.value.emailMobile);
      }
    }
    console.log(this.formData.value.emailMobile);
  }

}
