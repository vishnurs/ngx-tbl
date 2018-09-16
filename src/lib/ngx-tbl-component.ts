import { Component, ViewChild, Input, 
  Output, EventEmitter, ContentChildren, QueryList } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable';
import { NgxTblColumn } from './ngx-tbl-column.component';
import { debounceTime, map } from 'rxjs/operators'

import * as _ from 'lodash';
export interface itm {
  rows?: any[];
  total: number;
}
@Component({
  selector: 'ngx-tbl', 
  templateUrl: './ngx-tbl-component.html'
})
export class NgxTblComponent {
  _items: any;
  limit: number = 10;
  sort: any = {};
  searchParam: string;
  private subject = new Subject<any>();
  resetPagination: Observable<any>;
  private debouncer = new Subject();
  private deleteRow:any;

  @ViewChild('deleteConfirmModal') deleteConfirmModal: any;
  @Input()
  set items(items: any[]) {
    this._items = items;
  }
  get items() {
    return this._items;
  }
  @Input() config: any;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() load: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @ContentChildren(NgxTblColumn) columns: QueryList<NgxTblColumn>;

  constructor() {
    this.resetPagination = this.subject.asObservable();
    this.debouncer.pipe(
      debounceTime(300),
      map(val => this.loadData()))
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.subject.next(true);
  }

  search() {
    this.subject.next(true);
    this.debouncer.next()
  }

  limitChange() {
    this.subject.next(true);
    this.loadData();
  }

  confirmDelete(item: any) {
    this.deleteRow = item;
    this.deleteConfirmModal.show();
  }

  deleteItem() {
    this.delete.emit({ item: _.clone(this.deleteRow), tableParams: this.getQueryParams(1) });
    this.deleteRow = {};
    this.deleteConfirmModal.hide();
    this.subject.next(true);
  }

  closeModal() {
    this.deleteConfirmModal.hide();
  }

  editRow(item: any, index: any) {
    this.edit.emit({ item: _.clone(item), tableParams: this.getQueryParams(1) });
    this.subject.next(true);
  }

  addNew() {
    this.add.emit({ tableParams: this.getQueryParams(1) });
    this.subject.next(true);
  }

  getQueryParams(currentPage: any) {
    //this.pageNo = currentPage;
    return { search: this.searchParam || '', limit: this.limit, skip: (currentPage - 1) * this.limit, sort: this.sort };
  }

  loadData(currentPage: number = 1) {
    this.load.emit(this.getQueryParams(currentPage));
  }

  sortColumn(column: any) {
    if (column.sortable) {
      if (_.get(this.sort, column.key) == 0) {
        this.sort = {};
        this.sort[column.key] = 1
      } else if (_.get(this.sort, column.key) == 1) {
        this.sort = {};
        this.sort[column.key] = 0;
      } else {
        this.sort = {};
        this.sort[column.key] = 1;
      }
      this.loadData(); //this.pageNo
    }
  }
}