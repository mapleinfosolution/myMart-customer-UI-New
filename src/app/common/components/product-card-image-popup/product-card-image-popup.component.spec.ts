import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardImagePopupComponent } from './product-card-image-popup.component';

describe('ProductCardImagePopupComponent', () => {
  let component: ProductCardImagePopupComponent;
  let fixture: ComponentFixture<ProductCardImagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardImagePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
