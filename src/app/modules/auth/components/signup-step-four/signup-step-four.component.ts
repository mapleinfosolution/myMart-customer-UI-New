import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup-step-four',
  templateUrl: './signup-step-four.component.html',
  styleUrls: ['./signup-step-four.component.scss']
})
export class SignupStepFourComponent implements OnInit {
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
