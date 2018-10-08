import { Directive, Input, ContentChild, Component, ViewChild, Output, EventEmitter, ContentChildren, ElementRef, Renderer2, Attribute, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime, map } from 'rxjs/operators';
import { clone, get, toNumber, range } from 'lodash';
import { FormControl, ControlContainer } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTblColumn = /** @class */ (function () {
    function NgxTblColumn() {
    }
    NgxTblColumn.decorators = [
        { type: Directive, args: [{
                    selector: 'ngx-tbl-column'
                },] },
    ];
    /** @nocollapse */
    NgxTblColumn.propDecorators = {
        "name": [{ type: Input },],
        "key": [{ type: Input },],
        "sortable": [{ type: Input },],
        "narrow": [{ type: Input },],
        "cellTemplate": [{ type: ContentChild, args: ['ngxTblCellTemplate',] },],
    };
    return NgxTblColumn;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
        this.delete.emit({ item: clone(this.deleteRow), tableParams: this.getQueryParams(1) });
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
        this.edit.emit({ item: clone(item), tableParams: this.getQueryParams(1) });
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
            if (get(this.sort, column.key) == 0) {
                this.sort = {};
                this.sort[column.key] = 1;
            }
            else if (get(this.sort, column.key) == 1) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTblControl = /** @class */ (function () {
    function NgxTblControl(container, name, validation, renderer, el) {
        this.container = container;
        this.name = name;
        this.renderer = renderer;
        this.el = el;
        this.form = (/** @type {?} */ (this.container)).form;
        this.form.removeControl(this.name);
        if (!this.form.get(this.name)) {
            this.form.addControl(this.name, new FormControl(''));
        }
    }
    NgxTblControl.decorators = [
        { type: Directive, args: [{
                    selector: '[formControlName][ngx-tbl-control]',
                },] },
    ];
    /** @nocollapse */
    NgxTblControl.ctorParameters = function () { return [
        { type: ControlContainer, },
        { type: undefined, decorators: [{ type: Attribute, args: ['formControlName',] },] },
        { type: undefined, decorators: [{ type: Attribute, args: ['validation',] },] },
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    NgxTblControl.propDecorators = {
        "validators": [{ type: Input, args: ['validators',] },],
    };
    return NgxTblControl;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTblPagination = /** @class */ (function () {
    function NgxTblPagination() {
        this.pageChanged = new EventEmitter();
        this.reset = true;
        this.pager = {};
    }
    /**
     * @param {?} page
     * @return {?}
     */
    NgxTblPagination.prototype.setPage = /**
     * @param {?} page
     * @return {?}
     */
    function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pageChanged.emit(page);
        this.pager = this.getPager(this.total, page, toNumber(this.limit));
    };
    /**
     * @return {?}
     */
    NgxTblPagination.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.resetPagination.subscribe(function () {
            _this.reset = true;
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxTblPagination.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.limit = parseInt(this.limit);
        if (this.total >= 0 && this.reset) {
            this.reset = false;
            this.pager = this.getPager(this.total, 1, toNumber(this.limit));
        }
    };
    /**
     * @param {?} totalItems
     * @param {?=} currentPage
     * @param {?=} pageSize
     * @return {?}
     */
    NgxTblPagination.prototype.getPager = /**
     * @param {?} totalItems
     * @param {?=} currentPage
     * @param {?=} pageSize
     * @return {?}
     */
    function (totalItems, currentPage, pageSize) {
        if (currentPage === void 0) { currentPage = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        var /** @type {?} */ totalPages = Math.ceil(totalItems / pageSize);
        var /** @type {?} */ startPage, /** @type {?} */ endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        }
        else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            }
            else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            }
            else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        var /** @type {?} */ startIndex = (currentPage - 1) * pageSize;
        var /** @type {?} */ endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        var /** @type {?} */ pages = range(startPage, endPage + 1);
        var /** @type {?} */ endCount = startIndex + this.limit;
        if (endCount > this.total) {
            endCount = this.total;
        }
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
    };
    NgxTblPagination.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-tbl-pagination',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n    .pagination { float: right; margin:0 0 7px 0; }\n    .pagination li{cursor:pointer;}\n    .paging-info {font-style: italic;color: #808080;line-height: 2;}\n  "],
                    template: "\n  <div class=\"col-md-3 col-xs-3 col-lg-3 col-sm-3 paging-info\" *ngIf=\"total\">\n    <span>showing {{this.pager.startIndex+1}} to {{this.pager.endCount}} of {{total}}</span>\n  </div>\n  <div class=\"col-md-9 col-xs-9 col-lg-9 col-sm-9\">\n  <ul *ngIf=\"pager.pages && pager.pages.length\" class=\"pagination\">\n    <li [ngClass]=\"{disabled:pager.currentPage === 1}\">\n        <a (click)=\"setPage(1)\">First</a>\n    </li>\n    <li [ngClass]=\"{disabled:pager.currentPage === 1}\">\n        <a (click)=\"setPage(pager.currentPage - 1)\">Prev</a>\n    </li>\n    <li *ngFor=\"let page of pager.pages\" [ngClass]=\"{active:pager.currentPage === page}\">\n        <a (click)=\"setPage(page)\">{{page}}</a>\n    </li>\n    <li [ngClass]=\"{disabled:pager.currentPage === pager.totalPages}\">\n        <a (click)=\"setPage(pager.currentPage + 1)\">Next</a>\n    </li>\n    <li [ngClass]=\"{disabled:pager.currentPage === pager.totalPages}\">\n        <a (click)=\"setPage(pager.totalPages)\">Last</a>\n    </li>\n  </ul>\n  </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgxTblPagination.ctorParameters = function () { return []; };
    NgxTblPagination.propDecorators = {
        "resetPagination": [{ type: Input, args: ['reset-pagination',] },],
        "total": [{ type: Input, args: ['total',] },],
        "limit": [{ type: Input },],
        "pageChanged": [{ type: Output, args: ['page-change',] },],
    };
    return NgxTblPagination;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTblModule = /** @class */ (function () {
    function NgxTblModule() {
    }
    NgxTblModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        NgxTblComponent,
                        NgxTblColumn,
                        NgxTblControl,
                        NgxTblPagination
                    ],
                    exports: [
                        NgxTblComponent,
                        NgxTblColumn,
                        NgxTblControl
                    ]
                },] },
    ];
    return NgxTblModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NgxTblModule, NgxTblControl, NgxTblColumn, NgxTblPagination, NgxTblComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRibC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LXRibC9uZ3gtdGJsLWNvbHVtbi5jb21wb25lbnQudHMiLCJuZzovL25neC10Ymwvbmd4LXRibC1jb21wb25lbnQudHMiLCJuZzovL25neC10Ymwvbmd4LXRibC1jb250cm9sLnRzIiwibmc6Ly9uZ3gtdGJsL25neC10YmwtcGFnaW5hdGlvbi9uZ3gtdGJsLXBhZ2luYXRpb24udHMiLCJuZzovL25neC10Ymwvbmd4LXRibC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ25neC10YmwtY29sdW1uJ1xufSlcblxuZXhwb3J0IGNsYXNzIE5neFRibENvbHVtbiB7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkga2V5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNvcnRhYmxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG5hcnJvdzogYm9vbGVhbjtcblxuICBAQ29udGVudENoaWxkKCduZ3hUYmxDZWxsVGVtcGxhdGUnKSBjZWxsVGVtcGxhdGU6IGFueTtcbn0iLCJpbXBvcnQge1xuICBDb21wb25lbnQsIFZpZXdDaGlsZCwgSW5wdXQsXG4gIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCdcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTmd4VGJsQ29sdW1uIH0gZnJvbSAnLi9uZ3gtdGJsLWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuZXhwb3J0IGludGVyZmFjZSBpdG0ge1xuICByb3dzPzogYW55W107XG4gIHRvdGFsOiBudW1iZXI7XG59XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdGJsJyxcbiAgdGVtcGxhdGU6IGBcbiAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPlxuICA8dGhlYWQ+XG4gICAgPHRyPlxuICAgICAgPHRoICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiIFtuZ0NsYXNzXT1cInsnY29sLXNvcnQtYXNjJzogc29ydFtjb2x1bW4ua2V5XSA9PSAxLCAnY29sLXNvcnQtZGVzYyc6IHNvcnRbY29sdW1uLmtleV0gPT0gMCwgXG4gICAgICAnY29sLXNvcnQnOiAoY29sdW1uLnNvcnRhYmxlICYmIChzb3J0W2NvbHVtbi5rZXldICE9IDAgfHwgc29ydFtjb2x1bW4ua2V5XSAhPSAxKSksICduYXJyb3cnOmNvbHVtbi5uYXJyb3cgfVwiIChjbGljayk9XCJzb3J0Q29sdW1uKGNvbHVtbilcIj5cbiAgICAgIHt7Y29sdW1uLm5hbWV9fVxuICAgICAgPC90aD5cbiAgICAgIDx0aCBjbGFzcz1cImNvbC1hY3Rpb25cIiAqbmdJZj1cIiFjb25maWcuYWxsb3dBY3Rpb24gfHwgY29uZmlnLmFsbG93QWN0aW9uKClcIj5BY3Rpb25zPC90aD5cbiAgICA8L3RyPlxuICA8L3RoZWFkPlxuICA8dGJvZHk+XG4gICAgPHRyICpuZ0Zvcj1cImxldCBpdGVtIG9mIF9pdGVtcz8ucm93czsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIiFjb2x1bW4uY2VsbFRlbXBsYXRlXCI+e3tpdGVtW2NvbHVtbi5rZXldfX08L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImNvbHVtbi5jZWxsVGVtcGxhdGVcIiBcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLmNlbGxUZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7aXRlbTogaXRlbX1cIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3RkPlxuICAgICAgPHRkIGNsYXNzPVwiY29sLWFjdGlvblwiICpuZ0lmPVwiIWNvbmZpZy5hbGxvd0FjdGlvbiB8fCBjb25maWcuYWxsb3dBY3Rpb24oKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgZHJvcGRvd24+XG4gICAgICAgICAgPGJ1dHRvbiBpZD1cImJ1dHRvbi1iYXNpY1wiIGRyb3Bkb3duVG9nZ2xlIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBkcm9wZG93bi10b2dnbGVcIiAqbmdJZj1cImNvbmZpZy5zaG93QWN0aW9uICYmIGNvbmZpZy5zaG93QWN0aW9uKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9XCJkcm9wZG93bi1iYXNpY1wiPlxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jb2dcIj48L2k+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPHVsIGlkPVwiZHJvcGRvd24tYmFzaWNcIiBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj5cbiAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFjb25maWcuYWxsb3dFZGl0IHx8IGNvbmZpZy5hbGxvd0VkaXQoaXRlbSlcIiByb2xlPVwibWVudWl0ZW1cIj48YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwiZWRpdFJvdyhpdGVtLCBpKVwiPjxpIGNsYXNzPVwiZmEgZmEtcGVuY2lsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBFZGl0PC9hPjwvbGk+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCIhY29uZmlnLmFsbG93RGVsZXRlIHx8IGNvbmZpZy5hbGxvd0RlbGV0ZShpdGVtKVwiIHJvbGU9XCJtZW51aXRlbVwiPjxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJjb25maXJtRGVsZXRlKGl0ZW0pXCI+PGkgY2xhc3M9XCJmYSBmYS10cmFzaFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gRGVsZXRlPC9hPjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+ICAgIFxuICAgICAgPC90ZD5cbiAgICA8L3RyPlxuICAgIDx0ciAqbmdJZj1cIl9pdGVtcz8udG90YWw9PTBcIj5cbiAgICAgIDx0ZCBbYXR0ci5jb2xzcGFuXT1cImNvbHVtbnMubGVuZ3RoXCIgY2xhc3M9XCJlbXB0eS1uZ3gtdGFibGUtbXNnXCI+Tm8gcmVjb3JkcyBmb3VuZDwvdGQ+XG4gICAgPC90cj5cbiAgPC90Ym9keT5cbiAgXG48L3RhYmxlPlxuPG5neC10YmwtcGFnaW5hdGlvbiBbdG90YWxdPVwiX2l0ZW1zPy50b3RhbFwiIFtsaW1pdF09XCJsaW1pdFwiIChwYWdlLWNoYW5nZSk9XCJsb2FkRGF0YSgkZXZlbnQpXCIgW3Jlc2V0LXBhZ2luYXRpb25dPVwicmVzZXRQYWdpbmF0aW9uXCI+PC9uZ3gtdGJsLXBhZ2luYXRpb24+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmd4VGJsQ29tcG9uZW50IHtcbiAgX2l0ZW1zOiBhbnk7XG4gIGxpbWl0OiBudW1iZXIgPSAxMDtcbiAgc29ydDogYW55ID0ge307XG4gIHNlYXJjaFBhcmFtOiBzdHJpbmc7XG4gIHByaXZhdGUgc3ViamVjdCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcmVzZXRQYWdpbmF0aW9uOiBPYnNlcnZhYmxlPGFueT47XG4gIHByaXZhdGUgZGVib3VuY2VyID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBkZWxldGVSb3c6IGFueTtcblxuICBAVmlld0NoaWxkKCdkZWxldGVDb25maXJtTW9kYWwnKSBkZWxldGVDb25maXJtTW9kYWw6IGFueTtcbiAgQElucHV0KClcbiAgc2V0IGl0ZW1zKGl0ZW1zOiBhbnlbXSkge1xuICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG4gIH1cbiAgZ2V0IGl0ZW1zKCkge1xuICAgIHJldHVybiB0aGlzLl9pdGVtcztcbiAgfVxuICBASW5wdXQoKSBjb25maWc6IGFueTtcbiAgQE91dHB1dCgpIHVwZGF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBlZGl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFkZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWxldGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAQ29udGVudENoaWxkcmVuKE5neFRibENvbHVtbikgY29sdW1uczogUXVlcnlMaXN0PE5neFRibENvbHVtbj47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yZXNldFBhZ2luYXRpb24gPSB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5kZWJvdW5jZXIucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSgzMDApLFxuICAgICAgbWFwKHZhbCA9PiB0aGlzLmxvYWREYXRhKCkpKVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5sb2FkRGF0YSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICB9XG5cbiAgc2VhcmNoKCkge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICAgIHRoaXMuZGVib3VuY2VyLm5leHQoKVxuICB9XG5cbiAgbGltaXRDaGFuZ2UoKSB7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQodHJ1ZSk7XG4gICAgdGhpcy5sb2FkRGF0YSgpO1xuICB9XG5cbiAgY29uZmlybURlbGV0ZShpdGVtOiBhbnkpIHtcbiAgICB0aGlzLmRlbGV0ZVJvdyA9IGl0ZW07XG4gICAgdGhpcy5kZWxldGVDb25maXJtTW9kYWwuc2hvdygpO1xuICB9XG5cbiAgZGVsZXRlSXRlbSgpIHtcbiAgICB0aGlzLmRlbGV0ZS5lbWl0KHsgaXRlbTogXy5jbG9uZSh0aGlzLmRlbGV0ZVJvdyksIHRhYmxlUGFyYW1zOiB0aGlzLmdldFF1ZXJ5UGFyYW1zKDEpIH0pO1xuICAgIHRoaXMuZGVsZXRlUm93ID0ge307XG4gICAgdGhpcy5kZWxldGVDb25maXJtTW9kYWwuaGlkZSgpO1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICB9XG5cbiAgY2xvc2VNb2RhbCgpIHtcbiAgICB0aGlzLmRlbGV0ZUNvbmZpcm1Nb2RhbC5oaWRlKCk7XG4gIH1cblxuICBlZGl0Um93KGl0ZW06IGFueSwgaW5kZXg6IGFueSkge1xuICAgIHRoaXMuZWRpdC5lbWl0KHsgaXRlbTogXy5jbG9uZShpdGVtKSwgdGFibGVQYXJhbXM6IHRoaXMuZ2V0UXVlcnlQYXJhbXMoMSkgfSk7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQodHJ1ZSk7XG4gIH1cblxuICBhZGROZXcoKSB7XG4gICAgdGhpcy5hZGQuZW1pdCh7IHRhYmxlUGFyYW1zOiB0aGlzLmdldFF1ZXJ5UGFyYW1zKDEpIH0pO1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICB9XG5cbiAgZ2V0UXVlcnlQYXJhbXMoY3VycmVudFBhZ2U6IGFueSkge1xuICAgIC8vdGhpcy5wYWdlTm8gPSBjdXJyZW50UGFnZTtcbiAgICByZXR1cm4geyBzZWFyY2g6IHRoaXMuc2VhcmNoUGFyYW0gfHwgJycsIGxpbWl0OiB0aGlzLmxpbWl0LCBza2lwOiAoY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMubGltaXQsIHNvcnQ6IHRoaXMuc29ydCB9O1xuICB9XG5cbiAgbG9hZERhdGEoY3VycmVudFBhZ2U6IG51bWJlciA9IDEpIHtcbiAgICB0aGlzLmxvYWQuZW1pdCh0aGlzLmdldFF1ZXJ5UGFyYW1zKGN1cnJlbnRQYWdlKSk7XG4gIH1cblxuICBzb3J0Q29sdW1uKGNvbHVtbjogYW55KSB7XG4gICAgaWYgKGNvbHVtbi5zb3J0YWJsZSkge1xuICAgICAgaWYgKF8uZ2V0KHRoaXMuc29ydCwgY29sdW1uLmtleSkgPT0gMCkge1xuICAgICAgICB0aGlzLnNvcnQgPSB7fTtcbiAgICAgICAgdGhpcy5zb3J0W2NvbHVtbi5rZXldID0gMVxuICAgICAgfSBlbHNlIGlmIChfLmdldCh0aGlzLnNvcnQsIGNvbHVtbi5rZXkpID09IDEpIHtcbiAgICAgICAgdGhpcy5zb3J0ID0ge307XG4gICAgICAgIHRoaXMuc29ydFtjb2x1bW4ua2V5XSA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNvcnQgPSB7fTtcbiAgICAgICAgdGhpcy5zb3J0W2NvbHVtbi5rZXldID0gMTtcbiAgICAgIH1cbiAgICAgIHRoaXMubG9hZERhdGEoKTsgLy90aGlzLnBhZ2VOb1xuICAgIH1cbiAgfVxufSIsImltcG9ydCB7IERpcmVjdGl2ZSwgT3V0cHV0LCBJbnB1dCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLFxuICBBdHRyaWJ1dGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiBpbXBvcnQgeyBGb3JtQ29udHJvbCwgQ29udHJvbENvbnRhaW5lciwgXG4gICBGb3JtR3JvdXBEaXJlY3RpdmUsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4gXG4gQERpcmVjdGl2ZSh7XG4gICBzZWxlY3RvcjogJ1tmb3JtQ29udHJvbE5hbWVdW25neC10YmwtY29udHJvbF0nLFxuIH0pXG4gXG4gZXhwb3J0IGNsYXNzIE5neFRibENvbnRyb2wge1xuICAgQElucHV0KCd2YWxpZGF0b3JzJykgdmFsaWRhdG9yczogYW55O1xuICAgcHJpdmF0ZSBmb3JtOiBhbnk7XG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhaW5lcjogQ29udHJvbENvbnRhaW5lciwgQEF0dHJpYnV0ZSgnZm9ybUNvbnRyb2xOYW1lJykgcHJpdmF0ZSBuYW1lOiBhbnksIFxuICAgQEF0dHJpYnV0ZSgndmFsaWRhdGlvbicpIHZhbGlkYXRpb246IGFueSwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgIHRoaXMuZm9ybSA9ICh0aGlzLmNvbnRhaW5lciBhcyBGb3JtR3JvdXBEaXJlY3RpdmUpLmZvcm07XG4gICAgIHRoaXMuZm9ybS5yZW1vdmVDb250cm9sKHRoaXMubmFtZSk7XG4gICAgIGlmICghdGhpcy5mb3JtLmdldCh0aGlzLm5hbWUpKSB7XG4gICAgICAgdGhpcy5mb3JtLmFkZENvbnRyb2wodGhpcy5uYW1lLCBuZXcgRm9ybUNvbnRyb2woJycpKTtcbiAgICAgfVxuICAgfVxuIH0iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuZGVjbGFyZSB2YXIgcGFyc2VJbnQ6IGFueVxuZGVjbGFyZSB2YXIgTWF0aDogYW55XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdGJsLXBhZ2luYXRpb24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbYFxuICAgIC5wYWdpbmF0aW9uIHsgZmxvYXQ6IHJpZ2h0OyBtYXJnaW46MCAwIDdweCAwOyB9XG4gICAgLnBhZ2luYXRpb24gbGl7Y3Vyc29yOnBvaW50ZXI7fVxuICAgIC5wYWdpbmctaW5mbyB7Zm9udC1zdHlsZTogaXRhbGljO2NvbG9yOiAjODA4MDgwO2xpbmUtaGVpZ2h0OiAyO31cbiAgYF0sXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBjb2wteHMtMyBjb2wtbGctMyBjb2wtc20tMyBwYWdpbmctaW5mb1wiICpuZ0lmPVwidG90YWxcIj5cbiAgICA8c3Bhbj5zaG93aW5nIHt7dGhpcy5wYWdlci5zdGFydEluZGV4KzF9fSB0byB7e3RoaXMucGFnZXIuZW5kQ291bnR9fSBvZiB7e3RvdGFsfX08L3NwYW4+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiY29sLW1kLTkgY29sLXhzLTkgY29sLWxnLTkgY29sLXNtLTlcIj5cbiAgPHVsICpuZ0lmPVwicGFnZXIucGFnZXMgJiYgcGFnZXIucGFnZXMubGVuZ3RoXCIgY2xhc3M9XCJwYWdpbmF0aW9uXCI+XG4gICAgPGxpIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDpwYWdlci5jdXJyZW50UGFnZSA9PT0gMX1cIj5cbiAgICAgICAgPGEgKGNsaWNrKT1cInNldFBhZ2UoMSlcIj5GaXJzdDwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IDF9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKHBhZ2VyLmN1cnJlbnRQYWdlIC0gMSlcIj5QcmV2PC9hPlxuICAgIDwvbGk+XG4gICAgPGxpICpuZ0Zvcj1cImxldCBwYWdlIG9mIHBhZ2VyLnBhZ2VzXCIgW25nQ2xhc3NdPVwie2FjdGl2ZTpwYWdlci5jdXJyZW50UGFnZSA9PT0gcGFnZX1cIj5cbiAgICAgICAgPGEgKGNsaWNrKT1cInNldFBhZ2UocGFnZSlcIj57e3BhZ2V9fTwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IHBhZ2VyLnRvdGFsUGFnZXN9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKHBhZ2VyLmN1cnJlbnRQYWdlICsgMSlcIj5OZXh0PC9hPlxuICAgIDwvbGk+XG4gICAgPGxpIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDpwYWdlci5jdXJyZW50UGFnZSA9PT0gcGFnZXIudG90YWxQYWdlc31cIj5cbiAgICAgICAgPGEgKGNsaWNrKT1cInNldFBhZ2UocGFnZXIudG90YWxQYWdlcylcIj5MYXN0PC9hPlxuICAgIDwvbGk+XG4gIDwvdWw+XG4gIDwvZGl2PlxuICBgXG59KVxuXG5leHBvcnQgY2xhc3MgTmd4VGJsUGFnaW5hdGlvbiB7XG4gIEBJbnB1dCgncmVzZXQtcGFnaW5hdGlvbicpIHJlc2V0UGFnaW5hdGlvbjogYW55O1xuICBASW5wdXQoJ3RvdGFsJykgdG90YWw6IGFueTtcbiAgQElucHV0KCkgbGltaXQ6IGFueTtcbiAgQE91dHB1dCgncGFnZS1jaGFuZ2UnKSBwYWdlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHJpdmF0ZSByZXNldDogYm9vbGVhbiA9IHRydWU7XG4gIHBhZ2VyOiBhbnkgPSB7fTtcblxuICBzZXRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgIGlmIChwYWdlIDwgMSB8fCBwYWdlID4gdGhpcy5wYWdlci50b3RhbFBhZ2VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucGFnZUNoYW5nZWQuZW1pdChwYWdlKTtcbiAgICB0aGlzLnBhZ2VyID0gdGhpcy5nZXRQYWdlcih0aGlzLnRvdGFsLCBwYWdlLCBfLnRvTnVtYmVyKHRoaXMubGltaXQpKTtcbiAgfVxuICBcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJlc2V0UGFnaW5hdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5yZXNldCA9IHRydWU7XG4gICAgfSlcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIHRoaXMubGltaXQgPSBwYXJzZUludCh0aGlzLmxpbWl0KTtcbiAgICBpZiAodGhpcy50b3RhbCA+PSAwICYmIHRoaXMucmVzZXQpIHtcbiAgICAgIHRoaXMucmVzZXQgPSBmYWxzZTtcbiAgICAgIHRoaXMucGFnZXIgPSB0aGlzLmdldFBhZ2VyKHRoaXMudG90YWwsIDEsIF8udG9OdW1iZXIodGhpcy5saW1pdCkpO1xuICAgIH1cbiAgfVxuXG4gIGdldFBhZ2VyKHRvdGFsSXRlbXM6IG51bWJlciwgY3VycmVudFBhZ2U6IG51bWJlciA9IDEsIHBhZ2VTaXplOiBudW1iZXIgPSAxMCkge1xuICAgIGxldCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBwYWdlU2l6ZSk7XG4gICAgbGV0IHN0YXJ0UGFnZTogbnVtYmVyLCBlbmRQYWdlOiBudW1iZXI7XG4gICAgaWYgKHRvdGFsUGFnZXMgPD0gMTApIHtcbiAgICAgIHN0YXJ0UGFnZSA9IDE7XG4gICAgICBlbmRQYWdlID0gdG90YWxQYWdlcztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGN1cnJlbnRQYWdlIDw9IDYpIHtcbiAgICAgICAgc3RhcnRQYWdlID0gMTtcbiAgICAgICAgZW5kUGFnZSA9IDEwO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50UGFnZSArIDQgPj0gdG90YWxQYWdlcykge1xuICAgICAgICBzdGFydFBhZ2UgPSB0b3RhbFBhZ2VzIC0gOTtcbiAgICAgICAgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFydFBhZ2UgPSBjdXJyZW50UGFnZSAtIDU7XG4gICAgICAgIGVuZFBhZ2UgPSBjdXJyZW50UGFnZSArIDQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHN0YXJ0SW5kZXggPSAoY3VycmVudFBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xuICAgIGxldCBlbmRJbmRleCA9IE1hdGgubWluKHN0YXJ0SW5kZXggKyBwYWdlU2l6ZSAtIDEsIHRvdGFsSXRlbXMgLSAxKTtcblxuICAgIGxldCBwYWdlcyA9IF8ucmFuZ2Uoc3RhcnRQYWdlLCBlbmRQYWdlICsgMSk7XG5cbiAgICBsZXQgZW5kQ291bnQgPSBzdGFydEluZGV4ICsgdGhpcy5saW1pdDtcbiAgICBpZiAoZW5kQ291bnQgPiB0aGlzLnRvdGFsKSB7IGVuZENvdW50ID0gdGhpcy50b3RhbCB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvdGFsSXRlbXM6IHRvdGFsSXRlbXMsXG4gICAgICBjdXJyZW50UGFnZTogY3VycmVudFBhZ2UsXG4gICAgICBwYWdlU2l6ZTogcGFnZVNpemUsXG4gICAgICB0b3RhbFBhZ2VzOiB0b3RhbFBhZ2VzLFxuICAgICAgc3RhcnRQYWdlOiBzdGFydFBhZ2UsXG4gICAgICBlbmRQYWdlOiBlbmRQYWdlLFxuICAgICAgc3RhcnRJbmRleDogc3RhcnRJbmRleCxcbiAgICAgIGVuZEluZGV4OiBlbmRJbmRleCxcbiAgICAgIHBhZ2VzOiBwYWdlcyxcbiAgICAgIGVuZENvdW50OiBlbmRDb3VudFxuICAgIH07XG4gIH1cbn0iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5pbXBvcnQgeyBOZ3hUYmxDb21wb25lbnQgfSBmcm9tICcuL25neC10YmwtY29tcG9uZW50JztcbmltcG9ydCB7IE5neFRibENvbHVtbiB9IGZyb20gJy4vbmd4LXRibC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7IE5neFRibENvbnRyb2wgfSBmcm9tICcuL25neC10YmwtY29udHJvbCc7XG5pbXBvcnQgeyBOZ3hUYmxQYWdpbmF0aW9uIH0gZnJvbSAnLi9uZ3gtdGJsLXBhZ2luYXRpb24vbmd4LXRibC1wYWdpbmF0aW9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ3hUYmxDb21wb25lbnQsXG4gICAgTmd4VGJsQ29sdW1uLFxuICAgIE5neFRibENvbnRyb2wsXG4gICAgTmd4VGJsUGFnaW5hdGlvblxuICBdLFxuICBleHBvcnRzOiBbIFxuICAgIE5neFRibENvbXBvbmVudCxcbiAgICBOZ3hUYmxDb2x1bW4sXG4gICAgTmd4VGJsQ29udHJvbFxuICBdXG59KVxuXG5leHBvcnQgY2xhc3MgTmd4VGJsTW9kdWxlIHtcbiAgXG59Il0sIm5hbWVzIjpbIl8uY2xvbmUiLCJfLmdldCIsIl8udG9OdW1iZXIiLCJfLnJhbmdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O2dCQUVDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUMzQjs7Ozt5QkFHRSxLQUFLO3dCQUNMLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLO2lDQUVMLFlBQVksU0FBQyxvQkFBb0I7O3VCQVpwQzs7Ozs7OztBQ0FBO0lBbUZFO1FBQUEsaUJBS0M7cUJBN0JlLEVBQUU7b0JBQ04sRUFBRTt1QkFFSSxJQUFJLE9BQU8sRUFBTzt5QkFFaEIsSUFBSSxPQUFPLEVBQUU7c0JBWUssSUFBSSxZQUFZLEVBQU87b0JBQ3pCLElBQUksWUFBWSxFQUFPO29CQUN2QixJQUFJLFlBQVksRUFBRTttQkFDbkIsSUFBSSxZQUFZLEVBQUU7c0JBQ2YsSUFBSSxZQUFZLEVBQUU7UUFJdEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUNqQixZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxRQUFRLEVBQUUsR0FBQSxDQUFDLENBQUMsQ0FBQTtLQUMvQjswQkFuQkcsa0NBQUs7Ozs7UUFHVDtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNwQjs7Ozs7a0JBTFMsS0FBWTtZQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7Ozs7Ozs7SUFvQnRCLGtDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNqQjs7OztJQUVELHlDQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMs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