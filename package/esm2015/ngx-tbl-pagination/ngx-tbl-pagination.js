/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';
export class NgxTblPagination {
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
        this.pager = this.getPager(this.total, page, _.toNumber(this.limit));
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
            this.pager = this.getPager(this.total, 1, _.toNumber(this.limit));
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
        let /** @type {?} */ pages = _.range(startPage, endPage + 1);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRibC1wYWdpbmF0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRibC8iLCJzb3VyY2VzIjpbIm5neC10YmwtcGFnaW5hdGlvbi9uZ3gtdGJsLXBhZ2luYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBcUM1QixNQUFNO0lBZ0JKOzJCQVpxQyxJQUFJLFlBQVksRUFBRTtxQkFDOUIsSUFBSTtxQkFDaEIsRUFBRTtLQVdkOzs7OztJQVRELE9BQU8sQ0FBQyxJQUFZO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUM7U0FDUjtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ3RFOzs7O0lBS0QsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNuQixDQUFDLENBQUE7S0FDSDs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBWTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDbkU7S0FDRjs7Ozs7OztJQUVELFFBQVEsQ0FBQyxVQUFrQixFQUFFLGNBQXNCLENBQUMsRUFBRSxXQUFtQixFQUFFO1FBQ3pFLHFCQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUNsRCxxQkFBSSxTQUFpQixtQkFBRSxPQUFlLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckIsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNkLE9BQU8sR0FBRyxVQUFVLENBQUM7U0FDdEI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLE9BQU8sR0FBRyxFQUFFLENBQUM7YUFDZDtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLFNBQVMsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQixPQUFPLEdBQUcsVUFBVSxDQUFDO2FBQ3RCO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sU0FBUyxHQUFHLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLE9BQU8sR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO1NBQ0Y7UUFFRCxxQkFBSSxVQUFVLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQzlDLHFCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxRQUFRLEdBQUcsQ0FBQyxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVuRSxxQkFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTVDLHFCQUFJLFFBQVEsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN2QyxFQUFFLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtTQUFFO1FBQ3BELE1BQU0sQ0FBQztZQUNMLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLEtBQUssRUFBRSxLQUFLO1lBQ1osUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQztLQUNIOzs7WUF6R0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxNQUFNLEVBQUUsQ0FBQzs7OztHQUlSLENBQUM7Z0JBQ0YsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDthQUNGOzs7OztnQ0FHRSxLQUFLLFNBQUMsa0JBQWtCO3NCQUN4QixLQUFLLFNBQUMsT0FBTztzQkFDYixLQUFLOzRCQUNMLE1BQU0sU0FBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmRlY2xhcmUgdmFyIHBhcnNlSW50OiBhbnlcbmRlY2xhcmUgdmFyIE1hdGg6IGFueVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRibC1wYWdpbmF0aW9uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW2BcbiAgICAucGFnaW5hdGlvbiB7IGZsb2F0OiByaWdodDsgbWFyZ2luOjAgMCA3cHggMDsgfVxuICAgIC5wYWdpbmF0aW9uIGxpe2N1cnNvcjpwb2ludGVyO31cbiAgICAucGFnaW5nLWluZm8ge2ZvbnQtc3R5bGU6IGl0YWxpYztjb2xvcjogIzgwODA4MDtsaW5lLWhlaWdodDogMjt9XG4gIGBdLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgY29sLXhzLTMgY29sLWxnLTMgY29sLXNtLTMgcGFnaW5nLWluZm9cIiAqbmdJZj1cInRvdGFsXCI+XG4gICAgPHNwYW4+c2hvd2luZyB7e3RoaXMucGFnZXIuc3RhcnRJbmRleCsxfX0gdG8ge3t0aGlzLnBhZ2VyLmVuZENvdW50fX0gb2Yge3t0b3RhbH19PC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbC1tZC05IGNvbC14cy05IGNvbC1sZy05IGNvbC1zbS05XCI+XG4gIDx1bCAqbmdJZj1cInBhZ2VyLnBhZ2VzICYmIHBhZ2VyLnBhZ2VzLmxlbmd0aFwiIGNsYXNzPVwicGFnaW5hdGlvblwiPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IDF9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKDEpXCI+Rmlyc3Q8L2E+XG4gICAgPC9saT5cbiAgICA8bGkgW25nQ2xhc3NdPVwie2Rpc2FibGVkOnBhZ2VyLmN1cnJlbnRQYWdlID09PSAxfVwiPlxuICAgICAgICA8YSAoY2xpY2spPVwic2V0UGFnZShwYWdlci5jdXJyZW50UGFnZSAtIDEpXCI+UHJldjwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSAqbmdGb3I9XCJsZXQgcGFnZSBvZiBwYWdlci5wYWdlc1wiIFtuZ0NsYXNzXT1cInthY3RpdmU6cGFnZXIuY3VycmVudFBhZ2UgPT09IHBhZ2V9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKHBhZ2UpXCI+e3twYWdlfX08L2E+XG4gICAgPC9saT5cbiAgICA8bGkgW25nQ2xhc3NdPVwie2Rpc2FibGVkOnBhZ2VyLmN1cnJlbnRQYWdlID09PSBwYWdlci50b3RhbFBhZ2VzfVwiPlxuICAgICAgICA8YSAoY2xpY2spPVwic2V0UGFnZShwYWdlci5jdXJyZW50UGFnZSArIDEpXCI+TmV4dDwvYT5cbiAgICA8L2xpPlxuICAgIDxsaSBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6cGFnZXIuY3VycmVudFBhZ2UgPT09IHBhZ2VyLnRvdGFsUGFnZXN9XCI+XG4gICAgICAgIDxhIChjbGljayk9XCJzZXRQYWdlKHBhZ2VyLnRvdGFsUGFnZXMpXCI+TGFzdDwvYT5cbiAgICA8L2xpPlxuICA8L3VsPlxuICA8L2Rpdj5cbiAgYFxufSlcblxuZXhwb3J0IGNsYXNzIE5neFRibFBhZ2luYXRpb24ge1xuICBASW5wdXQoJ3Jlc2V0LXBhZ2luYXRpb24nKSByZXNldFBhZ2luYXRpb246IGFueTtcbiAgQElucHV0KCd0b3RhbCcpIHRvdGFsOiBhbnk7XG4gIEBJbnB1dCgpIGxpbWl0OiBhbnk7XG4gIEBPdXRwdXQoJ3BhZ2UtY2hhbmdlJykgcGFnZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHByaXZhdGUgcmVzZXQ6IGJvb2xlYW4gPSB0cnVlO1xuICBwYWdlcjogYW55ID0ge307XG5cbiAgc2V0UGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICBpZiAocGFnZSA8IDEgfHwgcGFnZSA+IHRoaXMucGFnZXIudG90YWxQYWdlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBhZ2VDaGFuZ2VkLmVtaXQocGFnZSk7XG4gICAgdGhpcy5wYWdlciA9IHRoaXMuZ2V0UGFnZXIodGhpcy50b3RhbCwgcGFnZSwgXy50b051bWJlcih0aGlzLmxpbWl0KSk7XG4gIH1cbiAgXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yZXNldFBhZ2luYXRpb24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVzZXQgPSB0cnVlO1xuICAgIH0pXG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICB0aGlzLmxpbWl0ID0gcGFyc2VJbnQodGhpcy5saW1pdCk7XG4gICAgaWYgKHRoaXMudG90YWwgPj0gMCAmJiB0aGlzLnJlc2V0KSB7XG4gICAgICB0aGlzLnJlc2V0ID0gZmFsc2U7XG4gICAgICB0aGlzLnBhZ2VyID0gdGhpcy5nZXRQYWdlcih0aGlzLnRvdGFsLCAxLCBfLnRvTnVtYmVyKHRoaXMubGltaXQpKTtcbiAgICB9XG4gIH1cblxuICBnZXRQYWdlcih0b3RhbEl0ZW1zOiBudW1iZXIsIGN1cnJlbnRQYWdlOiBudW1iZXIgPSAxLCBwYWdlU2l6ZTogbnVtYmVyID0gMTApIHtcbiAgICBsZXQgdG90YWxQYWdlcyA9IE1hdGguY2VpbCh0b3RhbEl0ZW1zIC8gcGFnZVNpemUpO1xuICAgIGxldCBzdGFydFBhZ2U6IG51bWJlciwgZW5kUGFnZTogbnVtYmVyO1xuICAgIGlmICh0b3RhbFBhZ2VzIDw9IDEwKSB7XG4gICAgICBzdGFydFBhZ2UgPSAxO1xuICAgICAgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjdXJyZW50UGFnZSA8PSA2KSB7XG4gICAgICAgIHN0YXJ0UGFnZSA9IDE7XG4gICAgICAgIGVuZFBhZ2UgPSAxMDtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBhZ2UgKyA0ID49IHRvdGFsUGFnZXMpIHtcbiAgICAgICAgc3RhcnRQYWdlID0gdG90YWxQYWdlcyAtIDk7XG4gICAgICAgIGVuZFBhZ2UgPSB0b3RhbFBhZ2VzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnRQYWdlID0gY3VycmVudFBhZ2UgLSA1O1xuICAgICAgICBlbmRQYWdlID0gY3VycmVudFBhZ2UgKyA0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBzdGFydEluZGV4ID0gKGN1cnJlbnRQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcbiAgICBsZXQgZW5kSW5kZXggPSBNYXRoLm1pbihzdGFydEluZGV4ICsgcGFnZVNpemUgLSAxLCB0b3RhbEl0ZW1zIC0gMSk7XG5cbiAgICBsZXQgcGFnZXMgPSBfLnJhbmdlKHN0YXJ0UGFnZSwgZW5kUGFnZSArIDEpO1xuXG4gICAgbGV0IGVuZENvdW50ID0gc3RhcnRJbmRleCArIHRoaXMubGltaXQ7XG4gICAgaWYgKGVuZENvdW50ID4gdGhpcy50b3RhbCkgeyBlbmRDb3VudCA9IHRoaXMudG90YWwgfVxuICAgIHJldHVybiB7XG4gICAgICB0b3RhbEl0ZW1zOiB0b3RhbEl0ZW1zLFxuICAgICAgY3VycmVudFBhZ2U6IGN1cnJlbnRQYWdlLFxuICAgICAgcGFnZVNpemU6IHBhZ2VTaXplLFxuICAgICAgdG90YWxQYWdlczogdG90YWxQYWdlcyxcbiAgICAgIHN0YXJ0UGFnZTogc3RhcnRQYWdlLFxuICAgICAgZW5kUGFnZTogZW5kUGFnZSxcbiAgICAgIHN0YXJ0SW5kZXg6IHN0YXJ0SW5kZXgsXG4gICAgICBlbmRJbmRleDogZW5kSW5kZXgsXG4gICAgICBwYWdlczogcGFnZXMsXG4gICAgICBlbmRDb3VudDogZW5kQ291bnRcbiAgICB9O1xuICB9XG59Il19