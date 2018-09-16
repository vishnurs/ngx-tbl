(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Subject'), require('rxjs/operators'), require('lodash'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-tbl', ['exports', '@angular/core', 'rxjs/Subject', 'rxjs/operators', 'lodash', '@angular/forms', '@angular/common'], factory) :
    (factory((global['ngx-tbl'] = {}),global.ng.core,global.rxjs.Subject,global.rxjs.operators,global._,global.ng.forms,global.ng.common));
}(this, (function (exports,core,Subject,operators,_,forms,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTblColumn = (function () {
        function NgxTblColumn() {
        }
        NgxTblColumn.decorators = [
            { type: core.Directive, args: [{
                        selector: 'ngx-tbl-column'
                    },] },
        ];
        /** @nocollapse */
        NgxTblColumn.propDecorators = {
            "name": [{ type: core.Input },],
            "key": [{ type: core.Input },],
            "sortable": [{ type: core.Input },],
            "narrow": [{ type: core.Input },],
            "cellTemplate": [{ type: core.ContentChild, args: ['ngxTblCellTemplate',] },],
        };
        return NgxTblColumn;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTblComponent = (function () {
        function NgxTblComponent() {
            var _this = this;
            this.limit = 10;
            this.sort = {};
            this.subject = new Subject.Subject();
            this.debouncer = new Subject.Subject();
            this.update = new core.EventEmitter();
            this.load = new core.EventEmitter();
            this.edit = new core.EventEmitter();
            this.add = new core.EventEmitter();
            this.delete = new core.EventEmitter();
            this.resetPagination = this.subject.asObservable();
            this.debouncer.pipe(operators.debounceTime(300), operators.map(function (val) { return _this.loadData(); }));
        }
        Object.defineProperty(NgxTblComponent.prototype, "items", {
            get: /**
             * @return {?}
             */ function () {
                return this._items;
            },
            set: /**
             * @param {?} items
             * @return {?}
             */ function (items) {
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
                if (currentPage === void 0) {
                    currentPage = 1;
                }
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
            { type: core.Component, args: [{
                        selector: 'ngx-tbl',
                        templateUrl: './ngx-tbl-component.html'
                    },] },
        ];
        /** @nocollapse */
        NgxTblComponent.ctorParameters = function () { return []; };
        NgxTblComponent.propDecorators = {
            "deleteConfirmModal": [{ type: core.ViewChild, args: ['deleteConfirmModal',] },],
            "items": [{ type: core.Input },],
            "config": [{ type: core.Input },],
            "update": [{ type: core.Output },],
            "load": [{ type: core.Output },],
            "edit": [{ type: core.Output },],
            "add": [{ type: core.Output },],
            "delete": [{ type: core.Output },],
            "columns": [{ type: core.ContentChildren, args: [NgxTblColumn,] },],
        };
        return NgxTblComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTblControl = (function () {
        function NgxTblControl(container, name, validation, renderer, el) {
            this.container = container;
            this.name = name;
            this.renderer = renderer;
            this.el = el;
            this.form = ((this.container)).form;
            this.form.removeControl(this.name);
            if (!this.form.get(this.name)) {
                this.form.addControl(this.name, new forms.FormControl(''));
            }
        }
        NgxTblControl.decorators = [
            { type: core.Directive, args: [{
                        selector: '[formControlName][ngx-tbl-control]',
                    },] },
        ];
        /** @nocollapse */
        NgxTblControl.ctorParameters = function () {
            return [
                { type: forms.ControlContainer, },
                { type: undefined, decorators: [{ type: core.Attribute, args: ['formControlName',] },] },
                { type: undefined, decorators: [{ type: core.Attribute, args: ['validation',] },] },
                { type: core.Renderer2, },
                { type: core.ElementRef, },
            ];
        };
        NgxTblControl.propDecorators = {
            "validators": [{ type: core.Input, args: ['validators',] },],
        };
        return NgxTblControl;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTblPagination = (function () {
        function NgxTblPagination() {
            this.pageChanged = new core.EventEmitter();
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
                this.pager = this.getPager(this.total, page, _.toNumber(this.limit));
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
                    this.pager = this.getPager(this.total, 1, _.toNumber(this.limit));
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
                if (currentPage === void 0) {
                    currentPage = 1;
                }
                if (pageSize === void 0) {
                    pageSize = 10;
                }
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
                var /** @type {?} */ pages = _.range(startPage, endPage + 1);
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
            { type: core.Component, args: [{
                        selector: 'ngx-tbl-pagination',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["\n    .pagination { float: right; margin:0 0 7px 0; }\n    .pagination li{cursor:pointer;}\n    .paging-info {font-style: italic;color: #808080;line-height: 2;}\n  "],
                        template: "\n  <div class=\"col-md-3 col-xs-3 col-lg-3 col-sm-3 paging-info\" *ngIf=\"total\">\n    <span>showing {{this.pager.startIndex+1}} to {{this.pager.endCount}} of {{total}}</span>\n  </div>\n  <div class=\"col-md-9 col-xs-9 col-lg-9 col-sm-9\">\n  <ul *ngIf=\"pager.pages && pager.pages.length\" class=\"pagination\">\n    <li [ngClass]=\"{disabled:pager.currentPage === 1}\">\n        <a (click)=\"setPage(1)\">First</a>\n    </li>\n    <li [ngClass]=\"{disabled:pager.currentPage === 1}\">\n        <a (click)=\"setPage(pager.currentPage - 1)\">Prev</a>\n    </li>\n    <li *ngFor=\"let page of pager.pages\" [ngClass]=\"{active:pager.currentPage === page}\">\n        <a (click)=\"setPage(page)\">{{page}}</a>\n    </li>\n    <li [ngClass]=\"{disabled:pager.currentPage === pager.totalPages}\">\n        <a (click)=\"setPage(pager.currentPage + 1)\">Next</a>\n    </li>\n    <li [ngClass]=\"{disabled:pager.currentPage === pager.totalPages}\">\n        <a (click)=\"setPage(pager.totalPages)\">Last</a>\n    </li>\n  </ul>\n  </div>\n  "
                    },] },
        ];
        /** @nocollapse */
        NgxTblPagination.ctorParameters = function () { return []; };
        NgxTblPagination.propDecorators = {
            "resetPagination": [{ type: core.Input, args: ['reset-pagination',] },],
            "total": [{ type: core.Input, args: ['total',] },],
            "limit": [{ type: core.Input },],
            "pageChanged": [{ type: core.Output, args: ['page-change',] },],
        };
        return NgxTblPagination;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTblModule = (function () {
        function NgxTblModule() {
        }
        NgxTblModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
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

    exports.NgxTblModule = NgxTblModule;
    exports.NgxTblComponent = NgxTblComponent;
    exports.NgxTblControl = NgxTblControl;
    exports.NgxTblColumn = NgxTblColumn;
    exports.NgxTblPagination = NgxTblPagination;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRibC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC10Ymwvbmd4LXRibC1jb2x1bW4uY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGJsL25neC10YmwtY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGJsL25neC10YmwtY29udHJvbC50cyIsIm5nOi8vbmd4LXRibC9uZ3gtdGJsLXBhZ2luYXRpb24vbmd4LXRibC1wYWdpbmF0aW9uLnRzIiwibmc6Ly9uZ3gtdGJsL25neC10YmwubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduZ3gtdGJsLWNvbHVtbidcbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ3hUYmxDb2x1bW4ge1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGtleTogc3RyaW5nO1xuICBASW5wdXQoKSBzb3J0YWJsZTogc3RyaW5nO1xuICBASW5wdXQoKSBuYXJyb3c6IGJvb2xlYW47XG5cbiAgQENvbnRlbnRDaGlsZCgnbmd4VGJsQ2VsbFRlbXBsYXRlJykgY2VsbFRlbXBsYXRlOiBhbnk7XG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIElucHV0LCBcbiAgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE5neFRibENvbHVtbiB9IGZyb20gJy4vbmd4LXRibC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmV4cG9ydCBpbnRlcmZhY2UgaXRtIHtcbiAgcm93cz86IGFueVtdO1xuICB0b3RhbDogbnVtYmVyO1xufVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRibCcsIFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LXRibC1jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VGJsQ29tcG9uZW50IHtcbiAgX2l0ZW1zOiBhbnk7XG4gIGxpbWl0OiBudW1iZXIgPSAxMDtcbiAgc29ydDogYW55ID0ge307XG4gIHNlYXJjaFBhcmFtOiBzdHJpbmc7XG4gIHByaXZhdGUgc3ViamVjdCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcmVzZXRQYWdpbmF0aW9uOiBPYnNlcnZhYmxlPGFueT47XG4gIHByaXZhdGUgZGVib3VuY2VyID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBkZWxldGVSb3c6YW55O1xuXG4gIEBWaWV3Q2hpbGQoJ2RlbGV0ZUNvbmZpcm1Nb2RhbCcpIGRlbGV0ZUNvbmZpcm1Nb2RhbDogYW55O1xuICBASW5wdXQoKVxuICBzZXQgaXRlbXMoaXRlbXM6IGFueVtdKSB7XG4gICAgdGhpcy5faXRlbXMgPSBpdGVtcztcbiAgfVxuICBnZXQgaXRlbXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICB9XG4gIEBJbnB1dCgpIGNvbmZpZzogYW55O1xuICBAT3V0cHV0KCkgdXBkYXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgbG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGVkaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWRkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlbGV0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBDb250ZW50Q2hpbGRyZW4oTmd4VGJsQ29sdW1uKSBjb2x1bW5zOiBRdWVyeUxpc3Q8Tmd4VGJsQ29sdW1uPjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJlc2V0UGFnaW5hdGlvbiA9IHRoaXMuc3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICB0aGlzLmRlYm91bmNlci5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgICBtYXAodmFsID0+IHRoaXMubG9hZERhdGEoKSkpXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxvYWREYXRhKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQodHJ1ZSk7XG4gIH1cblxuICBzZWFyY2goKSB7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQodHJ1ZSk7XG4gICAgdGhpcy5kZWJvdW5jZXIubmV4dCgpXG4gIH1cblxuICBsaW1pdENoYW5nZSgpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgICB0aGlzLmxvYWREYXRhKCk7XG4gIH1cblxuICBjb25maXJtRGVsZXRlKGl0ZW06IGFueSkge1xuICAgIHRoaXMuZGVsZXRlUm93ID0gaXRlbTtcbiAgICB0aGlzLmRlbGV0ZUNvbmZpcm1Nb2RhbC5zaG93KCk7XG4gIH1cblxuICBkZWxldGVJdGVtKCkge1xuICAgIHRoaXMuZGVsZXRlLmVtaXQoeyBpdGVtOiBfLmNsb25lKHRoaXMuZGVsZXRlUm93KSwgdGFibGVQYXJhbXM6IHRoaXMuZ2V0UXVlcnlQYXJhbXMoMSkgfSk7XG4gICAgdGhpcy5kZWxldGVSb3cgPSB7fTtcbiAgICB0aGlzLmRlbGV0ZUNvbmZpcm1Nb2RhbC5oaWRlKCk7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQodHJ1ZSk7XG4gIH1cblxuICBjbG9zZU1vZGFsKCkge1xuICAgIHRoaXMuZGVsZXRlQ29uZmlybU1vZGFsLmhpZGUoKTtcbiAgfVxuXG4gIGVkaXRSb3coaXRlbTogYW55LCBpbmRleDogYW55KSB7XG4gICAgdGhpcy5lZGl0LmVtaXQoeyBpdGVtOiBfLmNsb25lKGl0ZW0pLCB0YWJsZVBhcmFtczogdGhpcy5nZXRRdWVyeVBhcmFtcygxKSB9KTtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGFkZE5ldygpIHtcbiAgICB0aGlzLmFkZC5lbWl0KHsgdGFibGVQYXJhbXM6IHRoaXMuZ2V0UXVlcnlQYXJhbXMoMSkgfSk7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQodHJ1ZSk7XG4gIH1cblxuICBnZXRRdWVyeVBhcmFtcyhjdXJyZW50UGFnZTogYW55KSB7XG4gICAgLy90aGlzLnBhZ2VObyA9IGN1cnJlbnRQYWdlO1xuICAgIHJldHVybiB7IHNlYXJjaDogdGhpcy5zZWFyY2hQYXJhbSB8fCAnJywgbGltaXQ6IHRoaXMubGltaXQsIHNraXA6IChjdXJyZW50UGFnZSAtIDEpICogdGhpcy5saW1pdCwgc29ydDogdGhpcy5zb3J0IH07XG4gIH1cblxuICBsb2FkRGF0YShjdXJyZW50UGFnZTogbnVtYmVyID0gMSkge1xuICAgIHRoaXMubG9hZC5lbWl0KHRoaXMuZ2V0UXVlcnlQYXJhbXMoY3VycmVudFBhZ2UpKTtcbiAgfVxuXG4gIHNvcnRDb2x1bW4oY29sdW1uOiBhbnkpIHtcbiAgICBpZiAoY29sdW1uLnNvcnRhYmxlKSB7XG4gICAgICBpZiAoXy5nZXQodGhpcy5zb3J0LCBjb2x1bW4ua2V5KSA9PSAwKSB7XG4gICAgICAgIHRoaXMuc29ydCA9IHt9O1xuICAgICAgICB0aGlzLnNvcnRbY29sdW1uLmtleV0gPSAxXG4gICAgICB9IGVsc2UgaWYgKF8uZ2V0KHRoaXMuc29ydCwgY29sdW1uLmtleSkgPT0gMSkge1xuICAgICAgICB0aGlzLnNvcnQgPSB7fTtcbiAgICAgICAgdGhpcy5zb3J0W2NvbHVtbi5rZXldID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc29ydCA9IHt9O1xuICAgICAgICB0aGlzLnNvcnRbY29sdW1uLmtleV0gPSAxO1xuICAgICAgfVxuICAgICAgdGhpcy5sb2FkRGF0YSgpOyAvL3RoaXMucGFnZU5vXG4gICAgfVxuICB9XG59IiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPdXRwdXQsIElucHV0LCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsXG4gIEF0dHJpYnV0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuIGltcG9ydCB7IEZvcm1Db250cm9sLCBDb250cm9sQ29udGFpbmVyLCBcbiAgIEZvcm1Hcm91cERpcmVjdGl2ZSwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbiBcbiBARGlyZWN0aXZlKHtcbiAgIHNlbGVjdG9yOiAnW2Zvcm1Db250cm9sTmFtZV1bbmd4LXRibC1jb250cm9sXScsXG4gfSlcbiBcbiBleHBvcnQgY2xhc3MgTmd4VGJsQ29udHJvbCB7XG4gICBASW5wdXQoJ3ZhbGlkYXRvcnMnKSB2YWxpZGF0b3JzOiBhbnk7XG4gICBwcml2YXRlIGZvcm06IGFueTtcbiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGFpbmVyOiBDb250cm9sQ29udGFpbmVyLCBAQXR0cmlidXRlKCdmb3JtQ29udHJvbE5hbWUnKSBwcml2YXRlIG5hbWU6IGFueSwgXG4gICBAQXR0cmlidXRlKCd2YWxpZGF0aW9uJykgdmFsaWRhdGlvbjogYW55LCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICAgdGhpcy5mb3JtID0gKHRoaXMuY29udGFpbmVyIGFzIEZvcm1Hcm91cERpcmVjdGl2ZSkuZm9ybTtcbiAgICAgdGhpcy5mb3JtLnJlbW92ZUNvbnRyb2wodGhpcy5uYW1lKTtcbiAgICAgaWYgKCF0aGlzLmZvcm0uZ2V0KHRoaXMubmFtZSkpIHtcbiAgICAgICB0aGlzLmZvcm0uYWRkQ29udHJvbCh0aGlzLm5hbWUsIG5ldyBGb3JtQ29udHJvbCgnJykpO1xuICAgICB9XG4gICB9XG4gfSIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5kZWNsYXJlIHZhciBwYXJzZUludDogYW55XG5kZWNsYXJlIHZhciBNYXRoOiBhbnlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC10YmwtcGFnaW5hdGlvbicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZXM6IFtgXG4gICAgLnBhZ2luYXRpb24geyBmbG9hdDogcmlnaHQ7IG1hcmdpbjowIDAgN3B4IDA7IH1cbiAgICAucGFnaW5hdGlvbiBsaXtjdXJzb3I6cG9pbnRlcjt9XG4gICAgLnBhZ2luZy1pbmZvIHtmb250LXN0eWxlOiBpdGFsaWM7Y29sb3I6ICM4MDgwODA7bGluZS1oZWlnaHQ6IDI7fVxuICBgXSxcbiAgdGVtcGxhdGU6IGBcbiAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIGNvbC14cy0zIGNvbC1sZy0zIGNvbC1zbS0zIHBhZ2luZy1pbmZvXCIgKm5nSWY9XCJ0b3RhbFwiPlxuICAgIDxzcGFuPnNob3dpbmcge3t0aGlzLnBhZ2VyLnN0YXJ0SW5kZXgrMX19IHRvIHt7dGhpcy5wYWdlci5lbmRDb3VudH19IG9mIHt7dG90YWx9fTwvc3Bhbj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb2wtbWQtOSBjb2wteHMtOSBjb2wtbGctOSBjb2wtc20tOVwiPlxuICA8dWwgKm5nSWY9XCJwYWdlci5wYWdlcyAmJiBwYWdlci5wYWdlcy5sZW5ndGhcIiBjbGFzcz1cInBhZ2luYXRpb25cIj5cbiAgICA8bGkgW25nQ2xhc3NdPVwie2Rpc2FibGVkOnBhZ2VyLmN1cnJlbnRQYWdlID09PSAxfVwiPlxuICAgICAgICA8YSAoY2xpY2spPVwic2V0UGFnZSgxKVwiPkZpcnN0PC9hPlxuICAgIDwvbGk+XG4gICAgPGxpIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDpwYWdlci5jdXJyZW50UGFnZSA9PT0gMX1cIj5cbiAgICAgICAgPGEgKGNsaWNrKT1cInNldFBhZ2UocGFnZXIuY3VycmVudFBhZ2UgLSAxKVwiPlByZXY8L2E+XG4gICAgPC9saT5cbiAgICA8bGkgKm5nRm9yPVwibGV0IHBhZ2Ugb2YgcGFnZXIucGFnZXNcIiBbbmdDbGFzc109XCJ7YWN0aXZlOnBhZ2VyLmN1cnJlbnRQYWdlID09PSBwYWdlfVwiPlxuICAgICAgICA8YSAoY2xpY2spPVwic2V0UGFnZShwYWdlKVwiPnt7cGFnZX19PC9hPlxuICAgIDwvbGk+XG4gICAgPGxpIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDpwYWdlci5jdXJyZW50UGFnZSA9PT0gcGFnZXIudG90YWxQYWdlc31cIj5cbiAgICAgICAgPGEgKGNsaWNrKT1cInNldFBhZ2UocGFnZXIuY3VycmVudFBhZ2UgKyAxKVwiPk5leHQ8L2E+XG4gICAgPC9saT5cbiAgICA8bGkgW25nQ2xhc3NdPVwie2Rpc2FibGVkOnBhZ2VyLmN1cnJlbnRQYWdlID09PSBwYWdlci50b3RhbFBhZ2VzfVwiPlxuICAgICAgICA8YSAoY2xpY2spPVwic2V0UGFnZShwYWdlci50b3RhbFBhZ2VzKVwiPkxhc3Q8L2E+XG4gICAgPC9saT5cbiAgPC91bD5cbiAgPC9kaXY+XG4gIGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ3hUYmxQYWdpbmF0aW9uIHtcbiAgQElucHV0KCdyZXNldC1wYWdpbmF0aW9uJykgcmVzZXRQYWdpbmF0aW9uOiBhbnk7XG4gIEBJbnB1dCgndG90YWwnKSB0b3RhbDogYW55O1xuICBASW5wdXQoKSBsaW1pdDogYW55O1xuICBAT3V0cHV0KCdwYWdlLWNoYW5nZScpIHBhZ2VDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwcml2YXRlIHJlc2V0OiBib29sZWFuID0gdHJ1ZTtcbiAgcGFnZXI6IGFueSA9IHt9O1xuXG4gIHNldFBhZ2UocGFnZTogbnVtYmVyKSB7XG4gICAgaWYgKHBhZ2UgPCAxIHx8IHBhZ2UgPiB0aGlzLnBhZ2VyLnRvdGFsUGFnZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wYWdlQ2hhbmdlZC5lbWl0KHBhZ2UpO1xuICAgIHRoaXMucGFnZXIgPSB0aGlzLmdldFBhZ2VyKHRoaXMudG90YWwsIHBhZ2UsIF8udG9OdW1iZXIodGhpcy5saW1pdCkpO1xuICB9XG4gIFxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmVzZXRQYWdpbmF0aW9uLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlc2V0ID0gdHJ1ZTtcbiAgICB9KVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgdGhpcy5saW1pdCA9IHBhcnNlSW50KHRoaXMubGltaXQpO1xuICAgIGlmICh0aGlzLnRvdGFsID49IDAgJiYgdGhpcy5yZXNldCkge1xuICAgICAgdGhpcy5yZXNldCA9IGZhbHNlO1xuICAgICAgdGhpcy5wYWdlciA9IHRoaXMuZ2V0UGFnZXIodGhpcy50b3RhbCwgMSwgXy50b051bWJlcih0aGlzLmxpbWl0KSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0UGFnZXIodG90YWxJdGVtczogbnVtYmVyLCBjdXJyZW50UGFnZTogbnVtYmVyID0gMSwgcGFnZVNpemU6IG51bWJlciA9IDEwKSB7XG4gICAgbGV0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwodG90YWxJdGVtcyAvIHBhZ2VTaXplKTtcbiAgICBsZXQgc3RhcnRQYWdlOiBudW1iZXIsIGVuZFBhZ2U6IG51bWJlcjtcbiAgICBpZiAodG90YWxQYWdlcyA8PSAxMCkge1xuICAgICAgc3RhcnRQYWdlID0gMTtcbiAgICAgIGVuZFBhZ2UgPSB0b3RhbFBhZ2VzO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY3VycmVudFBhZ2UgPD0gNikge1xuICAgICAgICBzdGFydFBhZ2UgPSAxO1xuICAgICAgICBlbmRQYWdlID0gMTA7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlICsgNCA+PSB0b3RhbFBhZ2VzKSB7XG4gICAgICAgIHN0YXJ0UGFnZSA9IHRvdGFsUGFnZXMgLSA5O1xuICAgICAgICBlbmRQYWdlID0gdG90YWxQYWdlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXJ0UGFnZSA9IGN1cnJlbnRQYWdlIC0gNTtcbiAgICAgICAgZW5kUGFnZSA9IGN1cnJlbnRQYWdlICsgNDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgc3RhcnRJbmRleCA9IChjdXJyZW50UGFnZSAtIDEpICogcGFnZVNpemU7XG4gICAgbGV0IGVuZEluZGV4ID0gTWF0aC5taW4oc3RhcnRJbmRleCArIHBhZ2VTaXplIC0gMSwgdG90YWxJdGVtcyAtIDEpO1xuXG4gICAgbGV0IHBhZ2VzID0gXy5yYW5nZShzdGFydFBhZ2UsIGVuZFBhZ2UgKyAxKTtcblxuICAgIGxldCBlbmRDb3VudCA9IHN0YXJ0SW5kZXggKyB0aGlzLmxpbWl0O1xuICAgIGlmIChlbmRDb3VudCA+IHRoaXMudG90YWwpIHsgZW5kQ291bnQgPSB0aGlzLnRvdGFsIH1cbiAgICByZXR1cm4ge1xuICAgICAgdG90YWxJdGVtczogdG90YWxJdGVtcyxcbiAgICAgIGN1cnJlbnRQYWdlOiBjdXJyZW50UGFnZSxcbiAgICAgIHBhZ2VTaXplOiBwYWdlU2l6ZSxcbiAgICAgIHRvdGFsUGFnZXM6IHRvdGFsUGFnZXMsXG4gICAgICBzdGFydFBhZ2U6IHN0YXJ0UGFnZSxcbiAgICAgIGVuZFBhZ2U6IGVuZFBhZ2UsXG4gICAgICBzdGFydEluZGV4OiBzdGFydEluZGV4LFxuICAgICAgZW5kSW5kZXg6IGVuZEluZGV4LFxuICAgICAgcGFnZXM6IHBhZ2VzLFxuICAgICAgZW5kQ291bnQ6IGVuZENvdW50XG4gICAgfTtcbiAgfVxufSIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbmltcG9ydCB7IE5neFRibENvbXBvbmVudCB9IGZyb20gJy4vbmd4LXRibC1jb21wb25lbnQnO1xuaW1wb3J0IHsgTmd4VGJsQ29sdW1uIH0gZnJvbSAnLi9uZ3gtdGJsLWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmd4VGJsQ29udHJvbCB9IGZyb20gJy4vbmd4LXRibC1jb250cm9sJztcbmltcG9ydCB7IE5neFRibFBhZ2luYXRpb24gfSBmcm9tICcuL25neC10YmwtcGFnaW5hdGlvbi9uZ3gtdGJsLXBhZ2luYXRpb24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neFRibENvbXBvbmVudCxcbiAgICBOZ3hUYmxDb2x1bW4sXG4gICAgTmd4VGJsQ29udHJvbCxcbiAgICBOZ3hUYmxQYWdpbmF0aW9uXG4gIF0sXG4gIGV4cG9ydHM6IFsgXG4gICAgTmd4VGJsQ29tcG9uZW50LFxuICAgIE5neFRibENvbHVtbixcbiAgICBOZ3hUYmxDb250cm9sXG4gIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ3hUYmxNb2R1bGUge1xuICBcbn0iXSwibmFtZXMiOlsiRGlyZWN0aXZlIiwiSW5wdXQiLCJDb250ZW50Q2hpbGQiLCJTdWJqZWN0IiwiRXZlbnRFbWl0dGVyIiwiZGVib3VuY2VUaW1lIiwibWFwIiwiXy5jbG9uZSIsIl8uZ2V0IiwiQ29tcG9uZW50IiwiVmlld0NoaWxkIiwiT3V0cHV0IiwiQ29udGVudENoaWxkcmVuIiwiRm9ybUNvbnRyb2wiLCJDb250cm9sQ29udGFpbmVyIiwiQXR0cmlidXRlIiwiUmVuZGVyZXIyIiwiRWxlbWVudFJlZiIsIl8udG9OdW1iZXIiLCJfLnJhbmdlIiwiQ2hhbmdl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