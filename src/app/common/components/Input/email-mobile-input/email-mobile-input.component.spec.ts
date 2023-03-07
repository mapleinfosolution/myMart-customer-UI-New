import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMobileInputComponent } from './email-mobile-input.component';

describe('EmailMobileInputComponent', () => {
  let component: EmailMobileInputComponent;
  let fixture: ComponentFixture<EmailMobileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailMobileInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailMobileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
