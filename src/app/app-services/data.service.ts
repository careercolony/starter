import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Rx'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class DataService {

  constructor(private url: string, private httpClient:HttpClient) { }

  getIp(){
    return this.httpClient.get(this.url)
    .subscribe(data=>{
      
    },
    error=>{
        
    });
    
    //.map(response => response.json())
  }

  getAllIndustry(){
    return this.httpClient.get(this.url)
  
    //.map(response => response.json())
  }

  getData(){
    return this.httpClient.get(this.url)
  }

  create(resource){
   
    let headers = new Headers({ 'Content-Type': 'application/json'});
    //let options = new RequestOptions({ headers: headers });
    return  this.httpClient.post(this.url, JSON.stringify(resource) )
        .map(response => response)
  }

}
