import { Injectable } from '@angular/core';
import { DataService } from '../app-services/data.service';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class IndustryService extends DataService {

  constructor(http:HttpClient) { 
    super('assets/json-data/industries.json', http)
  }

}
