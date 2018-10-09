# ngx-tbl <a href="https://badge.fury.io/js/ngx-tbl"><img src="https://badge.fury.io/js/ngx-tbl.svg" alt="npm version" height="18"></a>

## Angular2+ table component with Server Side Pagination, Search and Sorting



### Installation

`npm install ngx-tbl --save`

### Quick Start

###### AppModule.ts

```
import { NgModule } from "@angular/core";
import { NgxTblModule } from '@ngx-tbl';
...

@NgModule({
    imports: [
        ...
        NgxTblModule
    ],
    ...
})
export class AppModule {

}
```
###### AppComponent.ts
```
export class AppComponent {
  title = 'app';
  tableConfig = {}
  countries$;
  constructor(private http: HttpClient) { }
  loadCountries(params) {
    let queryParams = {};
    queryParams = new HttpParams()
      .set('limit', params.limit)
      .set('search', params.search)
      .set('skip', params.skip)
      .set('sort', params.sort)

    this.countries$ = this.http.get('http://localhost:5000/getCountries', { params: queryParams })
  }

}
```

##### AppComponent.html
```
<ngx-tbl [items]="countries$ | async" (load)="loadCountries($event)" [config]="tableConfig">
  <ngx-tbl-column [name]="'ID'" [key]="'ID'" [sortable]="true"></ngx-tbl-column>
  <ngx-tbl-column [name]="'Name'" [key]="'name'" [sortable]="true"></ngx-tbl-column>
  <ngx-tbl-column [name]="'Capital'" [key]="'capital'" [sortable]="true"></ngx-tbl-column>
</ngx-tbl>
```

### Documentation

##### Inputs

items <Observable> - Table rows, should be an observable, which should emit an array
config - Configurable Options

#### Outputs
load   <EventEmitter<any>> - Emitted on load, search and while pagination
edit   <EventEmitter<any>> - 
add    <EventEmitter<any>>
delete <EventEmitter<any>>
