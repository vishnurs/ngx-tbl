import {
  Component, ViewChild, Input,
  Output, EventEmitter, ContentChildren, QueryList
} from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable';
import { NgxTblColumn } from './ngx-tbl-column.component';
import { debounceTime, map } from 'rxjs/operators'

import * as _ from 'lodash';

@Component({
  selector: 'ngx-tbl',
  template: `
  <table class="table table-striped">
  <thead>
    <tr>
      <th *ngFor="let column of columns" [ngClass]="{'col-sort-asc': sort[column.key] == 1, 'col-sort-desc': sort[column.key] == 0, 
      'col-sort': (column.sortable && (sort[column.key] != 0 || sort[column.key] != 1)), 'narrow':column.narrow }" (click)="sortColumn(column)">
      {{column.name}}
      </th>
      <th class="col-action" *ngIf="!config.allowAction || config.allowAction()">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let item of _items?.rows; let i = index;">
      <td *ngFor="let column of columns">
        <div *ngIf="!column.cellTemplate">{{item[column.key]}}</div>
        <div *ngIf="column.cellTemplate" 
        [ngTemplateOutlet]="column.cellTemplate" [ngTemplateOutletContext]="{item: item}">
        </div>
      </td>
      <td *ngIf="!config.allowAction || config.allowAction()">
        <button class="btn btn-sm" (click)="editRow(item, i)">Edit</button>
        <button class="btn btn-sm" (click)="confirmDelete(item)">Delete</button>
      </td>
    </tr>
    <tr *ngIf="_items?.total==0">
      <td [attr.colspan]="columns.length">No records found</td>
    </tr>
  </tbody>
  
</table>
<ngx-tbl-pagination [total]="_items?.total" [limit]="limit" (page-change)="loadData($event)" [reset-pagination]="resetPagination"></ngx-tbl-pagination>
  `
})
export class NgxTblComponent {
  _items: any;
  limit: number = 10;
  sort: any = {};
  searchParam: string;
  private subject = new Subject<any>();
  resetPagination: Observable<any>;
  private debouncer = new Subject();
  private deleteRow: any;

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