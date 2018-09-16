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
                    templateUrl: './ngx-tbl-component.html'
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

export { NgxTblModule, NgxTblComponent, NgxTblControl, NgxTblColumn, NgxTblPagination };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRibC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LXRibC9uZ3gtdGJsLWNvbHVtbi5jb21wb25lbnQudHMiLCJuZzovL25neC10Ymwvbmd4LXRibC1jb21wb25lbnQudHMiLCJuZzovL25neC10Ymwvbmd4LXRibC1jb250cm9sLnRzIiwibmc6Ly9uZ3gtdGJsL25neC10YmwtcGFnaW5hdGlvbi9uZ3gtdGJsLXBhZ2luYXRpb24udHMiLCJuZzovL25neC10Ymwvbmd4LXRibC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ25neC10YmwtY29sdW1uJ1xufSlcblxuZXhwb3J0IGNsYXNzIE5neFRibENvbHVtbiB7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkga2V5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNvcnRhYmxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG5hcnJvdzogYm9vbGVhbjtcblxuICBAQ29udGVudENoaWxkKCduZ3hUYmxDZWxsVGVtcGxhdGUnKSBjZWxsVGVtcGxhdGU6IGFueTtcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgSW5wdXQsIFxuICBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCdcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTmd4VGJsQ29sdW1uIH0gZnJvbSAnLi9uZ3gtdGJsLWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuZXhwb3J0IGludGVyZmFjZSBpdG0ge1xuICByb3dzPzogYW55W107XG4gIHRvdGFsOiBudW1iZXI7XG59XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdGJsJywgXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtdGJsLWNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hUYmxDb21wb25lbnQge1xuICBfaXRlbXM6IGFueTtcbiAgbGltaXQ6IG51bWJlciA9IDEwO1xuICBzb3J0OiBhbnkgPSB7fTtcbiAgc2VhcmNoUGFyYW06IHN0cmluZztcbiAgcHJpdmF0ZSBzdWJqZWN0ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICByZXNldFBhZ2luYXRpb246IE9ic2VydmFibGU8YW55PjtcbiAgcHJpdmF0ZSBkZWJvdW5jZXIgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIGRlbGV0ZVJvdzphbnk7XG5cbiAgQFZpZXdDaGlsZCgnZGVsZXRlQ29uZmlybU1vZGFsJykgZGVsZXRlQ29uZmlybU1vZGFsOiBhbnk7XG4gIEBJbnB1dCgpXG4gIHNldCBpdGVtcyhpdGVtczogYW55W10pIHtcbiAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICB9XG4gIGdldCBpdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gIH1cbiAgQElucHV0KCkgY29uZmlnOiBhbnk7XG4gIEBPdXRwdXQoKSB1cGRhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBsb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZWRpdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhZGQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ3hUYmxDb2x1bW4pIGNvbHVtbnM6IFF1ZXJ5TGlzdDxOZ3hUYmxDb2x1bW4+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmVzZXRQYWdpbmF0aW9uID0gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuZGVib3VuY2VyLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgIG1hcCh2YWwgPT4gdGhpcy5sb2FkRGF0YSgpKSlcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9hZERhdGEoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgICB0aGlzLmRlYm91bmNlci5uZXh0KClcbiAgfVxuXG4gIGxpbWl0Q2hhbmdlKCkge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICAgIHRoaXMubG9hZERhdGEoKTtcbiAgfVxuXG4gIGNvbmZpcm1EZWxldGUoaXRlbTogYW55KSB7XG4gICAgdGhpcy5kZWxldGVSb3cgPSBpdGVtO1xuICAgIHRoaXMuZGVsZXRlQ29uZmlybU1vZGFsLnNob3coKTtcbiAgfVxuXG4gIGRlbGV0ZUl0ZW0oKSB7XG4gICAgdGhpcy5kZWxldGUuZW1pdCh7IGl0ZW06IF8uY2xvbmUodGhpcy5kZWxldGVSb3cpLCB0YWJsZVBhcmFtczogdGhpcy5nZXRRdWVyeVBhcmFtcygxKSB9KTtcbiAgICB0aGlzLmRlbGV0ZVJvdyA9IHt9O1xuICAgIHRoaXMuZGVsZXRlQ29uZmlybU1vZGFsLmhpZGUoKTtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGNsb3NlTW9kYWwoKSB7XG4gICAgdGhpcy5kZWxldGVDb25maXJtTW9kYWwuaGlkZSgpO1xuICB9XG5cbiAgZWRpdFJvdyhpdGVtOiBhbnksIGluZGV4OiBhbnkpIHtcbiAgICB0aGlzLmVkaXQuZW1pdCh7IGl0ZW06IF8uY2xvbmUoaXRlbSksIHRhYmxlUGFyYW1zOiB0aGlzLmdldFF1ZXJ5UGFyYW1zKDEpIH0pO1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICB9XG5cbiAgYWRkTmV3KCkge1xuICAgIHRoaXMuYWRkLmVtaXQoeyB0YWJsZVBhcmFtczogdGhpcy5nZXRRdWVyeVBhcmFtcygxKSB9KTtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGdldFF1ZXJ5UGFyYW1zKGN1cnJlbnRQYWdlOiBhbnkpIHtcbiAgICAvL3RoaXMucGFnZU5vID0gY3VycmVudFBhZ2U7XG4gICAgcmV0dXJuIHsgc2VhcmNoOiB0aGlzLnNlYXJjaFBhcmFtIHx8ICcnLCBsaW1pdDogdGhpcy5saW1pdCwgc2tpcDogKGN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLmxpbWl0LCBzb3J0OiB0aGlzLnNvcnQgfTtcbiAgfVxuXG4gIGxvYWREYXRhKGN1cnJlbnRQYWdlOiBudW1iZXIgPSAxKSB7XG4gICAgdGhpcy5sb2FkLmVtaXQodGhpcy5nZXRRdWVyeVBhcmFtcyhjdXJyZW50UGFnZSkpO1xuICB9XG5cbiAgc29ydENvbHVtbihjb2x1bW46IGFueSkge1xuICAgIGlmIChjb2x1bW4uc29ydGFibGUpIHtcbiAgICAgIGlmIChfLmdldCh0aGlzLnNvcnQsIGNvbHVtbi5rZXkpID09IDApIHtcbiAgICAgICAgdGhpcy5zb3J0ID0ge307XG4gICAgICAgIHRoaXMuc29ydFtjb2x1bW4ua2V5XSA9IDFcbiAgICAgIH0gZWxzZSBpZiAoXy5nZXQodGhpcy5zb3J0LCBjb2x1bW4ua2V5KSA9PSAxKSB7XG4gICAgICAgIHRoaXMuc29ydCA9IHt9O1xuICAgICAgICB0aGlzLnNvcnRbY29sdW1uLmtleV0gPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zb3J0ID0ge307XG4gICAgICAgIHRoaXMuc29ydFtjb2x1bW4ua2V5XSA9IDE7XG4gICAgICB9XG4gICAgICB0aGlzLmxvYWREYXRhKCk7IC8vdGhpcy5wYWdlTm9cbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIE91dHB1dCwgSW5wdXQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMixcbiAgQXR0cmlidXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gaW1wb3J0IHsgRm9ybUNvbnRyb2wsIENvbnRyb2xDb250YWluZXIsIFxuICAgRm9ybUdyb3VwRGlyZWN0aXZlLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuIFxuIEBEaXJlY3RpdmUoe1xuICAgc2VsZWN0b3I6ICdbZm9ybUNvbnRyb2xOYW1lXVtuZ3gtdGJsLWNvbnRyb2xdJyxcbiB9KVxuIFxuIGV4cG9ydCBjbGFzcyBOZ3hUYmxDb250cm9sIHtcbiAgIEBJbnB1dCgndmFsaWRhdG9ycycpIHZhbGlkYXRvcnM6IGFueTtcbiAgIHByaXZhdGUgZm9ybTogYW55O1xuICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250YWluZXI6IENvbnRyb2xDb250YWluZXIsIEBBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpIHByaXZhdGUgbmFtZTogYW55LCBcbiAgIEBBdHRyaWJ1dGUoJ3ZhbGlkYXRpb24nKSB2YWxpZGF0aW9uOiBhbnksIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgICB0aGlzLmZvcm0gPSAodGhpcy5jb250YWluZXIgYXMgRm9ybUdyb3VwRGlyZWN0aXZlKS5mb3JtO1xuICAgICB0aGlzLmZvcm0ucmVtb3ZlQ29udHJvbCh0aGlzLm5hbWUpO1xuICAgICBpZiAoIXRoaXMuZm9ybS5nZXQodGhpcy5uYW1lKSkge1xuICAgICAgIHRoaXMuZm9ybS5hZGRDb250cm9sKHRoaXMubmFtZSwgbmV3IEZvcm1Db250cm9sKCcnKSk7XG4gICAgIH1cbiAgIH1cbiB9IiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmRlY2xhcmUgdmFyIHBhcnNlSW50OiBhbnlcbmRlY2xhcmUgdmFyIE1hdGg6IGFueVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRibC1wYWdpbmF0aW9uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW2BcbiAgICAucGFnaW5hdGlvbiB7IGZsb2F0OiByaWdodDsgbWFyZ2luOjAgMCA3cHggMDsgfVxuICAgIC5wYWdpbmF0aW9uIGxpe2N1cnNvcjpwb2ludGVyO31cbiAgICAucGFnaW5nLWluZm8ge2ZvbnQtc3R5bGU6IGl0YWxpYztjb2xvcjogIzgwODA4MDtsaW5lLWhlaWdodDogMjt9XG4gIGBdLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgY29sLXhzLTMgY29sLWxnLTMgY29sLXNtLTMgcGFnaW5nLWluZm9cIiAqbmdJZj1cInRvdGFsXCI+XG4gICAgPHNwYW4+c2hvd2luZyB7e3RoaXMucGFnZXIuc3RhcnRJbmRleCsxfX0gdG8ge3t0aGlzLnBhZ2VyLmVuZENvdW50fX0gb2Yge3t0b3RhbH19PC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbC1tZC05IGNvbC14cy05IGNvbC1sZy05IGNvbC1zbS05XCI+XG4gIDx1bCAqbmdJZj1cInBhZ2VyLnBhZ2VzICYmIHBhZ2VyLnBhZ2VzLmxlbmd0aFwiIGNsYXNzPVwicGFnaW5hdGlvblwiPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IDF9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKDEpXCI+Rmlyc3Q8L2E+XG4gICAgPC9saT5cbiAgICA8bGkgW25nQ2xhc3NdPVwie2Rpc2FibGVkOnBhZ2VyLmN1cnJlbnRQYWdlID09PSAxfVwiPlxuICAgICAgICA8YSAoY2xpY2spPVwic2V0UGFnZShwYWdlci5jdXJyZW50UGFnZSAtIDEpXCI+UHJldjwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSAqbmdGb3I9XCJsZXQgcGFnZSBvZiBwYWdlci5wYWdlc1wiIFtuZ0NsYXNzXT1cInthY3RpdmU6cGFnZXIuY3VycmVudFBhZ2UgPT09IHBhZ2V9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKHBhZ2UpXCI+e3twYWdlfX08L2E+XG4gICAgPC9saT5cbiAgICA8bGkgW25nQ2xhc3NdPVwie2Rpc2FibGVkOnBhZ2VyLmN1cnJlbnRQYWdlID09PSBwYWdlci50b3RhbFBhZ2VzfVwiPlxuICAgICAgICA8YSAoY2xpY2spPVwic2V0UGFnZShwYWdlci5jdXJyZW50UGFnZSArIDEpXCI+TmV4dDwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IHBhZ2VyLnRvdGFsUGFnZXN9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKHBhZ2VyLnRvdGFsUGFnZXMpXCI+TGFzdDwvYT5cbiAgICA8L2xpPlxuICA8L3VsPlxuICA8L2Rpdj5cbiAgYFxufSlcblxuZXhwb3J0IGNsYXNzIE5neFRibFBhZ2luYXRpb24ge1xuICBASW5wdXQoJ3Jlc2V0LXBhZ2luYXRpb24nKSByZXNldFBhZ2luYXRpb246IGFueTtcbiAgQElucHV0KCd0b3RhbCcpIHRvdGFsOiBhbnk7XG4gIEBJbnB1dCgpIGxpbWl0OiBhbnk7XG4gIEBPdXRwdXQoJ3BhZ2UtY2hhbmdlJykgcGFnZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHByaXZhdGUgcmVzZXQ6IGJvb2xlYW4gPSB0cnVlO1xuICBwYWdlcjogYW55ID0ge307XG5cbiAgc2V0UGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICBpZiAocGFnZSA8IDEgfHwgcGFnZSA+IHRoaXMucGFnZXIudG90YWxQYWdlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBhZ2VDaGFuZ2VkLmVtaXQocGFnZSk7XG4gICAgdGhpcy5wYWdlciA9IHRoaXMuZ2V0UGFnZXIodGhpcy50b3RhbCwgcGFnZSwgXy50b051bWJlcih0aGlzLmxpbWl0KSk7XG4gIH1cbiAgXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yZXNldFBhZ2luYXRpb24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVzZXQgPSB0cnVlO1xuICAgIH0pXG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICB0aGlzLmxpbWl0ID0gcGFyc2VJbnQodGhpcy5saW1pdCk7XG4gICAgaWYgKHRoaXMudG90YWwgPj0gMCAmJiB0aGlzLnJlc2V0KSB7XG4gICAgICB0aGlzLnJlc2V0ID0gZmFsc2U7XG4gICAgICB0aGlzLnBhZ2VyID0gdGhpcy5nZXRQYWdlcih0aGlzLnRvdGFsLCAxLCBfLnRvTnVtYmVyKHRoaXMubGltaXQpKTtcbiAgICB9XG4gIH1cblxuICBnZXRQYWdlcih0b3RhbEl0ZW1zOiBudW1iZXIsIGN1cnJlbnRQYWdlOiBudW1iZXIgPSAxLCBwYWdlU2l6ZTogbnVtYmVyID0gMTApIHtcbiAgICBsZXQgdG90YWxQYWdlcyA9IE1hdGguY2VpbCh0b3RhbEl0ZW1zIC8gcGFnZVNpemUpO1xuICAgIGxldCBzdGFydFBhZ2U6IG51bWJlciwgZW5kUGFnZTogbnVtYmVyO1xuICAgIGlmICh0b3RhbFBhZ2VzIDw9IDEwKSB7XG4gICAgICBzdGFydFBhZ2UgPSAxO1xuICAgICAgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjdXJyZW50UGFnZSA8PSA2KSB7XG4gICAgICAgIHN0YXJ0UGFnZSA9IDE7XG4gICAgICAgIGVuZFBhZ2UgPSAxMDtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBhZ2UgKyA0ID49IHRvdGFsUGFnZXMpIHtcbiAgICAgICAgc3RhcnRQYWdlID0gdG90YWxQYWdlcyAtIDk7XG4gICAgICAgIGVuZFBhZ2UgPSB0b3RhbFBhZ2VzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnRQYWdlID0gY3VycmVudFBhZ2UgLSA1O1xuICAgICAgICBlbmRQYWdlID0gY3VycmVudFBhZ2UgKyA0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBzdGFydEluZGV4ID0gKGN1cnJlbnRQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcbiAgICBsZXQgZW5kSW5kZXggPSBNYXRoLm1pbihzdGFydEluZGV4ICsgcGFnZVNpemUgLSAxLCB0b3RhbEl0ZW1zIC0gMSk7XG5cbiAgICBsZXQgcGFnZXMgPSBfLnJhbmdlKHN0YXJ0UGFnZSwgZW5kUGFnZSArIDEpO1xuXG4gICAgbGV0IGVuZENvdW50ID0gc3RhcnRJbmRleCArIHRoaXMubGltaXQ7XG4gICAgaWYgKGVuZENvdW50ID4gdGhpcy50b3RhbCkgeyBlbmRDb3VudCA9IHRoaXMudG90YWwgfVxuICAgIHJldHVybiB7XG4gICAgICB0b3RhbEl0ZW1zOiB0b3RhbEl0ZW1zLFxuICAgICAgY3VycmVudFBhZ2U6IGN1cnJlbnRQYWdlLFxuICAgICAgcGFnZVNpemU6IHBhZ2VTaXplLFxuICAgICAgdG90YWxQYWdlczogdG90YWxQYWdlcyxcbiAgICAgIHN0YXJ0UGFnZTogc3RhcnRQYWdlLFxuICAgICAgZW5kUGFnZTogZW5kUGFnZSxcbiAgICAgIHN0YXJ0SW5kZXg6IHN0YXJ0SW5kZXgsXG4gICAgICBlbmRJbmRleDogZW5kSW5kZXgsXG4gICAgICBwYWdlczogcGFnZXMsXG4gICAgICBlbmRDb3VudDogZW5kQ291bnRcbiAgICB9O1xuICB9XG59IiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuaW1wb3J0IHsgTmd4VGJsQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtdGJsLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hUYmxDb2x1bW4gfSBmcm9tICcuL25neC10YmwtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hUYmxDb250cm9sIH0gZnJvbSAnLi9uZ3gtdGJsLWNvbnRyb2wnO1xuaW1wb3J0IHsgTmd4VGJsUGFnaW5hdGlvbiB9IGZyb20gJy4vbmd4LXRibC1wYWdpbmF0aW9uL25neC10YmwtcGFnaW5hdGlvbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4VGJsQ29tcG9uZW50LFxuICAgIE5neFRibENvbHVtbixcbiAgICBOZ3hUYmxDb250cm9sLFxuICAgIE5neFRibFBhZ2luYXRpb25cbiAgXSxcbiAgZXhwb3J0czogWyBcbiAgICBOZ3hUYmxDb21wb25lbnQsXG4gICAgTmd4VGJsQ29sdW1uLFxuICAgIE5neFRibENvbnRyb2xcbiAgXVxufSlcblxuZXhwb3J0IGNsYXNzIE5neFRibE1vZHVsZSB7XG4gIFxufSJdLCJuYW1lcyI6WyJfLmNsb25lIiwiXy5nZXQiLCJfLnRvTnVtYmVyIiwiXy5yYW5nZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztnQkFFQyxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7Ozs7eUJBR0UsS0FBSzt3QkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSztpQ0FFTCxZQUFZLFNBQUMsb0JBQW9COzt1QkFacEM7Ozs7Ozs7QUNBQTtJQTBDRTtRQUFBLGlCQUtDO3FCQTdCZSxFQUFFO29CQUNOLEVBQUU7dUJBRUks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