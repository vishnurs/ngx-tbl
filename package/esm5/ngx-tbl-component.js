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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRibC1jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdGJsLyIsInNvdXJjZXMiOlsibmd4LXRibC1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFDbEMsTUFBTSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQ3pFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFFdEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFFbEQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7Ozs7Ozs7OztJQW1DMUI7UUFBQSxpQkFLQztxQkE3QmUsRUFBRTtvQkFDTixFQUFFO3VCQUVJLElBQUksT0FBTyxFQUFPO3lCQUVoQixJQUFJLE9BQU8sRUFBRTtzQkFZSyxJQUFJLFlBQVksRUFBTztvQkFDekIsSUFBSSxZQUFZLEVBQU87b0JBQ3ZCLElBQUksWUFBWSxFQUFFO21CQUNuQixJQUFJLFlBQVksRUFBRTtzQkFDZixJQUFJLFlBQVksRUFBRTtRQUl0RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ2pCLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDLENBQUE7S0FDL0I7MEJBbkJHLGtDQUFLOzs7O1FBR1Q7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNwQjs7Ozs7a0JBTFMsS0FBWTtZQUNwQixJ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LENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDMUI7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0I7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0I7WUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7S0FDRjs7Z0JBeEdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsU0FBUztvQkFDbkIsV0FBVyxFQUFFLDBCQUEwQjtpQkFDeEM7Ozs7O3VDQVdFLFNBQVMsU0FBQyxvQkFBb0I7MEJBQzlCLEtBQUs7MkJBT0wsS0FBSzsyQkFDTCxNQUFNO3lCQUNOLE1BQU07eUJBQ04sTUFBTTt3QkFDTixNQUFNOzJCQUNOLE1BQU07NEJBQ04sZUFBZSxTQUFDLFlBQVk7OzBCQXhDL0I7O1NBZ0JhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgSW5wdXQsIFxuICBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCdcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTmd4VGJsQ29sdW1uIH0gZnJvbSAnLi9uZ3gtdGJsLWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuZXhwb3J0IGludGVyZmFjZSBpdG0ge1xuICByb3dzPzogYW55W107XG4gIHRvdGFsOiBudW1iZXI7XG59XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdGJsJywgXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtdGJsLWNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hUYmxDb21wb25lbnQge1xuICBfaXRlbXM6IGFueTtcbiAgbGltaXQ6IG51bWJlciA9IDEwO1xuICBzb3J0OiBhbnkgPSB7fTtcbiAgc2VhcmNoUGFyYW06IHN0cmluZztcbiAgcHJpdmF0ZSBzdWJqZWN0ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICByZXNldFBhZ2luYXRpb246IE9ic2VydmFibGU8YW55PjtcbiAgcHJpdmF0ZSBkZWJvdW5jZXIgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIGRlbGV0ZVJvdzphbnk7XG5cbiAgQFZpZXdDaGlsZCgnZGVsZXRlQ29uZmlybU1vZGFsJykgZGVsZXRlQ29uZmlybU1vZGFsOiBhbnk7XG4gIEBJbnB1dCgpXG4gIHNldCBpdGVtcyhpdGVtczogYW55W10pIHtcbiAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICB9XG4gIGdldCBpdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gIH1cbiAgQElucHV0KCkgY29uZmlnOiBhbnk7XG4gIEBPdXRwdXQoKSB1cGRhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBsb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZWRpdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhZGQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ3hUYmxDb2x1bW4pIGNvbHVtbnM6IFF1ZXJ5TGlzdDxOZ3hUYmxDb2x1bW4+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmVzZXRQYWdpbmF0aW9uID0gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuZGVib3VuY2VyLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgIG1hcCh2YWwgPT4gdGhpcy5sb2FkRGF0YSgpKSlcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9hZERhdGEoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgICB0aGlzLmRlYm91bmNlci5uZXh0KClcbiAgfVxuXG4gIGxpbWl0Q2hhbmdlKCkge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICAgIHRoaXMubG9hZERhdGEoKTtcbiAgfVxuXG4gIGNvbmZpcm1EZWxldGUoaXRlbTogYW55KSB7XG4gICAgdGhpcy5kZWxldGVSb3cgPSBpdGVtO1xuICAgIHRoaXMuZGVsZXRlQ29uZmlybU1vZGFsLnNob3coKTtcbiAgfVxuXG4gIGRlbGV0ZUl0ZW0oKSB7XG4gICAgdGhpcy5kZWxldGUuZW1pdCh7IGl0ZW06IF8uY2xvbmUodGhpcy5kZWxldGVSb3cpLCB0YWJsZVBhcmFtczogdGhpcy5nZXRRdWVyeVBhcmFtcygxKSB9KTtcbiAgICB0aGlzLmRlbGV0ZVJvdyA9IHt9O1xuICAgIHRoaXMuZGVsZXRlQ29uZmlybU1vZGFsLmhpZGUoKTtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGNsb3NlTW9kYWwoKSB7XG4gICAgdGhpcy5kZWxldGVDb25maXJtTW9kYWwuaGlkZSgpO1xuICB9XG5cbiAgZWRpdFJvdyhpdGVtOiBhbnksIGluZGV4OiBhbnkpIHtcbiAgICB0aGlzLmVkaXQuZW1pdCh7IGl0ZW06IF8uY2xvbmUoaXRlbSksIHRhYmxlUGFyYW1zOiB0aGlzLmdldFF1ZXJ5UGFyYW1zKDEpIH0pO1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRydWUpO1xuICB9XG5cbiAgYWRkTmV3KCkge1xuICAgIHRoaXMuYWRkLmVtaXQoeyB0YWJsZVBhcmFtczogdGhpcy5nZXRRdWVyeVBhcmFtcygxKSB9KTtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGdldFF1ZXJ5UGFyYW1zKGN1cnJlbnRQYWdlOiBhbnkpIHtcbiAgICAvL3RoaXMucGFnZU5vID0gY3VycmVudFBhZ2U7XG4gICAgcmV0dXJuIHsgc2VhcmNoOiB0aGlzLnNlYXJjaFBhcmFtIHx8ICcnLCBsaW1pdDogdGhpcy5saW1pdCwgc2tpcDogKGN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLmxpbWl0LCBzb3J0OiB0aGlzLnNvcnQgfTtcbiAgfVxuXG4gIGxvYWREYXRhKGN1cnJlbnRQYWdlOiBudW1iZXIgPSAxKSB7XG4gICAgdGhpcy5sb2FkLmVtaXQodGhpcy5nZXRRdWVyeVBhcmFtcyhjdXJyZW50UGFnZSkpO1xuICB9XG5cbiAgc29ydENvbHVtbihjb2x1bW46IGFueSkge1xuICAgIGlmIChjb2x1bW4uc29ydGFibGUpIHtcbiAgICAgIGlmIChfLmdldCh0aGlzLnNvcnQsIGNvbHVtbi5rZXkpID09IDApIHtcbiAgICAgICAgdGhpcy5zb3J0ID0ge307XG4gICAgICAgIHRoaXMuc29ydFtjb2x1bW4ua2V5XSA9IDFcbiAgICAgIH0gZWxzZSBpZiAoXy5nZXQodGhpcy5zb3J0LCBjb2x1bW4ua2V5KSA9PSAxKSB7XG4gICAgICAgIHRoaXMuc29ydCA9IHt9O1xuICAgICAgICB0aGlzLnNvcnRbY29sdW1uLmtleV0gPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zb3J0ID0ge307XG4gICAgICAgIHRoaXMuc29ydFtjb2x1bW4ua2V5XSA9IDE7XG4gICAgICB9XG4gICAgICB0aGlzLmxvYWREYXRhKCk7IC8vdGhpcy5wYWdlTm9cbiAgICB9XG4gIH1cbn0iXX0=