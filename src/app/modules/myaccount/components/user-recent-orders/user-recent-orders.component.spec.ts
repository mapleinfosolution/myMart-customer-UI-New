import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecentOrdersComponent } from './user-recent-orders.component';

describe('UserRecentOrdersComponent', () => {
  let component: UserRecentOrdersComponent;
  let fixture: ComponentFixture<UserRecentOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRecentOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRecentOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
