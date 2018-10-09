import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxTblComponent } from './ngx-tbl-component';
import { NgxTblColumn } from './ngx-tbl-column.component';
import { NgxTblControl } from './ngx-tbl-control';
import { NgxTblPagination } from './ngx-tbl-pagination/ngx-tbl-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
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
})

export class NgxTblModule {
  
}