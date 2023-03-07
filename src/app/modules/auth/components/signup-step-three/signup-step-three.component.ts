import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup-step-three',
  templateUrl: './signup-step-three.component.html',
  styleUrls: ['./signup-step-three.component.scss']
})
export class SignupStepThreeComponent implements OnInit {
  @Output() submitRegister = new EventEmitter();
  @Input() formData!: FormGroup;
  @Input() submitted: any;
  constructor( ) { }

  ngOnInit(): void {
  }

  get f(): any {
    return this.formData.controls;
  }

  public clickNext(): void {
    this.submitRegister.emit();
  }

}
