import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mymart-list-pagination',
  templateUrl: './list-pagination.component.html',
  styleUrls: ['./list-pagination.component.scss']
})
export class ListPaginationComponent implements OnInit {
  @Input() paginationData: any;
  @Output() paginationChangeEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  paginationChange(args:any): void {
    this.paginationChangeEvent.emit(args);
  }

}
