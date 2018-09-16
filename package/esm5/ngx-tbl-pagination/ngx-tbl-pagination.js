/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';
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
export { NgxTblPagination };
function NgxTblPagination_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgxTblPagination.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgxTblPagination.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    NgxTblPagination.propDecorators;
    /** @type {?} */
    NgxTblPagination.prototype.resetPagination;
    /** @type {?} */
    NgxTblPagination.prototype.total;
    /** @type {?} */
    NgxTblPagination.prototype.limit;
    /** @type {?} */
    NgxTblPagination.prototype.pageChanged;
    /** @type {?} */
    NgxTblPagination.prototype.reset;
    /** @type {?} */
    NgxTblPagination.prototype.pager;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRibC1wYWdpbmF0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRibC8iLCJzb3VyY2VzIjpbIm5neC10YmwtcGFnaW5hdGlvbi9uZ3gtdGJsLXBhZ2luYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDOztJQXFEMUI7MkJBWnFDLElBQUksWUFBWSxFQUFFO3FCQUM5QixJQUFJO3FCQUNoQixFQUFFO0tBV2Q7Ozs7O0lBVEQsa0NBQU87Ozs7SUFBUCxVQUFRLElBQVk7UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sQ0FBQztTQUNSO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDdEU7Ozs7SUFLRCxtQ0FBUTs7O0lBQVI7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO1lBQzdCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ25CLENBQUMsQ0FBQTtLQUNIOzs7OztJQUVELHNDQUFXOzs7O0lBQVgsVUFBWSxPQUFZO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxFQUFFLENBQUMsQ0FBQyxJ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dGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuZGVjbGFyZSB2YXIgcGFyc2VJbnQ6IGFueVxuZGVjbGFyZSB2YXIgTWF0aDogYW55XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdGJsLXBhZ2luYXRpb24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbYFxuICAgIC5wYWdpbmF0aW9uIHsgZmxvYXQ6IHJpZ2h0OyBtYXJnaW46MCAwIDdweCAwOyB9XG4gICAgLnBhZ2luYXRpb24gbGl7Y3Vyc29yOnBvaW50ZXI7fVxuICAgIC5wYWdpbmctaW5mbyB7Zm9udC1zdHlsZTogaXRhbGljO2NvbG9yOiAjODA4MDgwO2xpbmUtaGVpZ2h0OiAyO31cbiAgYF0sXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBjb2wteHMtMyBjb2wtbGctMyBjb2wtc20tMyBwYWdpbmctaW5mb1wiICpuZ0lmPVwidG90YWxcIj5cbiAgICA8c3Bhbj5zaG93aW5nIHt7dGhpcy5wYWdlci5zdGFydEluZGV4KzF9fSB0byB7e3RoaXMucGFnZXIuZW5kQ291bnR9fSBvZiB7e3RvdGFsfX08L3NwYW4+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiY29sLW1kLTkgY29sLXhzLTkgY29sLWxnLTkgY29sLXNtLTlcIj5cbiAgPHVsICpuZ0lmPVwicGFnZXIucGFnZXMgJiYgcGFnZXIucGFnZXMubGVuZ3RoXCIgY2xhc3M9XCJwYWdpbmF0aW9uXCI+XG4gICAgPGxpIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDpwYWdlci5jdXJyZW50UGFnZSA9PT0gMX1cIj5cbiAgICAgICAgPGEgKGNsaWNrKT1cInNldFBhZ2UoMSlcIj5GaXJzdDwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IDF9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKHBhZ2VyLmN1cnJlbnRQYWdlIC0gMSlcIj5QcmV2PC9hPlxuICAgIDwvbGk+XG4gICAgPGxpICpuZ0Zvcj1cImxldCBwYWdlIG9mIHBhZ2VyLnBhZ2VzXCIgW25nQ2xhc3NdPVwie2FjdGl2ZTpwYWdlci5jdXJyZW50UGFnZSA9PT0gcGFnZX1cIj5cbiAgICAgICAgPGEgKGNsaWNrKT1cInNldFBhZ2UocGFnZSlcIj57e3BhZ2V9fTwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IHBhZ2VyLnRvdGFsUGFnZXN9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKHBhZ2VyLmN1cnJlbnRQYWdlICsgMSlcIj5OZXh0PC9hPlxuICAgIDwvbGk+XG4gICAgPGxpIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDpwYWdlci5jdXJyZW50UGFnZSA9PT0gcGFnZXIudG90YWxQYWdlc31cIj5cbiAgICAgICAgPGEgKGNsaWNrKT1cInNldFBhZ2UocGFnZXIudG90YWxQYWdlcylcIj5MYXN0PC9hPlxuICAgIDwvbGk+XG4gIDwvdWw+XG4gIDwvZGl2PlxuICBgXG59KVxuXG5leHBvcnQgY2xhc3MgTmd4VGJsUGFnaW5hdGlvbiB7XG4gIEBJbnB1dCgncmVzZXQtcGFnaW5hdGlvbicpIHJlc2V0UGFnaW5hdGlvbjogYW55O1xuICBASW5wdXQoJ3RvdGFsJykgdG90YWw6IGFueTtcbiAgQElucHV0KCkgbGltaXQ6IGFueTtcbiAgQE91dHB1dCgncGFnZS1jaGFuZ2UnKSBwYWdlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHJpdmF0ZSByZXNldDogYm9vbGVhbiA9IHRydWU7XG4gIHBhZ2VyOiBhbnkgPSB7fTtcblxuICBzZXRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgIGlmIChwYWdlIDwgMSB8fCBwYWdlID4gdGhpcy5wYWdlci50b3RhbFBhZ2VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucGFnZUNoYW5nZWQuZW1pdChwYWdlKTtcbiAgICB0aGlzLnBhZ2VyID0gdGhpcy5nZXRQYWdlcih0aGlzLnRvdGFsLCBwYWdlLCBfLnRvTnVtYmVyKHRoaXMubGltaXQpKTtcbiAgfVxuICBcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJlc2V0UGFnaW5hdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5yZXNldCA9IHRydWU7XG4gICAgfSlcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIHRoaXMubGltaXQgPSBwYXJzZUludCh0aGlzLmxpbWl0KTtcbiAgICBpZiAodGhpcy50b3RhbCA+PSAwICYmIHRoaXMucmVzZXQpIHtcbiAgICAgIHRoaXMucmVzZXQgPSBmYWxzZTtcbiAgICAgIHRoaXMucGFnZXIgPSB0aGlzLmdldFBhZ2VyKHRoaXMudG90YWwsIDEsIF8udG9OdW1iZXIodGhpcy5saW1pdCkpO1xuICAgIH1cbiAgfVxuXG4gIGdldFBhZ2VyKHRvdGFsSXRlbXM6IG51bWJlciwgY3VycmVudFBhZ2U6IG51bWJlciA9IDEsIHBhZ2VTaXplOiBudW1iZXIgPSAxMCkge1xuICAgIGxldCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKHRvdGFsSXRlbXMgLyBwYWdlU2l6ZSk7XG4gICAgbGV0IHN0YXJ0UGFnZTogbnVtYmVyLCBlbmRQYWdlOiBudW1iZXI7XG4gICAgaWYgKHRvdGFsUGFnZXMgPD0gMTApIHtcbiAgICAgIHN0YXJ0UGFnZSA9IDE7XG4gICAgICBlbmRQYWdlID0gdG90YWxQYWdlcztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGN1cnJlbnRQYWdlIDw9IDYpIHtcbiAgICAgICAgc3RhcnRQYWdlID0gMTtcbiAgICAgICAgZW5kUGFnZSA9IDEwO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50UGFnZSArIDQgPj0gdG90YWxQYWdlcykge1xuICAgICAgICBzdGFydFBhZ2UgPSB0b3RhbFBhZ2VzIC0gOTtcbiAgICAgICAgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFydFBhZ2UgPSBjdXJyZW50UGFnZSAtIDU7XG4gICAgICAgIGVuZFBhZ2UgPSBjdXJyZW50UGFnZSArIDQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHN0YXJ0SW5kZXggPSAoY3VycmVudFBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xuICAgIGxldCBlbmRJbmRleCA9IE1hdGgubWluKHN0YXJ0SW5kZXggKyBwYWdlU2l6ZSAtIDEsIHRvdGFsSXRlbXMgLSAxKTtcblxuICAgIGxldCBwYWdlcyA9IF8ucmFuZ2Uoc3RhcnRQYWdlLCBlbmRQYWdlICsgMSk7XG5cbiAgICBsZXQgZW5kQ291bnQgPSBzdGFydEluZGV4ICsgdGhpcy5saW1pdDtcbiAgICBpZiAoZW5kQ291bnQgPiB0aGlzLnRvdGFsKSB7IGVuZENvdW50ID0gdGhpcy50b3RhbCB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvdGFsSXRlbXM6IHRvdGFsSXRlbXMsXG4gICAgICBjdXJyZW50UGFnZTogY3VycmVudFBhZ2UsXG4gICAgICBwYWdlU2l6ZTogcGFnZVNpemUsXG4gICAgICB0b3RhbFBhZ2VzOiB0b3RhbFBhZ2VzLFxuICAgICAgc3RhcnRQYWdlOiBzdGFydFBhZ2UsXG4gICAgICBlbmRQYWdlOiBlbmRQYWdlLFxuICAgICAgc3RhcnRJbmRleDogc3RhcnRJbmRleCxcbiAgICAgIGVuZEluZGV4OiBlbmRJbmRleCxcbiAgICAgIHBhZ2VzOiBwYWdlcyxcbiAgICAgIGVuZENvdW50OiBlbmRDb3VudFxuICAgIH07XG4gIH1cbn0iXX0=