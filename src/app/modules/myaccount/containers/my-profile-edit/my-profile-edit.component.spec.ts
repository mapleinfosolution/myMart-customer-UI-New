import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileEditComponent } from './my-profile-edit.component';

describe('MyProfileEditComponent', () => {
  let component: MyProfileEditComponent;
  let fixture: ComponentFixture<MyProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProfileEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
