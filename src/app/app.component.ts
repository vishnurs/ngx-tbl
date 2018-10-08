import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as _ from 'lodash';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  tableConfig = {}
  countries$;
  constructor(private http: HttpClient) {

  }

  ngOnInit() {

  }
  loadCountries(params) {
    let queryParams = {};
    queryParams = new HttpParams()
      .set('limit', params.limit)
      .set('search', params.search)
      .set('skip', params.skip)
      .set('sort', !_.isEmpty(params.sort) ? (_.keys(params.sort)[0] + ':' + _.values(params.sort)[0]) : '')

    this.countries$ = this.http.get('http://localhost:5000/getCountries', { params: queryParams })
  }

}
