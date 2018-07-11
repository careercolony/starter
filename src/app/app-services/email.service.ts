import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpResponse } from '@angular/common/http/src/response';

const AUTHORIZATION = environment.email.authorization;
const URL = environment.email.url;
const FROM = environment.email.from;

@Injectable()
export class EmailService {

  constructor(private http: HttpClient) { }

  public sendEmail(to, subject, body) {

    const formdata = {
      from: FROM,
      to: to,
      subject: subject,
      html: body
    };

    this.http.post(URL, {}, {headers: {Authorization: AUTHORIZATION}, params: formdata}).subscribe(
      (response) => { },
      (error) => { console.log(error); }
    );
  }
}
