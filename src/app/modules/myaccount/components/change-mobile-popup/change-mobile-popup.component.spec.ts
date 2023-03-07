import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMobilePopupComponent } from './change-mobile-popup.component';

describe('ChangeMobilePopupComponent', () => {
  let component: ChangeMobilePopupComponent;
  let fixture: ComponentFixture<ChangeMobilePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMobilePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMobilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
