import { Injectable } from '@angular/core';
import { DataService } from '../app-services/data.service';
//import { HttpClient } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GeolocationService extends DataService {

  constructor(http: HttpClient) { 
    super('http://ip-api.com/json', http)
  }

}
