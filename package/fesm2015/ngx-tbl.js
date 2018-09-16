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
class NgxTblColumn {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxTblComponent {
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
        this.delete.emit({ item: clone(this.deleteRow), tableParams: this.getQueryParams(1) });
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
        this.edit.emit({ item: clone(item), tableParams: this.getQueryParams(1) });
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
    }
}
NgxTblComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-tbl',
                templateUrl: './ngx-tbl-component.html'
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxTblControl {
    /**
     * @param {?} container
     * @param {?} name
     * @param {?} validation
     * @param {?} renderer
     * @param {?} el
     */
    constructor(container, name, validation, renderer, el) {
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
}
NgxTblControl.decorators = [
    { type: Directive, args: [{
                selector: '[formControlName][ngx-tbl-control]',
            },] },
];
/** @nocollapse */
NgxTblControl.ctorParameters = () => [
    { type: ControlContainer, },
    { type: undefined, decorators: [{ type: Attribute, args: ['formControlName',] },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['validation',] },] },
    { type: Renderer2, },
    { type: ElementRef, },
];
NgxTblControl.propDecorators = {
    "validators": [{ type: Input, args: ['validators',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxTblPagination {
    constructor() {
        this.pageChanged = new EventEmitter();
        this.reset = true;
        this.pager = {};
    }
    /**
     * @param {?} page
     * @return {?}
     */
    setPage(page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pageChanged.emit(page);
        this.pager = this.getPager(this.total, page, toNumber(this.limit));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.resetPagination.subscribe(() => {
            this.reset = true;
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.limit = parseInt(this.limit);
        if (this.total >= 0 && this.reset) {
            this.reset = false;
            this.pager = this.getPager(this.total, 1, toNumber(this.limit));
        }
    }
    /**
     * @param {?} totalItems
     * @param {?=} currentPage
     * @param {?=} pageSize
     * @return {?}
     */
    getPager(totalItems, currentPage = 1, pageSize = 10) {
        let /** @type {?} */ totalPages = Math.ceil(totalItems / pageSize);
        let /** @type {?} */ startPage, /** @type {?} */ endPage;
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
        let /** @type {?} */ startIndex = (currentPage - 1) * pageSize;
        let /** @type {?} */ endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        let /** @type {?} */ pages = range(startPage, endPage + 1);
        let /** @type {?} */ endCount = startIndex + this.limit;
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
    }
}
NgxTblPagination.decorators = [
    { type: Component, args: [{
                selector: 'ngx-tbl-pagination',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
    .pagination { float: right; margin:0 0 7px 0; }
    .pagination li{cursor:pointer;}
    .paging-info {font-style: italic;color: #808080;line-height: 2;}
  `],
                template: `
  <div class="col-md-3 col-xs-3 col-lg-3 col-sm-3 paging-info" *ngIf="total">
    <span>showing {{this.pager.startIndex+1}} to {{this.pager.endCount}} of {{total}}</span>
  </div>
  <div class="col-md-9 col-xs-9 col-lg-9 col-sm-9">
  <ul *ngIf="pager.pages && pager.pages.length" class="pagination">
    <li [ngClass]="{disabled:pager.currentPage === 1}">
        <a (click)="setPage(1)">First</a>
    </li>
    <li [ngClass]="{disabled:pager.currentPage === 1}">
        <a (click)="setPage(pager.currentPage - 1)">Prev</a>
    </li>
    <li *ngFor="let page of pager.pages" [ngClass]="{active:pager.currentPage === page}">
        <a (click)="setPage(page)">{{page}}</a>
    </li>
    <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}">
        <a (click)="setPage(pager.currentPage + 1)">Next</a>
    </li>
    <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}">
        <a (click)="setPage(pager.totalPages)">Last</a>
    </li>
  </ul>
  </div>
  `
            },] },
];
/** @nocollapse */
NgxTblPagination.ctorParameters = () => [];
NgxTblPagination.propDecorators = {
    "resetPagination": [{ type: Input, args: ['reset-pagination',] },],
    "total": [{ type: Input, args: ['total',] },],
    "limit": [{ type: Input },],
    "pageChanged": [{ type: Output, args: ['page-change',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxTblModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NgxTblModule, NgxTblComponent, NgxTblControl, NgxTblColumn, NgxTblPagination };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRibC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LXRibC9uZ3gtdGJsLWNvbHVtbi5jb21wb25lbnQudHMiLCJuZzovL25neC10Ymwvbmd4LXRibC1jb21wb25lbnQudHMiLCJuZzovL25neC10Ymwvbmd4LXRibC1jb250cm9sLnRzIiwibmc6Ly9uZ3gtdGJsL25neC10YmwtcGFnaW5hdGlvbi9uZ3gtdGJsLXBhZ2luYXRpb24udHMiLCJuZzovL25neC10Ymwvbmd4LXRibC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ25neC10YmwtY29sdW1uJ1xufSlcblxuZXhwb3J0IGNsYXNzIE5neFRibENvbHVtbiB7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkga2V5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNvcnRhYmxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG5hcnJvdzogYm9vbGVhbjtcblxuICBAQ29udGVudENoaWxkKCduZ3hUYmxDZWxsVGVtcGxhdGUnKSBjZWxsVGVtcGxhdGU6IGFueTtcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgSW5wdXQsIFxuICBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCdcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTmd4VGJsQ29sdW1uIH0gZnJvbSAnLi9uZ3gtdGJsLWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuZXhwb3J0IGludGVyZmFjZSBpdG0ge1xuICByb3dzPzogYW55W107XG4gIHRvdGFsOiBudW1iZXI7XG59XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdGJsJywgXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtdGJsLWNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hUYmxDb21wb25lbnQge1xuICBfaXRlbXM6IGFueTtcbiAgbGltaXQ6IG51bWJlciA9IDEwO1xuICBzb3J0OiBhbnkgPSB7fTtcbiAgc2VhcmNoUGFyYW06IHN0cmluZztcbiAgcHJpdmF0ZSBzdWJqZWN0ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICByZXNldFBhZ2luYXRpb246IE9ic2VydmFibGU8YW55PjtcbiAgcHJpdmF0ZSBkZWJvdW5jZXIgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIGRlbGV0ZVJvdzphbnk7XG5cbiAgQFZpZXdDaGlsZCgnZGVsZXRlQ29uZmlybU1vZGFsJykgZGVsZXRlQ29uZmlybU1vZGFsOiBhbnk7XG4gIEBJbnB1dCgpXG4gIHNldCBpdGVtcyhpdGVtczogYW55W10pIHtcbiAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICB9XG4gIGdldCBpdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gIH1cbiAgQElucHV0KCkgY29uZmlnOiBhbnk7XG4gIEBPdXRwdXQoKSB1cGRhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBsb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZWRpdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhZGQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ3hUYmxDb2x1bW4pIGNvbHVtbnM6IFF1ZXJ5TGlzdDxOZ3hUYmxDb2x1bW4+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmVzZXRQYWdpbmF0aW9uID0gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuZGVib3VuY2VyLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgIG1hcCh2YWwgPT4gdGhpcy5sb2FkRGF0YSgpKSlcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9hZERhdGEoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgICB0aGlzLmRlYm91bmNlci5uZXh0KClcbiAgfVxuXG4gIGxpbWl0Q2hhbmdlKCkge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICAgIHRoaXMubG9hZERhdGEoKTtcbiAgfVxuXG4gIGNvbmZpcm1EZWxldGUoaXRlbTogYW55KSB7XG4gICAgdGhpcy5kZWxldGVSb3cgPSBpdGVtO1xuICAgIHRoaXMuZGVsZXRlQ29uZmlybU1vZGFsLnNob3coKTtcbiAgfVxuXG4gIGRlbGV0ZUl0ZW0oKSB7XG4gICAgdGhpcy5kZWxldGUuZW1pdCh7IGl0ZW06IF8uY2xvbmUodGhpcy5kZWxldGVSb3cpLCB0YWJsZVBhcmFtczogdGhpcy5nZXRRdWVyeVBhcmFtcygxKSB9KTtcbiAgICB0aGlzLmRlbGV0ZVJvdyA9IHt9O1xuICAgIHRoaXMuZGVsZXRlQ29uZmlybU1vZGFsLmhpZGUoKTtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGNsb3NlTW9kYWwoKSB7XG4gICAgdGhpcy5kZWxldGVDb25maXJtTW9kYWwuaGlkZSgpO1xuICB9XG5cbiAgZWRpdFJvdyhpdGVtOiBhbnksIGluZGV4OiBhbnkpIHtcbiAgICB0aGlzLmVkaXQuZW1pdCh7IGl0ZW06IF8uY2xvbmUoaXRlbSksIHRhYmxlUGFyYW1zOiB0aGlzLmdldFF1ZXJ5UGFyYW1zKDEpIH0pO1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICB9XG5cbiAgYWRkTmV3KCkge1xuICAgIHRoaXMuYWRkLmVtaXQoeyB0YWJsZVBhcmFtczogdGhpcy5nZXRRdWVyeVBhcmFtcygxKSB9KTtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGdldFF1ZXJ5UGFyYW1zKGN1cnJlbnRQYWdlOiBhbnkpIHtcbiAgICAvL3RoaXMucGFnZU5vID0gY3VycmVudFBhZ2U7XG4gICAgcmV0dXJuIHsgc2VhcmNoOiB0aGlzLnNlYXJjaFBhcmFtIHx8ICcnLCBsaW1pdDogdGhpcy5saW1pdCwgc2tpcDogKGN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLmxpbWl0LCBzb3J0OiB0aGlzLnNvcnQgfTtcbiAgfVxuXG4gIGxvYWREYXRhKGN1cnJlbnRQYWdlOiBudW1iZXIgPSAxKSB7XG4gICAgdGhpcy5sb2FkLmVtaXQodGhpcy5nZXRRdWVyeVBhcmFtcyhjdXJyZW50UGFnZSkpO1xuICB9XG5cbiAgc29ydENvbHVtbihjb2x1bW46IGFueSkge1xuICAgIGlmIChjb2x1bW4uc29ydGFibGUpIHtcbiAgICAgIGlmIChfLmdldCh0aGlzLnNvcnQsIGNvbHVtbi5rZXkpID09IDApIHtcbiAgICAgICAgdGhpcy5zb3J0ID0ge307XG4gICAgICAgIHRoaXMuc29ydFtjb2x1bW4ua2V5XSA9IDFcbiAgICAgIH0gZWxzZSBpZiAoXy5nZXQodGhpcy5zb3J0LCBjb2x1bW4ua2V5KSA9PSAxKSB7XG4gICAgICAgIHRoaXMuc29ydCA9IHt9O1xuICAgICAgICB0aGlzLnNvcnRbY29sdW1uLmtleV0gPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zb3J0ID0ge307XG4gICAgICAgIHRoaXMuc29ydFtjb2x1bW4ua2V5XSA9IDE7XG4gICAgICB9XG4gICAgICB0aGlzLmxvYWREYXRhKCk7IC8vdGhpcy5wYWdlTm9cbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIE91dHB1dCwgSW5wdXQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMixcbiAgQXR0cmlidXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gaW1wb3J0IHsgRm9ybUNvbnRyb2wsIENvbnRyb2xDb250YWluZXIsIFxuICAgRm9ybUdyb3VwRGlyZWN0aXZlLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuIFxuIEBEaXJlY3RpdmUoe1xuICAgc2VsZWN0b3I6ICdbZm9ybUNvbnRyb2xOYW1lXVtuZ3gtdGJsLWNvbnRyb2xdJyxcbiB9KVxuIFxuIGV4cG9ydCBjbGFzcyBOZ3hUYmxDb250cm9sIHtcbiAgIEBJbnB1dCgndmFsaWRhdG9ycycpIHZhbGlkYXRvcnM6IGFueTtcbiAgIHByaXZhdGUgZm9ybTogYW55O1xuICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250YWluZXI6IENvbnRyb2xDb250YWluZXIsIEBBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpIHByaXZhdGUgbmFtZTogYW55LCBcbiAgIEBBdHRyaWJ1dGUoJ3ZhbGlkYXRpb24nKSB2YWxpZGF0aW9uOiBhbnksIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgICB0aGlzLmZvcm0gPSAodGhpcy5jb250YWluZXIgYXMgRm9ybUdyb3VwRGlyZWN0aXZlKS5mb3JtO1xuICAgICB0aGlzLmZvcm0ucmVtb3ZlQ29udHJvbCh0aGlzLm5hbWUpO1xuICAgICBpZiAoIXRoaXMuZm9ybS5nZXQodGhpcy5uYW1lKSkge1xuICAgICAgIHRoaXMuZm9ybS5hZGRDb250cm9sKHRoaXMubmFtZSwgbmV3IEZvcm1Db250cm9sKCcnKSk7XG4gICAgIH1cbiAgIH1cbiB9IiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmRlY2xhcmUgdmFyIHBhcnNlSW50OiBhbnlcbmRlY2xhcmUgdmFyIE1hdGg6IGFueVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRibC1wYWdpbmF0aW9uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW2BcbiAgICAucGFnaW5hdGlvbiB7IGZsb2F0OiByaWdodDsgbWFyZ2luOjAgMCA3cHggMDsgfVxuICAgIC5wYWdpbmF0aW9uIGxpe2N1cnNvcjpwb2ludGVyO31cbiAgICAucGFnaW5nLWluZm8ge2ZvbnQtc3R5bGU6IGl0YWxpYztjb2xvcjogIzgwODA4MDtsaW5lLWhlaWdodDogMjt9XG4gIGBdLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgY29sLXhzLTMgY29sLWxnLTMgY29sLXNtLTMgcGFnaW5nLWluZm9cIiAqbmdJZj1cInRvdGFsXCI+XG4gICAgPHNwYW4+c2hvd2luZyB7e3RoaXMucGFnZXIuc3RhcnRJbmRleCsxfX0gdG8ge3t0aGlzLnBhZ2VyLmVuZENvdW50fX0gb2Yge3t0b3RhbH19PC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbC1tZC05IGNvbC14cy05IGNvbC1sZy05IGNvbC1zbS05XCI+XG4gIDx1bCAqbmdJZj1cInBhZ2VyLnBhZ2VzICYmIHBhZ2VyLnBhZ2VzLmxlbmd0aFwiIGNsYXNzPVwicGFnaW5hdGlvblwiPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IDF9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKDEpXCI+Rmlyc3Q8L2E+XG4gICAgPC9saT5cbiAgICA8bGkgW25nQ2xhc3NdPVwie2Rpc2FibGVkOnBhZ2VyLmN1cnJlbnRQYWdlID09PSAxfVwiPlxuICAgICAgICA8YSAoY2xpY2spPVwic2V0UGFnZShwYWdlci5jdXJyZW50UGFnZSAtIDEpXCI+UHJldjwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSAqbmdGb3I9XCJsZXQgcGFnZSBvZiBwYWdlci5wYWdlc1wiIFtuZ0NsYXNzXT1cInthY3RpdmU6cGFnZXIuY3VycmVudFBhZ2UgPT09IHBhZ2V9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKHBhZ2UpXCI+e3twYWdlfX08L2E+XG4gICAgPC9saT5cbiAgICA8bGkgW25nQ2xhc3NdPVwie2Rpc2FibGVkOnBhZ2VyLmN1cnJlbnRQYWdlID09PSBwYWdlci50b3RhbFBhZ2VzfVwiPlxuICAgICAgICA8YSAoY2xpY2spPVwic2V0UGFnZShwYWdlci5jdXJyZW50UGFnZSArIDEpXCI+TmV4dDwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IHBhZ2VyLnRvdGFsUGFnZXN9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKHBhZ2VyLnRvdGFsUGFnZXMpXCI+TGFzdDwvYT5cbiAgICA8L2xpPlxuICA8L3VsPlxuICA8L2Rpdj5cbiAgYFxufSlcblxuZXhwb3J0IGNsYXNzIE5neFRibFBhZ2luYXRpb24ge1xuICBASW5wdXQoJ3Jlc2V0LXBhZ2luYXRpb24nKSByZXNldFBhZ2luYXRpb246IGFueTtcbiAgQElucHV0KCd0b3RhbCcpIHRvdGFsOiBhbnk7XG4gIEBJbnB1dCgpIGxpbWl0OiBhbnk7XG4gIEBPdXRwdXQoJ3BhZ2UtY2hhbmdlJykgcGFnZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHByaXZhdGUgcmVzZXQ6IGJvb2xlYW4gPSB0cnVlO1xuICBwYWdlcjogYW55ID0ge307XG5cbiAgc2V0UGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICBpZiAocGFnZSA8IDEgfHwgcGFnZSA+IHRoaXMucGFnZXIudG90YWxQYWdlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBhZ2VDaGFuZ2VkLmVtaXQocGFnZSk7XG4gICAgdGhpcy5wYWdlciA9IHRoaXMuZ2V0UGFnZXIodGhpcy50b3RhbCwgcGFnZSwgXy50b051bWJlcih0aGlzLmxpbWl0KSk7XG4gIH1cbiAgXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yZXNldFBhZ2luYXRpb24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVzZXQgPSB0cnVlO1xuICAgIH0pXG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICB0aGlzLmxpbWl0ID0gcGFyc2VJbnQodGhpcy5saW1pdCk7XG4gICAgaWYgKHRoaXMudG90YWwgPj0gMCAmJiB0aGlzLnJlc2V0KSB7XG4gICAgICB0aGlzLnJlc2V0ID0gZmFsc2U7XG4gICAgICB0aGlzLnBhZ2VyID0gdGhpcy5nZXRQYWdlcih0aGlzLnRvdGFsLCAxLCBfLnRvTnVtYmVyKHRoaXMubGltaXQpKTtcbiAgICB9XG4gIH1cblxuICBnZXRQYWdlcih0b3RhbEl0ZW1zOiBudW1iZXIsIGN1cnJlbnRQYWdlOiBudW1iZXIgPSAxLCBwYWdlU2l6ZTogbnVtYmVyID0gMTApIHtcbiAgICBsZXQgdG90YWxQYWdlcyA9IE1hdGguY2VpbCh0b3RhbEl0ZW1zIC8gcGFnZVNpemUpO1xuICAgIGxldCBzdGFydFBhZ2U6IG51bWJlciwgZW5kUGFnZTogbnVtYmVyO1xuICAgIGlmICh0b3RhbFBhZ2VzIDw9IDEwKSB7XG4gICAgICBzdGFydFBhZ2UgPSAxO1xuICAgICAgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjdXJyZW50UGFnZSA8PSA2KSB7XG4gICAgICAgIHN0YXJ0UGFnZSA9IDE7XG4gICAgICAgIGVuZFBhZ2UgPSAxMDtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBhZ2UgKyA0ID49IHRvdGFsUGFnZXMpIHtcbiAgICAgICAgc3RhcnRQYWdlID0gdG90YWxQYWdlcyAtIDk7XG4gICAgICAgIGVuZFBhZ2UgPSB0b3RhbFBhZ2VzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnRQYWdlID0gY3VycmVudFBhZ2UgLSA1O1xuICAgICAgICBlbmRQYWdlID0gY3VycmVudFBhZ2UgKyA0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBzdGFydEluZGV4ID0gKGN1cnJlbnRQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcbiAgICBsZXQgZW5kSW5kZXggPSBNYXRoLm1pbihzdGFydEluZGV4ICsgcGFnZVNpemUgLSAxLCB0b3RhbEl0ZW1zIC0gMSk7XG5cbiAgICBsZXQgcGFnZXMgPSBfLnJhbmdlKHN0YXJ0UGFnZSwgZW5kUGFnZSArIDEpO1xuXG4gICAgbGV0IGVuZENvdW50ID0gc3RhcnRJbmRleCArIHRoaXMubGltaXQ7XG4gICAgaWYgKGVuZENvdW50ID4gdGhpcy50b3RhbCkgeyBlbmRDb3VudCA9IHRoaXMudG90YWwgfVxuICAgIHJldHVybiB7XG4gICAgICB0b3RhbEl0ZW1zOiB0b3RhbEl0ZW1zLFxuICAgICAgY3VycmVudFBhZ2U6IGN1cnJlbnRQYWdlLFxuICAgICAgcGFnZVNpemU6IHBhZ2VTaXplLFxuICAgICAgdG90YWxQYWdlczogdG90YWxQYWdlcyxcbiAgICAgIHN0YXJ0UGFnZTogc3RhcnRQYWdlLFxuICAgICAgZW5kUGFnZTogZW5kUGFnZSxcbiAgICAgIHN0YXJ0SW5kZXg6IHN0YXJ0SW5kZXgsXG4gICAgICBlbmRJbmRleDogZW5kSW5kZXgsXG4gICAgICBwYWdlczogcGFnZXMsXG4gICAgICBlbmRDb3VudDogZW5kQ291bnRcbiAgICB9O1xuICB9XG59IiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuaW1wb3J0IHsgTmd4VGJsQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtdGJsLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hUYmxDb2x1bW4gfSBmcm9tICcuL25neC10YmwtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hUYmxDb250cm9sIH0gZnJvbSAnLi9uZ3gtdGJsLWNvbnRyb2wnO1xuaW1wb3J0IHsgTmd4VGJsUGFnaW5hdGlvbiB9IGZyb20gJy4vbmd4LXRibC1wYWdpbmF0aW9uL25neC10YmwtcGFnaW5hdGlvbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4VGJsQ29tcG9uZW50LFxuICAgIE5neFRibENvbHVtbixcbiAgICBOZ3hUYmxDb250cm9sLFxuICAgIE5neFRibFBhZ2luYXRpb25cbiAgXSxcbiAgZXhwb3J0czogWyBcbiAgICBOZ3hUYmxDb21wb25lbnQsXG4gICAgTmd4VGJsQ29sdW1uLFxuICAgIE5neFRibENvbnRyb2xcbiAgXVxufSlcblxuZXhwb3J0IGNsYXNzIE5neFRibE1vZHVsZSB7XG4gIFxufSJdLCJuYW1lcyI6WyJfLmNsb25lIiwiXy5nZXQiLCJfLnRvTnVtYmVyIiwiXy5yYW5nZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7O1lBRUMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7YUFDM0I7Ozs7cUJBR0UsS0FBSztvQkFDTCxLQUFLO3lCQUNMLEtBQUs7dUJBQ0wsS0FBSzs2QkFFTCxZQUFZLFNBQUMsb0JBQW9COzs7Ozs7O0FDWnBDO0lBMENFO3FCQXhCZ0IsRUFBRTtvQkFDTixFQUFFO3VCQUVJLElBQUksT0FBTyxFQUFPO3lCQUVoQixJQUFJLE9BQU8sRUFBRTtzQkFZSyxJQUFJLFlBQVksRUFBTztvQkFDekIsSUFBSSxZQUFZLEVBQU87b0JBQ3ZCLElBQUksWUFBWSxFQUFFO21CQUNuQixJQUFJLFlBQVksRUFBRTtzQkFDZixJQUFJLFlBQVksRUFBRTtRQUl0RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ2pCLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO0tBQy9COzs7OztRQW5CRyxLQUFLLENBQUMsS0FBWTtRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7Ozs7SUFFdEIsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3BCOzs7O0lBZ0JELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDakI7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7Ozs7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtLQUN0Qjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDakI7Ozs7O0lBRUQsYUFBYSxDQUFDLElBQVM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2hDOzs7O0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFQSxLQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6RixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7Ozs7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2hDOzs7Ozs7SUFFRCxPQUFPLENBQUMsSUFBUyxFQUFFLEtBQVU7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUVBLEtBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7Ozs7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7Ozs7O0lBRUQsY0FBYyxDQUFDLFdBQWdCOztRQUU3QixPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3JIOzs7OztJQUVELFFBQVEsQ0FBQyxjQUFzQixDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztLQUNsRDs7Ozs7SUFFRCxVQUFVLENBQUMsTUFBVztRQUNwQixJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDbkIsSUFBSUMsR0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQzFCO2lCQUFNLElBQUlBLEdBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0I7WUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7S0FDRjs7O1lBeEdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsV0FBVyxFQUFFLDBCQUEwQjthQUN4Qzs7Ozs7bUNBV0UsU0FBUyxTQUFDLG9CQUFvQjtzQkFDOUIsS0FBSzt1QkFPTCxLQUFLO3VCQUNMLE1BQU07cUJBQ04sTUFBTTtxQkFDTixNQUFNO29CQUNOLE1BQU07dUJBQ04sTUFBTTt3QkFDTixlQUFlLFNBQUMsWUFBWTs7Ozs7OztBQ3hDL0I7Ozs7Ozs7O0lBWUcsWUFBb0IsU0FBMkIsRUFBd0MsTUFDOUQsWUFBeUIsUUFBbUIsRUFBVSxFQUFjO1FBRHpFLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQXdDLFNBQUksR0FBSixJQUFJO1FBQ3pDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQzNGLElBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQUMsSUFBSSxDQUFDLFNBQStCLEdBQUUsSUFBSSxDQUFDO1FBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN0RDtLQUNGOzs7WUFkRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9DQUFvQzthQUMvQzs7OztZQUxxQixnQkFBZ0I7NENBVWMsU0FBUyxTQUFDLGlCQUFpQjs0Q0FDNUUsU0FBUyxTQUFDLFlBQVk7WUFicUIsU0FBUztZQUFyQixVQUFVOzs7MkJBVXpDLEtBQUssU0FBQyxZQUFZOzs7Ozs7O0FDVnRCO0lBK0RFOzJCQVpxQyxJQUFJLFlBQVksRUFBRTtxQkFDOUIsSUFBSTtxQkFDaEIsRUFBRTtLQVdkOzs7OztJQVRELE9BQU8sQ0FBQyxJQUFZO1FBQ2xCLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFDNUMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFQyxRQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDdEU7Ozs7SUFLRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7WUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDbkIsQ0FBQyxDQUFBO0tBQ0g7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQVk7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUVBLFFBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNuRTtLQUNGOzs7Ozs7O0lBRUQsUUFBUSxDQUFDLFVBQWtCLEVBQUUsY0FBc0IsQ0FBQyxFQUFFLFdBQW1CLEVBQUU7UUFDekUscUJBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELHFCQUFJLFNBQWlCLG1CQUFFLE9BQWUsQ0FBQztRQUN2QyxJQUFJLFVBQVUsSUFBSSxFQUFFLEVBQUU7WUFDcEIsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNkLE9BQU8sR0FBRyxVQUFVLENBQUM7U0FDdEI7YUFBTTtZQUNMLElBQUksV0FBVyxJQUFJLENBQUMsRUFBRTtnQkFDcEIsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDZCxPQUFPLEdBQUcsRUFBRSxDQUFDO2FBQ2Q7aUJBQU0sSUFBSSxXQUFXLEdBQUcsQ0FBQyxJQUFJLFVBQVUsRUFBRTtnQkFDeEMsU0FBUyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sR0FBRyxVQUFVLENBQUM7YUFDdEI7aUJBQU07Z0JBQ0wsU0FBUyxHQUFHLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLE9BQU8sR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO1NBQ0Y7UUFFRCxxQkFBSSxVQUFVLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLFFBQVEsQ0FBQztRQUM5QyxxQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsUUFBUSxHQUFHLENBQUMsRUFBRSxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFbkUscUJBQUksS0FBSyxHQUFHQyxLQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUU1QyxxQkFBSSxRQUFRLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdkMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO1NBQUU7UUFDcEQsT0FBTztZQUNMLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLEtBQUssRUFBRSxLQUFLO1lBQ1osUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQztLQUNIOzs7WUF6R0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxNQUFNLEVBQUUsQ0FBQzs7OztHQUlSLENBQUM7Z0JBQ0YsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDthQUNGOzs7OztnQ0FHRSxLQUFLLFNBQUMsa0JBQWtCO3NCQUN4QixLQUFLLFNBQUMsT0FBTztzQkFDYixLQUFLOzRCQUNMLE1BQU0sU0FBQyxhQUFhOzs7Ozs7O0FDbkR2Qjs7O1lBU0MsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO2lCQUNiO2dCQUNELFlBQVksRUFBRTtvQkFDWixlQUFlO29CQUNmLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixnQkFBZ0I7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxlQUFlO29CQUNmLFlBQVk7b0JBQ1osYUFBYTtpQkFDZDthQUNGOzs7Ozs7Ozs7Ozs7Ozs7In0=