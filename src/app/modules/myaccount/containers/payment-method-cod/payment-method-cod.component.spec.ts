import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodCodComponent } from './payment-method-cod.component';

describe('PaymentMethodCodComponent', () => {
  let component: PaymentMethodCodComponent;
  let fixture: ComponentFixture<PaymentMethodCodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMethodCodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodCodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
