import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistAndFollwedStoresComponent } from './wishlist-and-follwed-stores.component';

describe('WishlistAndFollwedStoresComponent', () => {
  let component: WishlistAndFollwedStoresComponent;
  let fixture: ComponentFixture<WishlistAndFollwedStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistAndFollwedStoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistAndFollwedStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
