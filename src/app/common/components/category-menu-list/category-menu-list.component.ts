import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mymart-category-menu-list',
  templateUrl: './category-menu-list.component.html',
  styleUrls: ['./category-menu-list.component.scss']
})
export class CategoryMenuListComponent implements OnInit {
  @Input() appitems = [];
  @Output() categorySelect = new EventEmitter<any>();
  config: any;
  selectedCategory: any = [];
  numCatItems:any =  5;
  numCatItemsOld:any =  null;
  constructor() { }

  ngOnInit(): void {
    this.numCatItemsOld = this.numCatItems;
    
  }

  categoryClickEvent(data:any): void {
    this.categorySelect.emit(data);
  }

  catExpand():void{
    if(this.numCatItems > this.numCatItemsOld){
      this.numCatItems = this.numCatItemsOld;
      
    }else{
      this.numCatItems = this.appitems.length;
    }
    
  }

}
