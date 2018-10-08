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
var NgxTblComponent = /** @class */ (function () {
    function NgxTblComponent() {
        var _this = this;
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
        this.debouncer.pipe(debounceTime(300), map(function (val) { return _this.loadData(); }));
    }
    Object.defineProperty(NgxTblComponent.prototype, "items", {
        get: /**
         * @return {?}
         */
        function () {
            return this._items;
        },
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            this._items = items;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxTblComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.loadData();
    };
    /**
     * @return {?}
     */
    NgxTblComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.subject.next(true);
    };
    /**
     * @return {?}
     */
    NgxTblComponent.prototype.search = /**
     * @return {?}
     */
    function () {
        this.subject.next(true);
        this.debouncer.next();
    };
    /**
     * @return {?}
     */
    NgxTblComponent.prototype.limitChange = /**
     * @return {?}
     */
    function () {
        this.subject.next(true);
        this.loadData();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NgxTblComponent.prototype.confirmDelete = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.deleteRow = item;
        this.deleteConfirmModal.show();
    };
    /**
     * @return {?}
     */
    NgxTblComponent.prototype.deleteItem = /**
     * @return {?}
     */
    function () {
        this.delete.emit({ item: _.clone(this.deleteRow), tableParams: this.getQueryParams(1) });
        this.deleteRow = {};
        this.deleteConfirmModal.hide();
        this.subject.next(true);
    };
    /**
     * @return {?}
     */
    NgxTblComponent.prototype.closeModal = /**
     * @return {?}
     */
    function () {
        this.deleteConfirmModal.hide();
    };
    /**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    NgxTblComponent.prototype.editRow = /**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    function (item, index) {
        this.edit.emit({ item: _.clone(item), tableParams: this.getQueryParams(1) });
        this.subject.next(true);
    };
    /**
     * @return {?}
     */
    NgxTblComponent.prototype.addNew = /**
     * @return {?}
     */
    function () {
        this.add.emit({ tableParams: this.getQueryParams(1) });
        this.subject.next(true);
    };
    /**
     * @param {?} currentPage
     * @return {?}
     */
    NgxTblComponent.prototype.getQueryParams = /**
     * @param {?} currentPage
     * @return {?}
     */
    function (currentPage) {
        //this.pageNo = currentPage;
        return { search: this.searchParam || '', limit: this.limit, skip: (currentPage - 1) * this.limit, sort: this.sort };
    };
    /**
     * @param {?=} currentPage
     * @return {?}
     */
    NgxTblComponent.prototype.loadData = /**
     * @param {?=} currentPage
     * @return {?}
     */
    function (currentPage) {
        if (currentPage === void 0) { currentPage = 1; }
        this.load.emit(this.getQueryParams(currentPage));
    };
    /**
     * @param {?} column
     * @return {?}
     */
    NgxTblComponent.prototype.sortColumn = /**
     * @param {?} column
     * @return {?}
     */
    function (column) {
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
    };
    NgxTblComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-tbl',
                    template: "\n  <table class=\"table table-striped\">\n  <thead>\n    <tr>\n      <th *ngFor=\"let column of columns\" [ngClass]=\"{'col-sort-asc': sort[column.key] == 1, 'col-sort-desc': sort[column.key] == 0, \n      'col-sort': (column.sortable && (sort[column.key] != 0 || sort[column.key] != 1)), 'narrow':column.narrow }\" (click)=\"sortColumn(column)\">\n      {{column.name}}\n      </th>\n      <th class=\"col-action\" *ngIf=\"!config.allowAction || config.allowAction()\">Actions</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let item of _items?.rows; let i = index;\">\n      <td *ngFor=\"let column of columns\">\n        <div *ngIf=\"!column.cellTemplate\">{{item[column.key]}}</div>\n        <div *ngIf=\"column.cellTemplate\" \n        [ngTemplateOutlet]=\"column.cellTemplate\" [ngTemplateOutletContext]=\"{item: item}\">\n        </div>\n      </td>\n      <td class=\"col-action\" *ngIf=\"!config.allowAction || config.allowAction()\">\n        <div class=\"btn-group\" dropdown>\n          <button id=\"button-basic\" dropdownToggle type=\"button\" class=\"btn dropdown-toggle\" *ngIf=\"config.showAction && config.showAction(item)\"\n                  aria-controls=\"dropdown-basic\">\n                  <i class=\"fa fa-cog\"></i>\n          </button>\n          <ul id=\"dropdown-basic\" class=\"dropdown-menu\">\n            <li *ngIf=\"!config.allowEdit || config.allowEdit(item)\" role=\"menuitem\"><a class=\"dropdown-item\" (click)=\"editRow(item, i)\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Edit</a></li>\n            <li *ngIf=\"!config.allowDelete || config.allowDelete(item)\" role=\"menuitem\"><a class=\"dropdown-item\" (click)=\"confirmDelete(item)\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i> Delete</a></li>\n          </ul>\n        </div>    \n      </td>\n    </tr>\n    <tr *ngIf=\"_items?.total==0\">\n      <td [attr.colspan]=\"columns.length\" class=\"empty-ngx-table-msg\">No records found</td>\n    </tr>\n  </tbody>\n  \n</table>\n<ngx-tbl-pagination [total]=\"_items?.total\" [limit]=\"limit\" (page-change)=\"loadData($event)\" [reset-pagination]=\"resetPagination\"></ngx-tbl-pagination>\n  "
                },] },
    ];
    /** @nocollapse */
    NgxTblComponent.ctorParameters = function () { return []; };
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
    return NgxTblComponent;
}());
export { NgxTblComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRibC1jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdGJsLyIsInNvdXJjZXMiOlsibmd4LXRibC1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFDM0IsTUFBTSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUNqRCxNQUFNLGVBQWUsQ0FBQTtBQUN0QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBRXRDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBRWxELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7Ozs7SUEwRTFCO1FBQUEsaUJBS0M7cUJBN0JlLEVBQUU7b0JBQ04sRUFBRTt1QkFFSSxJQUFJLE9BQU8sRUFBTzt5QkFFaEIsSUFBSSxPQUFPLEVBQUU7c0JBWUssSUFBSSxZQUFZLEVBQU87b0JBQ3pCLElBQUksWUFBWSxFQUFPO29CQUN2QixJQUFJLFlBQVksRUFBRTttQkFDbkIsSUFBSSxZQUFZLEVBQUU7c0JBQ2YsSUFBSSxZQUFZLEVBQUU7UUFJdEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUNqQixZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxRQUFRLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQyxDQUFBO0tBQy9COzBCQW5CRyxrQ0FBSzs7OztRQUdUO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDcEI7Ozs7O2tCQUxTLEtBQVk7WUFDcEIs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SSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQzFCO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO0tBQ0Y7O2dCQS9JRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLFFBQVEsRUFBRSxvbkVBdUNUO2lCQUNGOzs7Ozt1Q0FXRSxTQUFTLFNBQUMsb0JBQW9COzBCQUM5QixLQUFLOzJCQU9MLEtBQUs7MkJBQ0wsTUFBTTt5QkFDTixNQUFNO3lCQUNOLE1BQU07d0JBQ04sTUFBTTsyQkFDTixNQUFNOzRCQUNOLGVBQWUsU0FBQyxZQUFZOzswQkFqRi9COztTQXlEYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIElucHV0LFxuICBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE5neFRibENvbHVtbiB9IGZyb20gJy4vbmd4LXRibC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmV4cG9ydCBpbnRlcmZhY2UgaXRtIHtcbiAgcm93cz86IGFueVtdO1xuICB0b3RhbDogbnVtYmVyO1xufVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRibCcsXG4gIHRlbXBsYXRlOiBgXG4gIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj5cbiAgPHRoZWFkPlxuICAgIDx0cj5cbiAgICAgIDx0aCAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIiBbbmdDbGFzc109XCJ7J2NvbC1zb3J0LWFzYyc6IHNvcnRbY29sdW1uLmtleV0gPT0gMSwgJ2NvbC1zb3J0LWRlc2MnOiBzb3J0W2NvbHVtbi5rZXldID09IDAsIFxuICAgICAgJ2NvbC1zb3J0JzogKGNvbHVtbi5zb3J0YWJsZSAmJiAoc29ydFtjb2x1bW4ua2V5XSAhPSAwIHx8IHNvcnRbY29sdW1uLmtleV0gIT0gMSkpLCAnbmFycm93Jzpjb2x1bW4ubmFycm93IH1cIiAoY2xpY2spPVwic29ydENvbHVtbihjb2x1bW4pXCI+XG4gICAgICB7e2NvbHVtbi5uYW1lfX1cbiAgICAgIDwvdGg+XG4gICAgICA8dGggY2xhc3M9XCJjb2wtYWN0aW9uXCIgKm5nSWY9XCIhY29uZmlnLmFsbG93QWN0aW9uIHx8IGNvbmZpZy5hbGxvd0FjdGlvbigpXCI+QWN0aW9uczwvdGg+XG4gICAgPC90cj5cbiAgPC90aGVhZD5cbiAgPHRib2R5PlxuICAgIDx0ciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBfaXRlbXM/LnJvd3M7IGxldCBpID0gaW5kZXg7XCI+XG4gICAgICA8dGQgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zXCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCIhY29sdW1uLmNlbGxUZW1wbGF0ZVwiPnt7aXRlbVtjb2x1bW4ua2V5XX19PC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJjb2x1bW4uY2VsbFRlbXBsYXRlXCIgXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbHVtbi5jZWxsVGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2l0ZW06IGl0ZW19XCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cImNvbC1hY3Rpb25cIiAqbmdJZj1cIiFjb25maWcuYWxsb3dBY3Rpb24gfHwgY29uZmlnLmFsbG93QWN0aW9uKClcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIGRyb3Bkb3duPlxuICAgICAgICAgIDxidXR0b24gaWQ9XCJidXR0b24tYmFzaWNcIiBkcm9wZG93blRvZ2dsZSB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gZHJvcGRvd24tdG9nZ2xlXCIgKm5nSWY9XCJjb25maWcuc2hvd0FjdGlvbiAmJiBjb25maWcuc2hvd0FjdGlvbihpdGVtKVwiXG4gICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPVwiZHJvcGRvd24tYmFzaWNcIj5cbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY29nXCI+PC9pPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDx1bCBpZD1cImRyb3Bkb3duLWJhc2ljXCIgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCIhY29uZmlnLmFsbG93RWRpdCB8fCBjb25maWcuYWxsb3dFZGl0KGl0ZW0pXCIgcm9sZT1cIm1lbnVpdGVtXCI+PGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cImVkaXRSb3coaXRlbSwgaSlcIj48aSBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gRWRpdDwvYT48L2xpPlxuICAgICAgICAgICAgPGxpICpuZ0lmPVwiIWNvbmZpZy5hbGxvd0RlbGV0ZSB8fCBjb25maWcuYWxsb3dEZWxldGUoaXRlbSlcIiByb2xlPVwibWVudWl0ZW1cIj48YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwiY29uZmlybURlbGV0ZShpdGVtKVwiPjxpIGNsYXNzPVwiZmEgZmEtdHJhc2hcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IERlbGV0ZTwvYT48L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PiAgICBcbiAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgICA8dHIgKm5nSWY9XCJfaXRlbXM/LnRvdGFsPT0wXCI+XG4gICAgICA8dGQgW2F0dHIuY29sc3Bhbl09XCJjb2x1bW5zLmxlbmd0aFwiIGNsYXNzPVwiZW1wdHktbmd4LXRhYmxlLW1zZ1wiPk5vIHJlY29yZHMgZm91bmQ8L3RkPlxuICAgIDwvdHI+XG4gIDwvdGJvZHk+XG4gIFxuPC90YWJsZT5cbjxuZ3gtdGJsLXBhZ2luYXRpb24gW3RvdGFsXT1cIl9pdGVtcz8udG90YWxcIiBbbGltaXRdPVwibGltaXRcIiAocGFnZS1jaGFuZ2UpPVwibG9hZERhdGEoJGV2ZW50KVwiIFtyZXNldC1wYWdpbmF0aW9uXT1cInJlc2V0UGFnaW5hdGlvblwiPjwvbmd4LXRibC1wYWdpbmF0aW9uPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5neFRibENvbXBvbmVudCB7XG4gIF9pdGVtczogYW55O1xuICBsaW1pdDogbnVtYmVyID0gMTA7XG4gIHNvcnQ6IGFueSA9IHt9O1xuICBzZWFyY2hQYXJhbTogc3RyaW5nO1xuICBwcml2YXRlIHN1YmplY3QgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHJlc2V0UGFnaW5hdGlvbjogT2JzZXJ2YWJsZTxhbnk+O1xuICBwcml2YXRlIGRlYm91bmNlciA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgZGVsZXRlUm93OiBhbnk7XG5cbiAgQFZpZXdDaGlsZCgnZGVsZXRlQ29uZmlybU1vZGFsJykgZGVsZXRlQ29uZmlybU1vZGFsOiBhbnk7XG4gIEBJbnB1dCgpXG4gIHNldCBpdGVtcyhpdGVtczogYW55W10pIHtcbiAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICB9XG4gIGdldCBpdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gIH1cbiAgQElucHV0KCkgY29uZmlnOiBhbnk7XG4gIEBPdXRwdXQoKSB1cGRhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBsb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZWRpdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhZGQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ3hUYmxDb2x1bW4pIGNvbHVtbnM6IFF1ZXJ5TGlzdDxOZ3hUYmxDb2x1bW4+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmVzZXRQYWdpbmF0aW9uID0gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuZGVib3VuY2VyLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgIG1hcCh2YWwgPT4gdGhpcy5sb2FkRGF0YSgpKSlcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9hZERhdGEoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgICB0aGlzLmRlYm91bmNlci5uZXh0KClcbiAgfVxuXG4gIGxpbWl0Q2hhbmdlKCkge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICAgIHRoaXMubG9hZERhdGEoKTtcbiAgfVxuXG4gIGNvbmZpcm1EZWxldGUoaXRlbTogYW55KSB7XG4gICAgdGhpcy5kZWxldGVSb3cgPSBpdGVtO1xuICAgIHRoaXMuZGVsZXRlQ29uZmlybU1vZGFsLnNob3coKTtcbiAgfVxuXG4gIGRlbGV0ZUl0ZW0oKSB7XG4gICAgdGhpcy5kZWxldGUuZW1pdCh7IGl0ZW06IF8uY2xvbmUodGhpcy5kZWxldGVSb3cpLCB0YWJsZVBhcmFtczogdGhpcy5nZXRRdWVyeVBhcmFtcygxKSB9KTtcbiAgICB0aGlzLmRlbGV0ZVJvdyA9IHt9O1xuICAgIHRoaXMuZGVsZXRlQ29uZmlybU1vZGFsLmhpZGUoKTtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGNsb3NlTW9kYWwoKSB7XG4gICAgdGhpcy5kZWxldGVDb25maXJtTW9kYWwuaGlkZSgpO1xuICB9XG5cbiAgZWRpdFJvdyhpdGVtOiBhbnksIGluZGV4OiBhbnkpIHtcbiAgICB0aGlzLmVkaXQuZW1pdCh7IGl0ZW06IF8uY2xvbmUoaXRlbSksIHRhYmxlUGFyYW1zOiB0aGlzLmdldFF1ZXJ5UGFyYW1zKDEpIH0pO1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICB9XG5cbiAgYWRkTmV3KCkge1xuICAgIHRoaXMuYWRkLmVtaXQoeyB0YWJsZVBhcmFtczogdGhpcy5nZXRRdWVyeVBhcmFtcygxKSB9KTtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGdldFF1ZXJ5UGFyYW1zKGN1cnJlbnRQYWdlOiBhbnkpIHtcbiAgICAvL3RoaXMucGFnZU5vID0gY3VycmVudFBhZ2U7XG4gICAgcmV0dXJuIHsgc2VhcmNoOiB0aGlzLnNlYXJjaFBhcmFtIHx8ICcnLCBsaW1pdDogdGhpcy5saW1pdCwgc2tpcDogKGN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLmxpbWl0LCBzb3J0OiB0aGlzLnNvcnQgfTtcbiAgfVxuXG4gIGxvYWREYXRhKGN1cnJlbnRQYWdlOiBudW1iZXIgPSAxKSB7XG4gICAgdGhpcy5sb2FkLmVtaXQodGhpcy5nZXRRdWVyeVBhcmFtcyhjdXJyZW50UGFnZSkpO1xuICB9XG5cbiAgc29ydENvbHVtbihjb2x1bW46IGFueSkge1xuICAgIGlmIChjb2x1bW4uc29ydGFibGUpIHtcbiAgICAgIGlmIChfLmdldCh0aGlzLnNvcnQsIGNvbHVtbi5rZXkpID09IDApIHtcbiAgICAgICAgdGhpcy5zb3J0ID0ge307XG4gICAgICAgIHRoaXMuc29ydFtjb2x1bW4ua2V5XSA9IDFcbiAgICAgIH0gZWxzZSBpZiAoXy5nZXQodGhpcy5zb3J0LCBjb2x1bW4ua2V5KSA9PSAxKSB7XG4gICAgICAgIHRoaXMuc29ydCA9IHt9O1xuICAgICAgICB0aGlzLnNvcnRbY29sdW1uLmtleV0gPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zb3J0ID0ge307XG4gICAgICAgIHRoaXMuc29ydFtjb2x1bW4ua2V5XSA9IDE7XG4gICAgICB9XG4gICAgICB0aGlzLmxvYWREYXRhKCk7IC8vdGhpcy5wYWdlTm9cbiAgICB9XG4gIH1cbn0iXX0=