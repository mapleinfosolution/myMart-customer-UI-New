import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStepFiveComponent } from './signup-step-five.component';

describe('SignupStepFiveComponent', () => {
  let component: SignupStepFiveComponent;
  let fixture: ComponentFixture<SignupStepFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupStepFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupStepFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
