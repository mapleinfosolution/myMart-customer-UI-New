import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartStepComponent } from './cart-step.component';

describe('CartStepComponent', () => {
  let component: CartStepComponent;
  let fixture: ComponentFixture<CartStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
