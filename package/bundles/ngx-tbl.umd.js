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
                        template: "\n  <table class=\"table table-striped\">\n  <thead>\n    <tr>\n      <th *ngFor=\"let column of columns\" [ngClass]=\"{'col-sort-asc': sort[column.key] == 1, 'col-sort-desc': sort[column.key] == 0, \n      'col-sort': (column.sortable && (sort[column.key] != 0 || sort[column.key] != 1)), 'narrow':column.narrow }\" (click)=\"sortColumn(column)\">\n      {{column.name}}\n      </th>\n      <th class=\"col-action\" *ngIf=\"!config.allowAction || config.allowAction()\">Actions</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let item of _items?.rows; let i = index;\">\n      <td *ngFor=\"let column of columns\">\n        <div *ngIf=\"!column.cellTemplate\">{{item[column.key]}}</div>\n        <div *ngIf=\"column.cellTemplate\" \n        [ngTemplateOutlet]=\"column.cellTemplate\" [ngTemplateOutletContext]=\"{item: item}\">\n        </div>\n      </td>\n      <td class=\"col-action\" *ngIf=\"!config.allowAction || config.allowAction()\">\n        <div class=\"btn-group\" dropdown>\n          <button id=\"button-basic\" dropdownToggle type=\"button\" class=\"btn dropdown-toggle\" *ngIf=\"config.showAction && config.showAction(item)\"\n                  aria-controls=\"dropdown-basic\">\n                  <i class=\"fa fa-cog\"></i>\n          </button>\n          <ul id=\"dropdown-basic\" class=\"dropdown-menu\">\n            <li *ngIf=\"!config.allowEdit || config.allowEdit(item)\" role=\"menuitem\"><a class=\"dropdown-item\" (click)=\"editRow(item, i)\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Edit</a></li>\n            <li *ngIf=\"!config.allowDelete || config.allowDelete(item)\" role=\"menuitem\"><a class=\"dropdown-item\" (click)=\"confirmDelete(item)\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i> Delete</a></li>\n          </ul>\n        </div>    \n      </td>\n    </tr>\n    <tr *ngIf=\"_items?.total==0\">\n      <td [attr.colspan]=\"columns.length\" class=\"empty-ngx-table-msg\">No records found</td>\n    </tr>\n  </tbody>\n  \n</table>\n<ngx-tbl-pagination [total]=\"_items?.total\" [limit]=\"limit\" (page-change)=\"loadData($event)\" [reset-pagination]=\"resetPagination\"></ngx-tbl-pagination>\n  "
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
    exports.NgxTblControl = NgxTblControl;
    exports.NgxTblColumn = NgxTblColumn;
    exports.NgxTblPagination = NgxTblPagination;
    exports.NgxTblComponent = NgxTblComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRibC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC10Ymwvbmd4LXRibC1jb2x1bW4uY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGJsL25neC10YmwtY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGJsL25neC10YmwtY29udHJvbC50cyIsIm5nOi8vbmd4LXRibC9uZ3gtdGJsLXBhZ2luYXRpb24vbmd4LXRibC1wYWdpbmF0aW9uLnRzIiwibmc6Ly9uZ3gtdGJsL25neC10YmwubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduZ3gtdGJsLWNvbHVtbidcbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ3hUYmxDb2x1bW4ge1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGtleTogc3RyaW5nO1xuICBASW5wdXQoKSBzb3J0YWJsZTogc3RyaW5nO1xuICBASW5wdXQoKSBuYXJyb3c6IGJvb2xlYW47XG5cbiAgQENvbnRlbnRDaGlsZCgnbmd4VGJsQ2VsbFRlbXBsYXRlJykgY2VsbFRlbXBsYXRlOiBhbnk7XG59IiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIElucHV0LFxuICBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE5neFRibENvbHVtbiB9IGZyb20gJy4vbmd4LXRibC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmV4cG9ydCBpbnRlcmZhY2UgaXRtIHtcbiAgcm93cz86IGFueVtdO1xuICB0b3RhbDogbnVtYmVyO1xufVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRibCcsXG4gIHRlbXBsYXRlOiBgXG4gIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj5cbiAgPHRoZWFkPlxuICAgIDx0cj5cbiAgICAgIDx0aCAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIiBbbmdDbGFzc109XCJ7J2NvbC1zb3J0LWFzYyc6IHNvcnRbY29sdW1uLmtleV0gPT0gMSwgJ2NvbC1zb3J0LWRlc2MnOiBzb3J0W2NvbHVtbi5rZXldID09IDAsIFxuICAgICAgJ2NvbC1zb3J0JzogKGNvbHVtbi5zb3J0YWJsZSAmJiAoc29ydFtjb2x1bW4ua2V5XSAhPSAwIHx8IHNvcnRbY29sdW1uLmtleV0gIT0gMSkpLCAnbmFycm93Jzpjb2x1bW4ubmFycm93IH1cIiAoY2xpY2spPVwic29ydENvbHVtbihjb2x1bW4pXCI+XG4gICAgICB7e2NvbHVtbi5uYW1lfX1cbiAgICAgIDwvdGg+XG4gICAgICA8dGggY2xhc3M9XCJjb2wtYWN0aW9uXCIgKm5nSWY9XCIhY29uZmlnLmFsbG93QWN0aW9uIHx8IGNvbmZpZy5hbGxvd0FjdGlvbigpXCI+QWN0aW9uczwvdGg+XG4gICAgPC90cj5cbiAgPC90aGVhZD5cbiAgPHRib2R5PlxuICAgIDx0ciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBfaXRlbXM/LnJvd3M7IGxldCBpID0gaW5kZXg7XCI+XG4gICAgICA8dGQgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zXCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCIhY29sdW1uLmNlbGxUZW1wbGF0ZVwiPnt7aXRlbVtjb2x1bW4ua2V5XX19PC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJjb2x1bW4uY2VsbFRlbXBsYXRlXCIgXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbHVtbi5jZWxsVGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2l0ZW06IGl0ZW19XCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cImNvbC1hY3Rpb25cIiAqbmdJZj1cIiFjb25maWcuYWxsb3dBY3Rpb24gfHwgY29uZmlnLmFsbG93QWN0aW9uKClcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIGRyb3Bkb3duPlxuICAgICAgICAgIDxidXR0b24gaWQ9XCJidXR0b24tYmFzaWNcIiBkcm9wZG93blRvZ2dsZSB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gZHJvcGRvd24tdG9nZ2xlXCIgKm5nSWY9XCJjb25maWcuc2hvd0FjdGlvbiAmJiBjb25maWcuc2hvd0FjdGlvbihpdGVtKVwiXG4gICAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPVwiZHJvcGRvd24tYmFzaWNcIj5cbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY29nXCI+PC9pPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDx1bCBpZD1cImRyb3Bkb3duLWJhc2ljXCIgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCIhY29uZmlnLmFsbG93RWRpdCB8fCBjb25maWcuYWxsb3dFZGl0KGl0ZW0pXCIgcm9sZT1cIm1lbnVpdGVtXCI+PGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cImVkaXRSb3coaXRlbSwgaSlcIj48aSBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gRWRpdDwvYT48L2xpPlxuICAgICAgICAgICAgPGxpICpuZ0lmPVwiIWNvbmZpZy5hbGxvd0RlbGV0ZSB8fCBjb25maWcuYWxsb3dEZWxldGUoaXRlbSlcIiByb2xlPVwibWVudWl0ZW1cIj48YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwiY29uZmlybURlbGV0ZShpdGVtKVwiPjxpIGNsYXNzPVwiZmEgZmEtdHJhc2hcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IERlbGV0ZTwvYT48L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PiAgICBcbiAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgICA8dHIgKm5nSWY9XCJfaXRlbXM/LnRvdGFsPT0wXCI+XG4gICAgICA8dGQgW2F0dHIuY29sc3Bhbl09XCJjb2x1bW5zLmxlbmd0aFwiIGNsYXNzPVwiZW1wdHktbmd4LXRhYmxlLW1zZ1wiPk5vIHJlY29yZHMgZm91bmQ8L3RkPlxuICAgIDwvdHI+XG4gIDwvdGJvZHk+XG4gIFxuPC90YWJsZT5cbjxuZ3gtdGJsLXBhZ2luYXRpb24gW3RvdGFsXT1cIl9pdGVtcz8udG90YWxcIiBbbGltaXRdPVwibGltaXRcIiAocGFnZS1jaGFuZ2UpPVwibG9hZERhdGEoJGV2ZW50KVwiIFtyZXNldC1wYWdpbmF0aW9uXT1cInJlc2V0UGFnaW5hdGlvblwiPjwvbmd4LXRibC1wYWdpbmF0aW9uPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5neFRibENvbXBvbmVudCB7XG4gIF9pdGVtczogYW55O1xuICBsaW1pdDogbnVtYmVyID0gMTA7XG4gIHNvcnQ6IGFueSA9IHt9O1xuICBzZWFyY2hQYXJhbTogc3RyaW5nO1xuICBwcml2YXRlIHN1YmplY3QgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHJlc2V0UGFnaW5hdGlvbjogT2JzZXJ2YWJsZTxhbnk+O1xuICBwcml2YXRlIGRlYm91bmNlciA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgZGVsZXRlUm93OiBhbnk7XG5cbiAgQFZpZXdDaGlsZCgnZGVsZXRlQ29uZmlybU1vZGFsJykgZGVsZXRlQ29uZmlybU1vZGFsOiBhbnk7XG4gIEBJbnB1dCgpXG4gIHNldCBpdGVtcyhpdGVtczogYW55W10pIHtcbiAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICB9XG4gIGdldCBpdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gIH1cbiAgQElucHV0KCkgY29uZmlnOiBhbnk7XG4gIEBPdXRwdXQoKSB1cGRhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBsb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZWRpdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhZGQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ3hUYmxDb2x1bW4pIGNvbHVtbnM6IFF1ZXJ5TGlzdDxOZ3hUYmxDb2x1bW4+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmVzZXRQYWdpbmF0aW9uID0gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuZGVib3VuY2VyLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgIG1hcCh2YWwgPT4gdGhpcy5sb2FkRGF0YSgpKSlcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9hZERhdGEoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgICB0aGlzLmRlYm91bmNlci5uZXh0KClcbiAgfVxuXG4gIGxpbWl0Q2hhbmdlKCkge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICAgIHRoaXMubG9hZERhdGEoKTtcbiAgfVxuXG4gIGNvbmZpcm1EZWxldGUoaXRlbTogYW55KSB7XG4gICAgdGhpcy5kZWxldGVSb3cgPSBpdGVtO1xuICAgIHRoaXMuZGVsZXRlQ29uZmlybU1vZGFsLnNob3coKTtcbiAgfVxuXG4gIGRlbGV0ZUl0ZW0oKSB7XG4gICAgdGhpcy5kZWxldGUuZW1pdCh7IGl0ZW06IF8uY2xvbmUodGhpcy5kZWxldGVSb3cpLCB0YWJsZVBhcmFtczogdGhpcy5nZXRRdWVyeVBhcmFtcygxKSB9KTtcbiAgICB0aGlzLmRlbGV0ZVJvdyA9IHt9O1xuICAgIHRoaXMuZGVsZXRlQ29uZmlybU1vZGFsLmhpZGUoKTtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGNsb3NlTW9kYWwoKSB7XG4gICAgdGhpcy5kZWxldGVDb25maXJtTW9kYWwuaGlkZSgpO1xuICB9XG5cbiAgZWRpdFJvdyhpdGVtOiBhbnksIGluZGV4OiBhbnkpIHtcbiAgICB0aGlzLmVkaXQuZW1pdCh7IGl0ZW06IF8uY2xvbmUoaXRlbSksIHRhYmxlUGFyYW1zOiB0aGlzLmdldFF1ZXJ5UGFyYW1zKDEpIH0pO1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICB9XG5cbiAgYWRkTmV3KCkge1xuICAgIHRoaXMuYWRkLmVtaXQoeyB0YWJsZVBhcmFtczogdGhpcy5nZXRRdWVyeVBhcmFtcygxKSB9KTtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGdldFF1ZXJ5UGFyYW1zKGN1cnJlbnRQYWdlOiBhbnkpIHtcbiAgICAvL3RoaXMucGFnZU5vID0gY3VycmVudFBhZ2U7XG4gICAgcmV0dXJuIHsgc2VhcmNoOiB0aGlzLnNlYXJjaFBhcmFtIHx8ICcnLCBsaW1pdDogdGhpcy5saW1pdCwgc2tpcDogKGN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLmxpbWl0LCBzb3J0OiB0aGlzLnNvcnQgfTtcbiAgfVxuXG4gIGxvYWREYXRhKGN1cnJlbnRQYWdlOiBudW1iZXIgPSAxKSB7XG4gICAgdGhpcy5sb2FkLmVtaXQodGhpcy5nZXRRdWVyeVBhcmFtcyhjdXJyZW50UGFnZSkpO1xuICB9XG5cbiAgc29ydENvbHVtbihjb2x1bW46IGFueSkge1xuICAgIGlmIChjb2x1bW4uc29ydGFibGUpIHtcbiAgICAgIGlmIChfLmdldCh0aGlzLnNvcnQsIGNvbHVtbi5rZXkpID09IDApIHtcbiAgICAgICAgdGhpcy5zb3J0ID0ge307XG4gICAgICAgIHRoaXMuc29ydFtjb2x1bW4ua2V5XSA9IDFcbiAgICAgIH0gZWxzZSBpZiAoXy5nZXQodGhpcy5zb3J0LCBjb2x1bW4ua2V5KSA9PSAxKSB7XG4gICAgICAgIHRoaXMuc29ydCA9IHt9O1xuICAgICAgICB0aGlzLnNvcnRbY29sdW1uLmtleV0gPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zb3J0ID0ge307XG4gICAgICAgIHRoaXMuc29ydFtjb2x1bW4ua2V5XSA9IDE7XG4gICAgICB9XG4gICAgICB0aGlzLmxvYWREYXRhKCk7IC8vdGhpcy5wYWdlTm9cbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIE91dHB1dCwgSW5wdXQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMixcbiAgQXR0cmlidXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gaW1wb3J0IHsgRm9ybUNvbnRyb2wsIENvbnRyb2xDb250YWluZXIsIFxuICAgRm9ybUdyb3VwRGlyZWN0aXZlLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuIFxuIEBEaXJlY3RpdmUoe1xuICAgc2VsZWN0b3I6ICdbZm9ybUNvbnRyb2xOYW1lXVtuZ3gtdGJsLWNvbnRyb2xdJyxcbiB9KVxuIFxuIGV4cG9ydCBjbGFzcyBOZ3hUYmxDb250cm9sIHtcbiAgIEBJbnB1dCgndmFsaWRhdG9ycycpIHZhbGlkYXRvcnM6IGFueTtcbiAgIHByaXZhdGUgZm9ybTogYW55O1xuICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250YWluZXI6IENvbnRyb2xDb250YWluZXIsIEBBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpIHByaXZhdGUgbmFtZTogYW55LCBcbiAgIEBBdHRyaWJ1dGUoJ3ZhbGlkYXRpb24nKSB2YWxpZGF0aW9uOiBhbnksIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgICB0aGlzLmZvcm0gPSAodGhpcy5jb250YWluZXIgYXMgRm9ybUdyb3VwRGlyZWN0aXZlKS5mb3JtO1xuICAgICB0aGlzLmZvcm0ucmVtb3ZlQ29udHJvbCh0aGlzLm5hbWUpO1xuICAgICBpZiAoIXRoaXMuZm9ybS5nZXQodGhpcy5uYW1lKSkge1xuICAgICAgIHRoaXMuZm9ybS5hZGRDb250cm9sKHRoaXMubmFtZSwgbmV3IEZvcm1Db250cm9sKCcnKSk7XG4gICAgIH1cbiAgIH1cbiB9IiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmRlY2xhcmUgdmFyIHBhcnNlSW50OiBhbnlcbmRlY2xhcmUgdmFyIE1hdGg6IGFueVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRibC1wYWdpbmF0aW9uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW2BcbiAgICAucGFnaW5hdGlvbiB7IGZsb2F0OiByaWdodDsgbWFyZ2luOjAgMCA3cHggMDsgfVxuICAgIC5wYWdpbmF0aW9uIGxpe2N1cnNvcjpwb2ludGVyO31cbiAgICAucGFnaW5nLWluZm8ge2ZvbnQtc3R5bGU6IGl0YWxpYztjb2xvcjogIzgwODA4MDtsaW5lLWhlaWdodDogMjt9XG4gIGBdLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgY29sLXhzLTMgY29sLWxnLTMgY29sLXNtLTMgcGFnaW5nLWluZm9cIiAqbmdJZj1cInRvdGFsXCI+XG4gICAgPHNwYW4+c2hvd2luZyB7e3RoaXMucGFnZXIuc3RhcnRJbmRleCsxfX0gdG8ge3t0aGlzLnBhZ2VyLmVuZENvdW50fX0gb2Yge3t0b3RhbH19PC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbC1tZC05IGNvbC14cy05IGNvbC1sZy05IGNvbC1zbS05XCI+XG4gIDx1bCAqbmdJZj1cInBhZ2VyLnBhZ2VzICYmIHBhZ2VyLnBhZ2VzLmxlbmd0aFwiIGNsYXNzPVwicGFnaW5hdGlvblwiPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IDF9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKDEpXCI+Rmlyc3Q8L2E+XG4gICAgPC9saT5cbiAgICA8bGkgW25nQ2xhc3NdPVwie2Rpc2FibGVkOnBhZ2VyLmN1cnJlbnRQYWdlID09PSAxfVwiPlxuICAgICAgICA8YSAoY2xpY2spPVwic2V0UGFnZShwYWdlci5jdXJyZW50UGFnZSAtIDEpXCI+UHJldjwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSAqbmdGb3I9XCJsZXQgcGFnZSBvZiBwYWdlci5wYWdlc1wiIFtuZ0NsYXNzXT1cInthY3RpdmU6cGFnZXIuY3VycmVudFBhZ2UgPT09IHBhZ2V9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKHBhZ2UpXCI+e3twYWdlfX08L2E+XG4gICAgPC9saT5cbiAgICA8bGkgW25nQ2xhc3NdPVwie2Rpc2FibGVkOnBhZ2VyLmN1cnJlbnRQYWdlID09PSBwYWdlci50b3RhbFBhZ2VzfVwiPlxuICAgICAgICA8YSAoY2xpY2spPVwic2V0UGFnZShwYWdlci5jdXJyZW50UGFnZSArIDEpXCI+TmV4dDwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IHBhZ2VyLnRvdGFsUGFnZXN9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKHBhZ2VyLnRvdGFsUGFnZXMpXCI+TGFzdDwvYT5cbiAgICA8L2xpPlxuICA8L3VsPlxuICA8L2Rpdj5cbiAgYFxufSlcblxuZXhwb3J0IGNsYXNzIE5neFRibFBhZ2luYXRpb24ge1xuICBASW5wdXQoJ3Jlc2V0LXBhZ2luYXRpb24nKSByZXNldFBhZ2luYXRpb246IGFueTtcbiAgQElucHV0KCd0b3RhbCcpIHRvdGFsOiBhbnk7XG4gIEBJbnB1dCgpIGxpbWl0OiBhbnk7XG4gIEBPdXRwdXQoJ3BhZ2UtY2hhbmdlJykgcGFnZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHByaXZhdGUgcmVzZXQ6IGJvb2xlYW4gPSB0cnVlO1xuICBwYWdlcjogYW55ID0ge307XG5cbiAgc2V0UGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICBpZiAocGFnZSA8IDEgfHwgcGFnZSA+IHRoaXMucGFnZXIudG90YWxQYWdlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBhZ2VDaGFuZ2VkLmVtaXQocGFnZSk7XG4gICAgdGhpcy5wYWdlciA9IHRoaXMuZ2V0UGFnZXIodGhpcy50b3RhbCwgcGFnZSwgXy50b051bWJlcih0aGlzLmxpbWl0KSk7XG4gIH1cbiAgXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yZXNldFBhZ2luYXRpb24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVzZXQgPSB0cnVlO1xuICAgIH0pXG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICB0aGlzLmxpbWl0ID0gcGFyc2VJbnQodGhpcy5saW1pdCk7XG4gICAgaWYgKHRoaXMudG90YWwgPj0gMCAmJiB0aGlzLnJlc2V0KSB7XG4gICAgICB0aGlzLnJlc2V0ID0gZmFsc2U7XG4gICAgICB0aGlzLnBhZ2VyID0gdGhpcy5nZXRQYWdlcih0aGlzLnRvdGFsLCAxLCBfLnRvTnVtYmVyKHRoaXMubGltaXQpKTtcbiAgICB9XG4gIH1cblxuICBnZXRQYWdlcih0b3RhbEl0ZW1zOiBudW1iZXIsIGN1cnJlbnRQYWdlOiBudW1iZXIgPSAxLCBwYWdlU2l6ZTogbnVtYmVyID0gMTApIHtcbiAgICBsZXQgdG90YWxQYWdlcyA9IE1hdGguY2VpbCh0b3RhbEl0ZW1zIC8gcGFnZVNpemUpO1xuICAgIGxldCBzdGFydFBhZ2U6IG51bWJlciwgZW5kUGFnZTogbnVtYmVyO1xuICAgIGlmICh0b3RhbFBhZ2VzIDw9IDEwKSB7XG4gICAgICBzdGFydFBhZ2UgPSAxO1xuICAgICAgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjdXJyZW50UGFnZSA8PSA2KSB7XG4gICAgICAgIHN0YXJ0UGFnZSA9IDE7XG4gICAgICAgIGVuZFBhZ2UgPSAxMDtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBhZ2UgKyA0ID49IHRvdGFsUGFnZXMpIHtcbiAgICAgICAgc3RhcnRQYWdlID0gdG90YWxQYWdlcyAtIDk7XG4gICAgICAgIGVuZFBhZ2UgPSB0b3RhbFBhZ2VzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnRQYWdlID0gY3VycmVudFBhZ2UgLSA1O1xuICAgICAgICBlbmRQYWdlID0gY3VycmVudFBhZ2UgKyA0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBzdGFydEluZGV4ID0gKGN1cnJlbnRQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcbiAgICBsZXQgZW5kSW5kZXggPSBNYXRoLm1pbihzdGFydEluZGV4ICsgcGFnZVNpemUgLSAxLCB0b3RhbEl0ZW1zIC0gMSk7XG5cbiAgICBsZXQgcGFnZXMgPSBfLnJhbmdlKHN0YXJ0UGFnZSwgZW5kUGFnZSArIDEpO1xuXG4gICAgbGV0IGVuZENvdW50ID0gc3RhcnRJbmRleCArIHRoaXMubGltaXQ7XG4gICAgaWYgKGVuZENvdW50ID4gdGhpcy50b3RhbCkgeyBlbmRDb3VudCA9IHRoaXMudG90YWwgfVxuICAgIHJldHVybiB7XG4gICAgICB0b3RhbEl0ZW1zOiB0b3RhbEl0ZW1zLFxuICAgICAgY3VycmVudFBhZ2U6IGN1cnJlbnRQYWdlLFxuICAgICAgcGFnZVNpemU6IHBhZ2VTaXplLFxuICAgICAgdG90YWxQYWdlczogdG90YWxQYWdlcyxcbiAgICAgIHN0YXJ0UGFnZTogc3RhcnRQYWdlLFxuICAgICAgZW5kUGFnZTogZW5kUGFnZSxcbiAgICAgIHN0YXJ0SW5kZXg6IHN0YXJ0SW5kZXgsXG4gICAgICBlbmRJbmRleDogZW5kSW5kZXgsXG4gICAgICBwYWdlczogcGFnZXMsXG4gICAgICBlbmRDb3VudDogZW5kQ291bnRcbiAgICB9O1xuICB9XG59IiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuaW1wb3J0IHsgTmd4VGJsQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtdGJsLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hUYmxDb2x1bW4gfSBmcm9tICcuL25neC10YmwtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hUYmxDb250cm9sIH0gZnJvbSAnLi9uZ3gtdGJsLWNvbnRyb2wnO1xuaW1wb3J0IHsgTmd4VGJsUGFnaW5hdGlvbiB9IGZyb20gJy4vbmd4LXRibC1wYWdpbmF0aW9uL25neC10YmwtcGFnaW5hdGlvbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4VGJsQ29tcG9uZW50LFxuICAgIE5neFRibENvbHVtbixcbiAgICBOZ3hUYmxDb250cm9sLFxuICAgIE5neFRibFBhZ2luYXRpb25cbiAgXSxcbiAgZXhwb3J0czogWyBcbiAgICBOZ3hUYmxDb21wb25lbnQsXG4gICAgTmd4VGJsQ29sdW1uLFxuICAgIE5neFRibENvbnRyb2xcbiAgXVxufSlcblxuZXhwb3J0IGNsYXNzIE5neFRibE1vZHVsZSB7XG4gIFxufSJdLCJuYW1lcyI6WyJEaXJlY3RpdmUiLCJJbnB1dCIsIkNvbnRlbnRDaGlsZCIsIlN1YmplY3QiLCJFdmVudEVtaXR0ZXIiLCJkZWJvdW5jZVRpbWUiLCJtYXAiLCJfLmNsb25lIiwiXy5nZXQiLCJDb21wb25lbnQiLCJWaWV3Q2hpbGQiLCJPdXRwdXQiLCJDb250ZW50Q2hpbGRyZW4iLCJGb3JtQ29udHJvbCIsIkNvbnRyb2xDb250YWluZXIiLCJBdHRyaWJ1dGUiLCJSZW5kZXJlcjIiLCJFbGVtZW50UmVmIiwiXy50b051bWJlciIsIl8ucmFuZ2UiLCJDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7b0JBRUNBLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsZ0JBQWdCO3FCQUMzQjs7Ozs2QkFHRUMsVUFBSzs0QkFDTEEsVUFBSztpQ0FDTEEsVUFBSzsrQkFDTEEsVUFBSztxQ0FFTEMsaUJBQVksU0FBQyxvQkFBb0I7OzJCQVpwQzs7Ozs7OztBQ0FBO1FBbUZFO1lBQUEsaUJBS0M7eUJBN0JlLEVBQUU7d0JBQ04sRUFBRTsyQkFFSSxJQUFJQyxlQUFPLEVBQU87NkJBRWhCLElBQUlBLGVBQU8sRUFBRTswQkFZSyxJQUFJQyxpQkFBWSxFQUFPO3dCQUN6QixJQUFJQSxpQkFBWSxFQUFPO3dCQUN2QixJQUFJQSxpQkFBWSxFQUFFO3VCQUNuQixJQUFJQSxpQkFBWSxFQUFFOzBCQUNmLElBQUlBLGlCQUFZLEVBQUU7WUFJdEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUNqQkMsc0JBQVksQ0FBQyxHQUFHLENBQUMsRUFDakJDLGFBQUcsQ0FBQyxVQUFB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