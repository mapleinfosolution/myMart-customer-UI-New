import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAddressSelectionComponent } from './header-address-selection.component';

describe('HeaderAddressSelectionComponent', () => {
  let component: HeaderAddressSelectionComponent;
  let fixture: ComponentFixture<HeaderAddressSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAddressSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAddressSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
