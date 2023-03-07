import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrderShellComponent } from './my-order-shell.component';

describe('MyOrderShellComponent', () => {
  let component: MyOrderShellComponent;
  let fixture: ComponentFixture<MyOrderShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOrderShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrderShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
