/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ViewChild, Input, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NgxTblColumn } from './ngx-tbl-column.component';
import { debounceTime, map } from 'rxjs/operators';
import * as _ from 'lodash';
/**
 * @record
 */
export function itm() { }
function itm_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    itm.prototype.rows;
    /** @type {?} */
    itm.prototype.total;
}
export class NgxTblComponent {
    constructor() {
        this.limit = 10;
        this.sort = {};
        this.subject = new Subject();
        this.debouncer = new Subject();
        this.update = new EventEmitter();
        this.load = new EventEmitter();
        this.edit = new EventEmitter();
        this.add = new EventEmitter();
        this.delete = new EventEmitter();
        this.resetPagination = this.subject.asObservable();
        this.debouncer.pipe(debounceTime(300), map(val => this.loadData()));
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set items(items) {
        this._items = items;
    }
    /**
     * @return {?}
     */
    get items() {
        return this._items;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.loadData();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.subject.next(true);
    }
    /**
     * @return {?}
     */
    search() {
        this.subject.next(true);
        this.debouncer.next();
    }
    /**
     * @return {?}
     */
    limitChange() {
        this.subject.next(true);
        this.loadData();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    confirmDelete(item) {
        this.deleteRow = item;
        this.deleteConfirmModal.show();
    }
    /**
     * @return {?}
     */
    deleteItem() {
        this.delete.emit({ item: _.clone(this.deleteRow), tableParams: this.getQueryParams(1) });
        this.deleteRow = {};
        this.deleteConfirmModal.hide();
        this.subject.next(true);
    }
    /**
     * @return {?}
     */
    closeModal() {
        this.deleteConfirmModal.hide();
    }
    /**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    editRow(item, index) {
        this.edit.emit({ item: _.clone(item), tableParams: this.getQueryParams(1) });
        this.subject.next(true);
    }
    /**
     * @return {?}
     */
    addNew() {
        this.add.emit({ tableParams: this.getQueryParams(1) });
        this.subject.next(true);
    }
    /**
     * @param {?} currentPage
     * @return {?}
     */
    getQueryParams(currentPage) {
        //this.pageNo = currentPage;
        return { search: this.searchParam || '', limit: this.limit, skip: (currentPage - 1) * this.limit, sort: this.sort };
    }
    /**
     * @param {?=} currentPage
     * @return {?}
     */
    loadData(currentPage = 1) {
        this.load.emit(this.getQueryParams(currentPage));
    }
    /**
     * @param {?} column
     * @return {?}
     */
    sortColumn(column) {
        if (column.sortable) {
            if (_.get(this.sort, column.key) == 0) {
                this.sort = {};
                this.sort[column.key] = 1;
            }
            else if (_.get(this.sort, column.key) == 1) {
                this.sort = {};
                this.sort[column.key] = 0;
            }
            else {
                this.sort = {};
                this.sort[column.key] = 1;
            }
            this.loadData(); //this.pageNo
        }
    }
}
NgxTblComponent.decorators = [
    { type: Component, args: [{
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
      <td class="col-action" *ngIf="!config.allowAction || config.allowAction()">
        <div class="btn-group" dropdown>
          <button id="button-basic" dropdownToggle type="button" class="btn dropdown-toggle" *ngIf="config.showAction && config.showAction(item)"
                  aria-controls="dropdown-basic">
                  <i class="fa fa-cog"></i>
          </button>
          <ul id="dropdown-basic" class="dropdown-menu">
            <li *ngIf="!config.allowEdit || config.allowEdit(item)" role="menuitem"><a class="dropdown-item" (click)="editRow(item, i)"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a></li>
            <li *ngIf="!config.allowDelete || config.allowDelete(item)" role="menuitem"><a class="dropdown-item" (click)="confirmDelete(item)"><i class="fa fa-trash" aria-hidden="true"></i> Delete</a></li>
          </ul>
        </div>    
      </td>
    </tr>
    <tr *ngIf="_items?.total==0">
      <td [attr.colspan]="columns.length" class="empty-ngx-table-msg">No records found</td>
    </tr>
  </tbody>
  
</table>
<ngx-tbl-pagination [total]="_items?.total" [limit]="limit" (page-change)="loadData($event)" [reset-pagination]="resetPagination"></ngx-tbl-pagination>
  `
            },] },
];
/** @nocollapse */
NgxTblComponent.ctorParameters = () => [];
NgxTblComponent.propDecorators = {
    "deleteConfirmModal": [{ type: ViewChild, args: ['deleteConfirmModal',] },],
    "items": [{ type: Input },],
    "config": [{ type: Input },],
    "update": [{ type: Output },],
    "load": [{ type: Output },],
    "edit": [{ type: Output },],
    "add": [{ type: Output },],
    "delete": [{ type: Output },],
    "columns": [{ type: ContentChildren, args: [NgxTblColumn,] },],
};
function NgxTblComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgxTblComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgxTblComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    NgxTblComponent.propDecorators;
    /** @type {?} */
    NgxTblComponent.prototype._items;
    /** @type {?} */
    NgxTblComponent.prototype.limit;
    /** @type {?} */
    NgxTblComponent.prototype.sort;
    /** @type {?} */
    NgxTblComponent.prototype.searchParam;
    /** @type {?} */
    NgxTblComponent.prototype.subject;
    /** @type {?} */
    NgxTblComponent.prototype.resetPagination;
    /** @type {?} */
    NgxTblComponent.prototype.debouncer;
    /** @type {?} */
    NgxTblComponent.prototype.deleteRow;
    /** @type {?} */
    NgxTblComponent.prototype.deleteConfirmModal;
    /** @type {?} */
    NgxTblComponent.prototype.config;
    /** @type {?} */
    NgxTblComponent.prototype.update;
    /** @type {?} */
    NgxTblComponent.prototype.load;
    /** @type {?} */
    NgxTblComponent.prototype.edit;
    /** @type {?} */
    NgxTblComponent.prototype.add;
    /** @type {?} */
    NgxTblComponent.prototype.delete;
    /** @type {?} */
    NgxTblComponent.prototype.columns;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRibC1jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdGJsLyIsInNvdXJjZXMiOlsibmd4LXRibC1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFDM0IsTUFBTSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUNqRCxNQUFNLGVBQWUsQ0FBQTtBQUN0QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBRXRDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBRWxELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7OztBQWdENUIsTUFBTTtJQTBCSjtxQkF4QmdCLEVBQUU7b0JBQ04sRUFBRTt1QkFFSSxJQUFJLE9BQU8sRUFBTzt5QkFFaEIsSUFBSSxPQUFPLEVBQUU7c0JBWUssSUFBSSxZQUFZLEVBQU87b0JBQ3pCLElBQUksWUFBWSxFQUFPO29CQUN2QixJQUFJLFlBQVksRUFBRTttQkFDbkIsSUFBSSxZQUFZLEVBQUU7c0JBQ2YsSUFBSSxZQUFZLEVBQUU7UUFJdEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUNqQixZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FDL0I7Ozs7O1FBbkJHLEtBQUssQ0FBQyxLQUFZO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOzs7OztJQUV0QixJQUFJLEtBQUs7UUFDUCxNQUFNLENB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QUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQzFCO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO0tBQ0Y7OztZQS9JRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNUO2FBQ0Y7Ozs7O21DQVdFLFNBQVMsU0FBQyxvQkFBb0I7c0JBQzlCLEtBQUs7dUJBT0wsS0FBSzt1QkFDTCxNQUFNO3FCQUNOLE1BQU07cUJBQ04sTUFBTTtvQkFDTixNQUFNO3VCQUNOLE1BQU07d0JBQ04sZUFBZSxTQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIFZpZXdDaGlsZCwgSW5wdXQsXG4gIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCdcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTmd4VGJsQ29sdW1uIH0gZnJvbSAnLi9uZ3gtdGJsLWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuZXhwb3J0IGludGVyZmFjZSBpdG0ge1xuICByb3dzPzogYW55W107XG4gIHRvdGFsOiBudW1iZXI7XG59XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdGJsJyxcbiAgdGVtcGxhdGU6IGBcbiAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPlxuICA8dGhlYWQ+XG4gICAgPHRyPlxuICAgICAgPHRoICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiIFtuZ0NsYXNzXT1cInsnY29sLXNvcnQtYXNjJzogc29ydFtjb2x1bW4ua2V5XSA9PSAxLCAnY29sLXNvcnQtZGVzYyc6IHNvcnRbY29sdW1uLmtleV0gPT0gMCwgXG4gICAgICAnY29sLXNvcnQnOiAoY29sdW1uLnNvcnRhYmxlICYmIChzb3J0W2NvbHVtbi5rZXldICE9IDAgfHwgc29ydFtjb2x1bW4ua2V5XSAhPSAxKSksICduYXJyb3cnOmNvbHVtbi5uYXJyb3cgfVwiIChjbGljayk9XCJzb3J0Q29sdW1uKGNvbHVtbilcIj5cbiAgICAgIHt7Y29sdW1uLm5hbWV9fVxuICAgICAgPC90aD5cbiAgICAgIDx0aCBjbGFzcz1cImNvbC1hY3Rpb25cIiAqbmdJZj1cIiFjb25maWcuYWxsb3dBY3Rpb24gfHwgY29uZmlnLmFsbG93QWN0aW9uKClcIj5BY3Rpb25zPC90aD5cbiAgICA8L3RyPlxuICA8L3RoZWFkPlxuICA8dGJvZHk+XG4gICAgPHRyICpuZ0Zvcj1cImxldCBpdGVtIG9mIF9pdGVtcz8ucm93czsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIiFjb2x1bW4uY2VsbFRlbXBsYXRlXCI+e3tpdGVtW2NvbHVtbi5rZXldfX08L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImNvbHVtbi5jZWxsVGVtcGxhdGVcIiBcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLmNlbGxUZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7aXRlbTogaXRlbX1cIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3RkPlxuICAgICAgPHRkIGNsYXNzPVwiY29sLWFjdGlvblwiICpuZ0lmPVwiIWNvbmZpZy5hbGxvd0FjdGlvbiB8fCBjb25maWcuYWxsb3dBY3Rpb24oKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgZHJvcGRvd24+XG4gICAgICAgICAgPGJ1dHRvbiBpZD1cImJ1dHRvbi1iYXNpY1wiIGRyb3Bkb3duVG9nZ2xlIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBkcm9wZG93bi10b2dnbGVcIiAqbmdJZj1cImNvbmZpZy5zaG93QWN0aW9uICYmIGNvbmZpZy5zaG93QWN0aW9uKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9XCJkcm9wZG93bi1iYXNpY1wiPlxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jb2dcIj48L2k+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPHVsIGlkPVwiZHJvcGRvd24tYmFzaWNcIiBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj5cbiAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFjb25maWcuYWxsb3dFZGl0IHx8IGNvbmZpZy5hbGxvd0VkaXQoaXRlbSlcIiByb2xlPVwibWVudWl0ZW1cIj48YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwiZWRpdFJvdyhpdGVtLCBpKVwiPjxpIGNsYXNzPVwiZmEgZmEtcGVuY2lsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBFZGl0PC9hPjwvbGk+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCIhY29uZmlnLmFsbG93RGVsZXRlIHx8IGNvbmZpZy5hbGxvd0RlbGV0ZShpdGVtKVwiIHJvbGU9XCJtZW51aXRlbVwiPjxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJjb25maXJtRGVsZXRlKGl0ZW0pXCI+PGkgY2xhc3M9XCJmYSBmYS10cmFzaFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gRGVsZXRlPC9hPjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+ICAgIFxuICAgICAgPC90ZD5cbiAgICA8L3RyPlxuICAgIDx0ciAqbmdJZj1cIl9pdGVtcz8udG90YWw9PTBcIj5cbiAgICAgIDx0ZCBbYXR0ci5jb2xzcGFuXT1cImNvbHVtbnMubGVuZ3RoXCIgY2xhc3M9XCJlbXB0eS1uZ3gtdGFibGUtbXNnXCI+Tm8gcmVjb3JkcyBmb3VuZDwvdGQ+XG4gICAgPC90cj5cbiAgPC90Ym9keT5cbiAgXG48L3RhYmxlPlxuPG5neC10YmwtcGFnaW5hdGlvbiBbdG90YWxdPVwiX2l0ZW1zPy50b3RhbFwiIFtsaW1pdF09XCJsaW1pdFwiIChwYWdlLWNoYW5nZSk9XCJsb2FkRGF0YSgkZXZlbnQpXCIgW3Jlc2V0LXBhZ2luYXRpb25dPVwicmVzZXRQYWdpbmF0aW9uXCI+PC9uZ3gtdGJsLXBhZ2luYXRpb24+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmd4VGJsQ29tcG9uZW50IHtcbiAgX2l0ZW1zOiBhbnk7XG4gIGxpbWl0OiBudW1iZXIgPSAxMDtcbiAgc29ydDogYW55ID0ge307XG4gIHNlYXJjaFBhcmFtOiBzdHJpbmc7XG4gIHByaXZhdGUgc3ViamVjdCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcmVzZXRQYWdpbmF0aW9uOiBPYnNlcnZhYmxlPGFueT47XG4gIHByaXZhdGUgZGVib3VuY2VyID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBkZWxldGVSb3c6IGFueTtcblxuICBAVmlld0NoaWxkKCdkZWxldGVDb25maXJtTW9kYWwnKSBkZWxldGVDb25maXJtTW9kYWw6IGFueTtcbiAgQElucHV0KClcbiAgc2V0IGl0ZW1zKGl0ZW1zOiBhbnlbXSkge1xuICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG4gIH1cbiAgZ2V0IGl0ZW1zKCkge1xuICAgIHJldHVybiB0aGlzLl9pdGVtcztcbiAgfVxuICBASW5wdXQoKSBjb25maWc6IGFueTtcbiAgQE91dHB1dCgpIHVwZGF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBlZGl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFkZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWxldGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAQ29udGVudENoaWxkcmVuKE5neFRibENvbHVtbikgY29sdW1uczogUXVlcnlMaXN0PE5neFRibENvbHVtbj47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yZXNldFBhZ2luYXRpb24gPSB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5kZWJvdW5jZXIucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSgzMDApLFxuICAgICAgbWFwKHZhbCA9PiB0aGlzLmxvYWREYXRhKCkpKVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5sb2FkRGF0YSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICB9XG5cbiAgc2VhcmNoKCkge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICAgIHRoaXMuZGVib3VuY2VyLm5leHQoKVxuICB9XG5cbiAgbGltaXRDaGFuZ2UoKSB7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQodHJ1ZSk7XG4gICAgdGhpcy5sb2FkRGF0YSgpO1xuICB9XG5cbiAgY29uZmlybURlbGV0ZShpdGVtOiBhbnkpIHtcbiAgICB0aGlzLmRlbGV0ZVJvdyA9IGl0ZW07XG4gICAgdGhpcy5kZWxldGVDb25maXJtTW9kYWwuc2hvdygpO1xuICB9XG5cbiAgZGVsZXRlSXRlbSgpIHtcbiAgICB0aGlzLmRlbGV0ZS5lbWl0KHsgaXRlbTogXy5jbG9uZSh0aGlzLmRlbGV0ZVJvdyksIHRhYmxlUGFyYW1zOiB0aGlzLmdldFF1ZXJ5UGFyYW1zKDEpIH0pO1xuICAgIHRoaXMuZGVsZXRlUm93ID0ge307XG4gICAgdGhpcy5kZWxldGVDb25maXJtTW9kYWwuaGlkZSgpO1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICB9XG5cbiAgY2xvc2VNb2RhbCgpIHtcbiAgICB0aGlzLmRlbGV0ZUNvbmZpcm1Nb2RhbC5oaWRlKCk7XG4gIH1cblxuICBlZGl0Um93KGl0ZW06IGFueSwgaW5kZXg6IGFueSkge1xuICAgIHRoaXMuZWRpdC5lbWl0KHsgaXRlbTogXy5jbG9uZShpdGVtKSwgdGFibGVQYXJhbXM6IHRoaXMuZ2V0UXVlcnlQYXJhbXMoMSkgfSk7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQodHJ1ZSk7XG4gIH1cblxuICBhZGROZXcoKSB7XG4gICAgdGhpcy5hZGQuZW1pdCh7IHRhYmxlUGFyYW1zOiB0aGlzLmdldFF1ZXJ5UGFyYW1zKDEpIH0pO1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICB9XG5cbiAgZ2V0UXVlcnlQYXJhbXMoY3VycmVudFBhZ2U6IGFueSkge1xuICAgIC8vdGhpcy5wYWdlTm8gPSBjdXJyZW50UGFnZTtcbiAgICByZXR1cm4geyBzZWFyY2g6IHRoaXMuc2VhcmNoUGFyYW0gfHwgJycsIGxpbWl0OiB0aGlzLmxpbWl0LCBza2lwOiAoY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMubGltaXQsIHNvcnQ6IHRoaXMuc29ydCB9O1xuICB9XG5cbiAgbG9hZERhdGEoY3VycmVudFBhZ2U6IG51bWJlciA9IDEpIHtcbiAgICB0aGlzLmxvYWQuZW1pdCh0aGlzLmdldFF1ZXJ5UGFyYW1zKGN1cnJlbnRQYWdlKSk7XG4gIH1cblxuICBzb3J0Q29sdW1uKGNvbHVtbjogYW55KSB7XG4gICAgaWYgKGNvbHVtbi5zb3J0YWJsZSkge1xuICAgICAgaWYgKF8uZ2V0KHRoaXMuc29ydCwgY29sdW1uLmtleSkgPT0gMCkge1xuICAgICAgICB0aGlzLnNvcnQgPSB7fTtcbiAgICAgICAgdGhpcy5zb3J0W2NvbHVtbi5rZXldID0gMVxuICAgICAgfSBlbHNlIGlmIChfLmdldCh0aGlzLnNvcnQsIGNvbHVtbi5rZXkpID09IDEpIHtcbiAgICAgICAgdGhpcy5zb3J0ID0ge307XG4gICAgICAgIHRoaXMuc29ydFtjb2x1bW4ua2V5XSA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNvcnQgPSB7fTtcbiAgICAgICAgdGhpcy5zb3J0W2NvbHVtbi5rZXldID0gMTtcbiAgICAgIH1cbiAgICAgIHRoaXMubG9hZERhdGEoKTsgLy90aGlzLnBhZ2VOb1xuICAgIH1cbiAgfVxufSJdfQ==