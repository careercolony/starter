import { DataService } from '../app-services/data.service';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CountryService extends DataService {
  
   constructor(http:HttpClient) { 
    //super('https://jsonplaceholder.typicode.com/posts', http)
   super('assets/json-data/countries/countries.json', http)
  }

}
