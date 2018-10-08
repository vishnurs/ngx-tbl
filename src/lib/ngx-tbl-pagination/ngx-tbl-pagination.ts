import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { tap } from 'rxjs/operators';

import * as _ from 'lodash';
declare var parseInt: any
declare var Math: any
@Component({
  selector: 'ngx-tbl-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .pagination { float: right; margin:0 0 7px 0; }
    .pagination li{cursor:pointer;}
    .paging-info {font-style: italic;color: #808080;line-height: 2;}
  `],
  template: `
  <div class="row">
  <div class="col-md-3 col-xs-3 col-lg-3 col-sm-3 paging-info" *ngIf="total">
    <span>showing {{this.pager.startIndex+1}} to {{this.pager.endCount}} of {{total}}</span>
  </div>
  <div class="col-md-9 col-xs-9 col-lg-9 col-sm-9">
  <ul *ngIf="pager.pages && pager.pages.length" class="pagination">
    <li class="page-item" [ngClass]="{disabled:pager.currentPage === 1}">
        <a class="page-link" (click)="setPage(1)">First</a>
    </li>
    <li class="page-item" [ngClass]="{disabled:pager.currentPage === 1}">
        <a class="page-link" (click)="setPage(pager.currentPage - 1)">Prev</a>
    </li>
    <li class="page-item" *ngFor="let page of pager.pages" [ngClass]="{active:pager.currentPage === page}">
        <a class="page-link" (click)="setPage(page)">{{page}}</a>
    </li>
    <li class="page-item" [ngClass]="{disabled:pager.currentPage === pager.totalPages}">
        <a class="page-link" (click)="setPage(pager.currentPage + 1)">Next</a>
    </li>
    <li class="page-item" [ngClass]="{disabled:pager.currentPage === pager.totalPages}">
        <a class="page-link" (click)="setPage(pager.totalPages)">Last</a>
    </li>
  </ul>
  </div>
  </div>
  `
})

export class NgxTblPagination {
  @Input('reset-pagination') resetPagination: any;
  @Input('total') total: any;
  @Input() limit: any;
  @Output('page-change') pageChanged = new EventEmitter();
  private reset: boolean = true;
  pager: any = {};

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pageChanged.emit(page);
    this.pager = this.getPager(this.total, page, _.toNumber(this.limit));
  }
  
  constructor() {
  }

  ngOnInit() {
    this.resetPagination.subscribe(() => {
      this.reset = true;
    })
  }

  ngOnChanges(changes: any) {
    this.limit = parseInt(this.limit);
    if (this.total >= 0 && this.reset) {
      this.reset = false;
      this.pager = this.getPager(this.total, 1, _.toNumber(this.limit));
    }
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let pages = _.range(startPage, endPage + 1);

    let endCount = startIndex + this.limit;
    if (endCount > this.total) { endCount = this.total }
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
      endCount: endCount
    };
  }
}