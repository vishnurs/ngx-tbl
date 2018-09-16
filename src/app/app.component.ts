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
  constructor(private http: HttpClient){
    
  }

  ngOnInit() {
    
  }
  loadCountries() {
    this.countries$ = this.http.get('http://localhost:5000/getCountries')
  }
  
}
