import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-step',
  templateUrl: './cart-step.component.html',
  styleUrls: ['./cart-step.component.scss']
})
export class CartStepComponent implements OnInit {
  @Input() orderStep: any;
  @Output() cartStepEmitor: EventEmitter<any>;
  cartSteps: any = [];

  constructor() {
    this.cartStepEmitor = new EventEmitter();
   }

  ngOnInit(): void {
    this.cartSteps = [
      {
        number: 1,
        stepName: 'Step 1',
        name: 'Cart'
      },
      {
        number: 2,
        stepName: 'Step 2',
        name: 'Delivery'
      },
      {
        number: 3,
        stepName: 'Step 3',
        name: 'Payment'
      }
    ]
  }

  stepRedirect(step: any) {
    if (step.number < this.orderStep) {
      this.cartStepEmitor.emit(step.number); 
    }

  }
}
