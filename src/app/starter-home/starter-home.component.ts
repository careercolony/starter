import { AuthService } from './../app-services/auth.service';
import { StorageService } from './../app-services/storage.service';
import { Router } from '@angular/router';
import { ApiService } from './../app-services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Ng2DeviceService } from 'ng2-device-detector';
import { trigger, state, animate, transition, style, keyframes, query, stagger } from '@angular/animations';
import { GeolocationService } from '../thirdparty-services/geolocation.service';
import { ElasticsearchService } from '../elasticsearch.service';


@Component({
  selector: 'app-starter-home',
  templateUrl: './starter-home.component.html',
  styleUrls: ['./starter-home.component.css'],
  animations: [
    trigger('imganimate', [
      transition('* => *', [
        query('img', style({ opacity: 0})),

        query('img', stagger('60ms', [
          animate('600ms 1.3s ease-out', style({ opacity: 1}))
        ]))
      ])
    ]),

    trigger('page', [
      transition('* => *', [
        query('.page-content', style({ opacity: 0})),

        query('.page-content', stagger('30ms', [
          animate('600ms 1.2s ease-out', style({ opacity: 1}))
        ]))
      ])
    ]),


  ]
})
export class StarterHomeComponent implements OnInit {

  private geolocation: any = {};
  private signupForm: FormGroup;
  private loginForm: FormGroup;

  private isSignupFormSubmitted: Boolean = false;
  private isLoginFormSubmitted: Boolean = false;
  private loginErrors;
  private signupErrors;

  private deviceInfo;

  

  constructor(
    private geoService: GeolocationService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService,
    private deviceService: Ng2DeviceService
  ) {
    this.signupForm = formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      location: formBuilder.group({
        city: [null, Validators.required],
        state: [null, Validators.required],
        country: [null, Validators.required],
        countryCode: [null, Validators.required],
        lat: [null, Validators.required],
        lon: [null, Validators.required],
        ip: [null, Validators.required],
        timezone: [null, Validators.required],
        zip: [null, Validators.required]
      })
    });
  
    this.loginForm = formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      rememberme: [null]
    });

    this.geoService.getData().subscribe((res => {

      this.signupForm.patchValue({   
        location: {
              city: res['city'],
              state: res['regionName'],
              country: res['country'],
              countryCode: res['countryCode'],
              lat: res['lat'],
              lon: res['lon'],
              ip: res['query'],
              timezone: res['timezone'],
              zip: res['zip']
            }
        });
    }));
  }
  

  private login(data) {

    this.isLoginFormSubmitted = true;
    this.storageService.store('password', data.password);
    data['user_agent'] = this.deviceInfo['userAgent'];
    data['login_time'] = new Date().toUTCString();
    this.apiService.login(data).subscribe(
      (response) => {
        this.loginErrors = '';
        if (response.value.length === 1) {
          response = response.value[0];
          this.storageService.store('firstname', response.firstname);
          this.storageService.store('lastname', response.lastname);
          this.storageService.store('email', response.email);
          this.storageService.store('memberID', response.memberID);
          this.authService.login();
          this.router.navigateByUrl('buzz');
        } else {
          this.loginErrors = 'Email or password is invalid';
          this.isLoginFormSubmitted = false;
        }
      },
      (error) => {
        if (error.status === 200) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error, showing message as email already exist
          // console.log('Email already exist');
          this.loginErrors = 'Error occured during login';
          this.isLoginFormSubmitted = false;
        } else {
          console.log(error);
          this.loginErrors = 'Error occurred while login';
          this.isLoginFormSubmitted = false;
        }
      }
    );

  }

  private signup(data) {
    this.isSignupFormSubmitted = true;
    this.storageService.store('password', data.password);
    this.apiService.signup(data).subscribe(
      (response) => {
        this.signupErrors = '';
        response = response.value[0];
        this.storageService.store('firstname', response.firstname);
        this.storageService.store('lastname', response.lastname);
        this.storageService.store('email', response.email);
        this.storageService.store('memberID', response.memberID);
        this.router.navigateByUrl('signup-steps');
      },
      (error) => {
        if (error.status === 200) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error, showing message as email already exist
          console.log('Email already exist');
          this.signupErrors = 'Email already exist';
          this.isSignupFormSubmitted = false;
        } else {
          console.log(error);
          this.signupErrors = 'Error occurred while signing up';
          this.isSignupFormSubmitted = false;
        }
      }
    );
  }

  ngOnInit() {
    this.storageService.clear();
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  


}
