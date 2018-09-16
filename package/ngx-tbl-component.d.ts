import { EventEmitter, QueryList } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgxTblColumn } from './ngx-tbl-column.component';
export interface itm {
    rows?: any[];
    total: number;
}
export declare class NgxTblComponent {
    _items: any;
    limit: number;
    sort: any;
    searchParam: string;
    private subject;
    resetPagination: Observable<any>;
    private debouncer;
    private deleteRow;
    deleteConfirmModal: any;
    items: any[];
    config: any;
    update: EventEmitter<any>;
    load: EventEmitter<any>;
    edit: EventEmitter<any>;
    add: EventEmitter<any>;
    delete: EventEmitter<any>;
    columns: QueryList<NgxTblColumn>;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    search(): void;
    limitChange(): void;
    confirmDelete(item: any): void;
    deleteItem(): void;
    closeModal(): void;
    editRow(item: any, index: any): void;
    addNew(): void;
    getQueryParams(currentPage: any): {
        search: string;
        limit: number;
        skip: number;
        sort: any;
    };
    loadData(currentPage?: number): void;
    sortColumn(column: any): void;
}
