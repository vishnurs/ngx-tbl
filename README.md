# ngx-tbl <a href="https://badge.fury.io/js/ngx-tbl"><img src="https://badge.fury.io/js/ngx-tbl.svg" alt="npm version" height="18"></a>

## Angular 5 table component

- Server Side Pagination, Search and Sorting

- Supports Create, Update and Delete out of the box

- Supports custom cell template

### Installation

`npm install ngx-tbl --save`

### Demo
https://vishnurs.github.io/ngx-tbl/

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

###### AppComponent.html
```
<ngx-tbl [items]="countries$ | async" (load)="loadCountries($event)" [config]="tableConfig">
  <ngx-tbl-column [name]="'ID'" [key]="'ID'" [sortable]="true"></ngx-tbl-column>
  <ngx-tbl-column [name]="'Name'" [key]="'name'" [sortable]="true"></ngx-tbl-column>
  <ngx-tbl-column [name]="'Capital'" [key]="'capital'" [sortable]="true"></ngx-tbl-column>
</ngx-tbl>
```

### Documentation

#### Inputs

items <Observable<[Items](https://github.com/vishnurs/ngx-tbl/blob/master/src/lib/interfaces/items.ts)>> - Table rows and total items. This total returned from server is used for pagination.

config<[Config](https://github.com/vishnurs/ngx-tbl/blob/master/src/lib/interfaces/config.ts)> - Configurable options for the table

#### Outputs
load   _<EventEmitter<any>>_ - Emitted on load, search and pagination
  
edit   _<EventEmitter<any>>_ - Emit this while editing a row
  
add    _<EventEmitter<any>>_ - Emit while adding a new row
  
delete _<EventEmitter<any>>_ - Emit while deleting a row
  
  
