import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninOtherSectionComponent } from './signin-other-section.component';

describe('SigninOtherSectionComponent', () => {
  let component: SigninOtherSectionComponent;
  let fixture: ComponentFixture<SigninOtherSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninOtherSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninOtherSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
