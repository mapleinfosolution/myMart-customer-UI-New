import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mymart-child-category-menu-list',
  templateUrl: './child-category-menu-list.component.html',
  styleUrls: ['./child-category-menu-list.component.scss']
})
export class ChildCategoryMenuListComponent implements OnInit {
  @Input() childData: any;
  @Output() categoryClickEvent = new EventEmitter<any>();
  category: any = {};
  constructor() { }

  ngOnInit(): void {
    console.log(this.childData);
    this.category = JSON.parse(JSON.stringify(this.childData));
  }

  subCategoryClickEvent(data:any): void {
    this.categoryClickEvent.emit(data);
  }


  categoryClick(category:any): void {
    if (category.items && category.items.length) {
      // if (category.active) {
      //   category.active = false;
      // } else {
      //   category.active = true;
      // }
    } else {
      this.categoryClickEvent.emit(category);
    }
  }

}
