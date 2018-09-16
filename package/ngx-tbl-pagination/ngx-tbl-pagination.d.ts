import { EventEmitter } from '@angular/core';
export declare class NgxTblPagination {
    resetPagination: any;
    total: any;
    limit: any;
    pageChanged: EventEmitter<{}>;
    private reset;
    pager: any;
    setPage(page: number): void;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    getPager(totalItems: number, currentPage?: number, pageSize?: number): {
        totalItems: number;
        currentPage: number;
        pageSize: number;
        totalPages: any;
        startPage: number;
        endPage: number;
        startIndex: number;
        endIndex: any;
        pages: any;
        endCount: any;
    };
}
