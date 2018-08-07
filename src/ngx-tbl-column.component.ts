import { Directive, Input, ContentChild } from '@angular/core';

@Directive({
  selector: 'ngx-tbl-column'
})

export class NgxTblColumn {
  @Input() name: string;
  @Input() key: string;
  @Input() sortable: string;
  @Input() narrow: boolean;

  @ContentChild('ngxTblCellTemplate') cellTemplate;
}