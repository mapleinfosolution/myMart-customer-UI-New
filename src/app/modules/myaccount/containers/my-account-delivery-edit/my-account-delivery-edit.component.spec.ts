import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountDeliveryEditComponent } from './my-account-delivery-edit.component';

describe('MyAccountDeliveryEditComponent', () => {
  let component: MyAccountDeliveryEditComponent;
  let fixture: ComponentFixture<MyAccountDeliveryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccountDeliveryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountDeliveryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
