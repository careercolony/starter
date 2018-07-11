import { StorageService } from './../app-services/storage.service';
import { ApiService } from './../app-services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndustryService } from '../thirdparty-services/industry.service';
import { CountryService } from '../thirdparty-services/country.service';
import { GeolocationService } from '../thirdparty-services/geolocation.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ElasticsearchService } from '../elasticsearch.service';
import { DetailSource } from '../details';


@Component({
  selector: 'app-starter-signup-steps',
  templateUrl: './starter-signup-steps.component.html',
  styleUrls: ['./starter-signup-steps.component.css']
})
export class StarterSignupStepsComponent implements OnInit {

  private geolocation: any = {};
  private userCountry;

  private errors;
  private isSignupStepsFormSubmitted = false;

  private signupStepsForm: FormGroup;

  private industrylist: any = [];
  private countrylist: any = [];

  private firstname;
  private isEmployee = false;
  private isEnterpreneur = false;
  private isExecutive = false;
  private isFreelancer = false;
  private isUnemployed = false;
  private isStudent = false;

  private static readonly INDEX = 'company';
  private static readonly TYPE = 'company';
 
  detailsSources: DetailSource[];

  private queryText = '';
 
  private lastKeypress = 0;

  constructor(
    private geoService: GeolocationService,
    private industryService: IndustryService,
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private storageService: StorageService,
    private es: ElasticsearchService,
    private router: Router
  ) {

    this.signupStepsForm = formBuilder.group({
      step1: formBuilder.group({
        address: formBuilder.group({
          city: [null, Validators.required],
          state: [null, Validators.required],
        }),
        
        country: [null, Validators.required],
        postCode: [null, Validators.required]
      }),
      step2: formBuilder.group({
        employmentstatus: [null, Validators.required],
        employer_name: [null, Validators.required],
        position: [null, Validators.required],
        industry: [null, Validators.required],
        school_name: [null, Validators.required],
        degree: [null, Validators.required]
      }),
      step3: formBuilder.group({
        my_interest_on_colony: [null, Validators.required]
      })
    });

    this.geoService.getData().subscribe((res => {

      this.userCountry = res['country'];

      this.signupStepsForm.patchValue({
          step1: {
            userIP: res['query'],
            address: {
              city: res['city'],
              state: res['regionName']
            },
            country: res['country'],
            postCode: res['zip']
          }
        });
    }));
   }

  ngOnInit() {

    const industries$ = this.industryService.getData();
    industries$.subscribe(industry => {this.industrylist = industry; });

    this.firstname = this.storageService.get('firstname');

    const countries$ = this.countryService.getData();
    countries$.subscribe(country => {this.countrylist = country; });
  }

  private signupSteps(data) {

    this.isSignupStepsFormSubmitted = true;

    const body = {
      memberID: this.storageService.get('memberID'),
      firstname: this.storageService.get('firstname'),
      lastname: this.storageService.get('lastname'),
      email: this.storageService.get('email'),
      password: this.storageService.get('password'),
      country: data.step1.country,
      address: data.step1.address,
      interest: [],
      email_verification_flag: 0,
      interest_flag: 0,
      updated_date: new Date().toUTCString()
    };
    const employmentstatus = data.step2.employmentstatus;
    body['employmentstatus'] = employmentstatus;
    if (employmentstatus === '1') {
      body['employer'] = data.step2.employer_name;
      body['position'] = data.step2.position;
    } else if (employmentstatus === '2') {
      body['employer'] = data.step2.employer_name;
      body['position'] = data.step2.position;
    } else if (employmentstatus === '3') {
      body['employer'] = data.step2.employer_name;
      body['position'] = data.step2.position;
    } else if (employmentstatus === '4') {
      body['industry'] = data.step2.industry;
      body['position'] = data.step2.position;
    } else if (employmentstatus === '5') {
      body['employer'] = data.step2.employer_name;
      body['position'] = data.step2.position;
    } else if (employmentstatus === '6') {
      body['school_name'] = data.step2.school_name;
      body['degree'] = data.step2.degree;
    }

    body['interest_on_colony'] = data.step3.interest_on_colony;
    this.apiService.signupSteps(body).subscribe(
      (response) => {
        this.errors = '';
        this.router.navigateByUrl('email-verification/notify');
      },
      (error) => {
        console.log(error);
        if (error.status === 201) {
          // This is ignorable error
          this.errors = '';
          this.router.navigateByUrl('email-verification/notify');
        }
        this.errors = 'Error occurred while updating signup steps';
        this.isSignupStepsFormSubmitted = false;
      }
    );
  }

  private getFields(employmentstatus) {

    this.isEmployee = false;
    this.isEnterpreneur = false;
    this.isExecutive = false;
    this.isFreelancer = false;
    this.isUnemployed = false;
    this.isStudent = false;

    if (employmentstatus === '1') {
      this.isEmployee = true;
    } else if (employmentstatus === '2') {
      this.isEnterpreneur = true;
    } else if (employmentstatus === '3') {
      this.isExecutive = true;
    } else if (employmentstatus === '4') {
      this.isFreelancer = true;
    } else if (employmentstatus === '5') {
      this.isUnemployed = true;
    } else if (employmentstatus === '6') {
      this.isStudent = true;
    }
  }

  public checkValidity(step: string, form: FormGroup): Boolean {

    if (step === 'step1') {
      return form.valid;
    } else if (step === 'step2') {
      if (['1', '2', '3'].indexOf(form.value.employmentstatus) > -1) {
        return form.controls.employer_name.valid && form.controls.position.valid;
      } else if (form.value.employmentstatus === '4') {
        return form.controls.industry.valid && form.controls.position.valid;
      } else if (form.value.employmentstatus === '5') {
        return true;
      } else if (form.value.employmentstatus === '6') {
        return form.controls.school_name.valid && form.controls.degree.valid;
      } else {
        return false;
      }
    } else if (step === 'step3') {
      return form.valid;
    } else {
      return false;
    }
  }

  search($event) {
    if ($event.timeStamp - this.lastKeypress > 100) {
      this.queryText = $event.target.value;
 
      this.es.fullTextSearch(
        StarterSignupStepsComponent.INDEX,
        StarterSignupStepsComponent.TYPE,
        'company_name', this.queryText).then(
        response => {
          this.detailsSources = response.hits.hits;
          console.log(response);
        }, error => {
          console.error(error);
        }).then(() => {
          console.log('Search Completed!');
        });
    }
 
    this.lastKeypress = $event.timeStamp;
  }

  
}
