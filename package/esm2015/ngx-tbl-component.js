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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRibC1jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdGJsLyIsInNvdXJjZXMiOlsibmd4LXRibC1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFDbEMsTUFBTSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQ3pFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFFdEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFFbEQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7Ozs7Ozs7O0FBUzVCLE1BQU07SUEwQko7cUJBeEJnQixFQUFFO29CQUNOLEVBQUU7dUJBRUksSUFBSSxPQUFPLEVBQU87eUJBRWhCLElBQUksT0FBTyxFQUFFO3NCQVlLLElBQUksWUFBWSxFQUFPO29CQUN6QixJQUFJLFlBQVksRUFBTztvQkFDdkIsSUFBSSxZQUFZLEVBQUU7bUJBQ25CLElBQUksWUFBWSxFQUFFO3NCQUNmLElBQUksWUFBWSxFQUFFO1FBSXRELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDakIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO0tBQy9COzs7OztRQW5CRyxLQUFLLENBQUMsS0FBWTtRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7Ozs7SUFFdEIsSUFBSSxLQUFLO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDcEI7Ozs7SUFnQkQsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNqQjs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7OztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFBO0tBQ3RCOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNqQjs7Ozs7SUFFRCxhQUFhLENBQUMsSUFBUztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDaEM7Ozs7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7OztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDaEM7Ozs7OztJQUVELE9BQU8sQ0FBQyxJQUFTLEVBQUUsS0FBVTtRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7OztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7Ozs7SUFFRCxjQUFjLENBQUMsV0FBZ0I7O1FBRTdCLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3JIOzs7OztJQUVELFFBQVEsQ0FBQyxjQUFzQixDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztLQUNsRDs7Ozs7SUFFRCxVQUFVLENBQUMsTUFBVztRQUNwQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUMxQjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzQjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzQjtZQUNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjtLQUNGOzs7WUF4R0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQixXQUFXLEVBQUUsMEJBQTBCO2FBQ3hDOzs7OzttQ0FXRSxTQUFTLFNBQUMsb0JBQW9CO3NCQUM5QixLQUFLO3VCQU9MLEtBQUs7dUJBQ0wsTUFBTTtxQkFDTixNQUFNO3FCQUNOLE1BQU07b0JBQ04sTUFBTTt1QkFDTixNQUFNO3dCQUNOLGVBQWUsU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIElucHV0LCBcbiAgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE5neFRibENvbHVtbiB9IGZyb20gJy4vbmd4LXRibC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmV4cG9ydCBpbnRlcmZhY2UgaXRtIHtcbiAgcm93cz86IGFueVtdO1xuICB0b3RhbDogbnVtYmVyO1xufVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRibCcsIFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LXRibC1jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VGJsQ29tcG9uZW50IHtcbiAgX2l0ZW1zOiBhbnk7XG4gIGxpbWl0OiBudW1iZXIgPSAxMDtcbiAgc29ydDogYW55ID0ge307XG4gIHNlYXJjaFBhcmFtOiBzdHJpbmc7XG4gIHByaXZhdGUgc3ViamVjdCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcmVzZXRQYWdpbmF0aW9uOiBPYnNlcnZhYmxlPGFueT47XG4gIHByaXZhdGUgZGVib3VuY2VyID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBkZWxldGVSb3c6YW55O1xuXG4gIEBWaWV3Q2hpbGQoJ2RlbGV0ZUNvbmZpcm1Nb2RhbCcpIGRlbGV0ZUNvbmZpcm1Nb2RhbDogYW55O1xuICBASW5wdXQoKVxuICBzZXQgaXRlbXMoaXRlbXM6IGFueVtdKSB7XG4gICAgdGhpcy5faXRlbXMgPSBpdGVtcztcbiAgfVxuICBnZXQgaXRlbXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICB9XG4gIEBJbnB1dCgpIGNvbmZpZzogYW55O1xuICBAT3V0cHV0KCkgdXBkYXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgbG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGVkaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWRkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlbGV0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBDb250ZW50Q2hpbGRyZW4oTmd4VGJsQ29sdW1uKSBjb2x1bW5zOiBRdWVyeUxpc3Q8Tmd4VGJsQ29sdW1uPjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJlc2V0UGFnaW5hdGlvbiA9IHRoaXMuc3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICB0aGlzLmRlYm91bmNlci5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgICBtYXAodmFsID0+IHRoaXMubG9hZERhdGEoKSkpXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxvYWREYXRhKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQodHJ1ZSk7XG4gIH1cblxuICBzZWFyY2goKSB7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQodHJ1ZSk7XG4gICAgdGhpcy5kZWJvdW5jZXIubmV4dCgpXG4gIH1cblxuICBsaW1pdENoYW5nZSgpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgICB0aGlzLmxvYWREYXRhKCk7XG4gIH1cblxuICBjb25maXJtRGVsZXRlKGl0ZW06IGFueSkge1xuICAgIHRoaXMuZGVsZXRlUm93ID0gaXRlbTtcbiAgICB0aGlzLmRlbGV0ZUNvbmZpcm1Nb2RhbC5zaG93KCk7XG4gIH1cblxuICBkZWxldGVJdGVtKCkge1xuICAgIHRoaXMuZGVsZXRlLmVtaXQoeyBpdGVtOiBfLmNsb25lKHRoaXMuZGVsZXRlUm93KSwgdGFibGVQYXJhbXM6IHRoaXMuZ2V0UXVlcnlQYXJhbXMoMSkgfSk7XG4gICAgdGhpcy5kZWxldGVSb3cgPSB7fTtcbiAgICB0aGlzLmRlbGV0ZUNvbmZpcm1Nb2RhbC5oaWRlKCk7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQodHJ1ZSk7XG4gIH1cblxuICBjbG9zZU1vZGFsKCkge1xuICAgIHRoaXMuZGVsZXRlQ29uZmlybU1vZGFsLmhpZGUoKTtcbiAgfVxuXG4gIGVkaXRSb3coaXRlbTogYW55LCBpbmRleDogYW55KSB7XG4gICAgdGhpcy5lZGl0LmVtaXQoeyBpdGVtOiBfLmNsb25lKGl0ZW0pLCB0YWJsZVBhcmFtczogdGhpcy5nZXRRdWVyeVBhcmFtcygxKSB9KTtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGFkZE5ldygpIHtcbiAgICB0aGlzLmFkZC5lbWl0KHsgdGFibGVQYXJhbXM6IHRoaXMuZ2V0UXVlcnlQYXJhbXMoMSkgfSk7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQodHJ1ZSk7XG4gIH1cblxuICBnZXRRdWVyeVBhcmFtcyhjdXJyZW50UGFnZTogYW55KSB7XG4gICAgLy90aGlzLnBhZ2VObyA9IGN1cnJlbnRQYWdlO1xuICAgIHJldHVybiB7IHNlYXJjaDogdGhpcy5zZWFyY2hQYXJhbSB8fCAnJywgbGltaXQ6IHRoaXMubGltaXQsIHNraXA6IChjdXJyZW50UGFnZSAtIDEpICogdGhpcy5saW1pdCwgc29ydDogdGhpcy5zb3J0IH07XG4gIH1cblxuICBsb2FkRGF0YShjdXJyZW50UGFnZTogbnVtYmVyID0gMSkge1xuICAgIHRoaXMubG9hZC5lbWl0KHRoaXMuZ2V0UXVlcnlQYXJhbXMoY3VycmVudFBhZ2UpKTtcbiAgfVxuXG4gIHNvcnRDb2x1bW4oY29sdW1uOiBhbnkpIHtcbiAgICBpZiAoY29sdW1uLnNvcnRhYmxlKSB7XG4gICAgICBpZiAoXy5nZXQodGhpcy5zb3J0LCBjb2x1bW4ua2V5KSA9PSAwKSB7XG4gICAgICAgIHRoaXMuc29ydCA9IHt9O1xuICAgICAgICB0aGlzLnNvcnRbY29sdW1uLmtleV0gPSAxXG4gICAgICB9IGVsc2UgaWYgKF8uZ2V0KHRoaXMuc29ydCwgY29sdW1uLmtleSkgPT0gMSkge1xuICAgICAgICB0aGlzLnNvcnQgPSB7fTtcbiAgICAgICAgdGhpcy5zb3J0W2NvbHVtbi5rZXldID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc29ydCA9IHt9O1xuICAgICAgICB0aGlzLnNvcnRbY29sdW1uLmtleV0gPSAxO1xuICAgICAgfVxuICAgICAgdGhpcy5sb2FkRGF0YSgpOyAvL3RoaXMucGFnZU5vXG4gICAgfVxuICB9XG59Il19