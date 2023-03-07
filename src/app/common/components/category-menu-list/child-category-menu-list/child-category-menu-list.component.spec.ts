import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCategoryMenuListComponent } from './child-category-menu-list.component';

describe('ChildCategoryMenuListComponent', () => {
  let component: ChildCategoryMenuListComponent;
  let fixture: ComponentFixture<ChildCategoryMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildCategoryMenuListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildCategoryMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
