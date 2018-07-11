import { ProfileService } from './../app-services/profile.service';
import { IndustryService } from './../thirdparty-services/industry.service';
import { StorageService } from './../app-services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../app-services/api.service';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.css']
})
export class ProfileExperienceComponent implements OnInit {

  private monthList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  private addExperienceForm: FormGroup;
  private updateExperienceForm: FormGroup;
  private deleteExperienceForm: FormGroup;

  private isAddExperienceFormSubmitted = false;
  private isUpdateExperienceFormSubmitted = false;
  private isDeleteExperienceFormSubmitted = false;

  private isPresent = false;
  private makeHeadline = false;
  private selectedIndustry;

  private experienceList;
  private industryList;

  private startMonth;
  private endMonth;

  private error;
  private message;

  public imageUrl = "assets/images/avatar-collection/company-avatar.png";
  private defaultAvatar = "assets/images/avatar-collection/009-user-1.png";


  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private apiService: ApiService,
    private industryService: IndustryService,
    private profileService: ProfileService
  ) {

    this.addExperienceForm = formBuilder.group({
      position: [null, Validators.required],
      career_level: [null, Validators.required],
      industry: [null, Validators.required],
      employer: [null, Validators.required],
      start_month: [null, Validators.required],
      start_year: [null, Validators.required],
      end_month: [null, Validators.required],
      end_year: [null, Validators.required],
      current: [null],
      description: [null, Validators.required]
    });

    this.updateExperienceForm = formBuilder.group({
      expID: [null, Validators.required],
      created_date: [null, Validators.required],
      position: [null, Validators.required],
      career_level: [null, Validators.required],
      industry: [null, Validators.required],
      employer: [null, Validators.required],
      start_month: [null, Validators.required],
      start_year: [null, Validators.required],
      end_month: [null, Validators.required],
      end_year: [null, Validators.required],
      current: [null],
      description: [null, Validators.required]
    });

    this.deleteExperienceForm = formBuilder.group({
      expID: [null, Validators.required]
    });
  }

  public onError(): void {
    this.imageUrl = this.defaultAvatar;
  } 

  ngOnInit() {

    this.getExperienceList();

    const industries$ = this.industryService.getData();
    industries$.subscribe(industry => {this.industryList = industry; });
  }

  public getExperienceList() {
    this.apiService.getExperience(this.storageService.get('memberID')).subscribe(
      (response) => {
        this.experienceList = response;
        this.updateExperienceCount();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public toggleAddIsPresent() {
    this.isPresent = !this.isPresent;
    const date = new Date();
    this.addExperienceForm.patchValue(
      {
        end_year: date.getFullYear(),
        end_month: this.monthList[date.getMonth()]
      });
  }

  public toggleUpdateIsPresent() {
    this.isPresent = !this.isPresent;
    const date = new Date();
    this.updateExperienceForm.patchValue(
      {
        end_year: date.getFullYear(),
        end_month: this.monthList[date.getMonth()]
      });
  }

  public toggleAddMakeHeadline() {
    this.makeHeadline = !this.makeHeadline;
    const headline = this.addExperienceForm.value['position'] + ' at '
      + this.addExperienceForm.value['employer']
      + ' from '
      + this.addExperienceForm.value['start_month']
      + ' '
      + this.addExperienceForm.value['start_year']
      + ' to '
      + this.addExperienceForm.value['end_month']
      + ' '
      + this.addExperienceForm.value['end_year'];
    this.addExperienceForm.patchValue({description: headline});
  }

  public toggleUpdateMakeHeadline() {
    this.makeHeadline = !this.makeHeadline;
    const headline = this.updateExperienceForm.value['position'] + ' at '
      + this.updateExperienceForm.value['employer']
      + ' from '
      + this.addExperienceForm.value['start_month']
      + ' '
      + this.addExperienceForm.value['start_year']
      + ' to '
      + this.addExperienceForm.value['end_month']
      + ' '
      + this.addExperienceForm.value['end_year'];
    this.updateExperienceForm.patchValue({description: headline});
  }

  public addExperience(data) {
    this.initAddExperienceModal();
    this.isAddExperienceFormSubmitted = true;
    data['current'] = data['current'] ? 'yes' : 'no';
    data['memberID'] = this.storageService.get('memberID');
    data['period'] = (this.monthList.indexOf(data['end_month']) - this.monthList.indexOf(data['start_month'])
      + ((parseInt(data['end_year'], 10) - parseInt(data['start_year'], 10)) * 12));
    if (data['period'] < 0) {
      this.error = 'To date must be greater than From date';
      this.isAddExperienceFormSubmitted = false;
      return;
    } else {
      data['period'] = Math.floor(data['period'] / 12).toString() + ' Years ' + (data['period'] % 12).toString() + ' Months';
    }
    data['start_year'] = data['start_year'].toString();
    data['end_year'] = data['end_year'].toString();
    data['created_date'] = new Date().toUTCString();
    data['updated_date'] = new Date().toUTCString();
    this.apiService.addExperience(data).subscribe(
      (response) => {
        this.error = '';
        // this.message = 'Experience successfully added';
        this.isAddExperienceFormSubmitted = false;
        this.dismissAddExperienceModal();
        this.getExperienceList();
      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error, showing message as email already exist
          // console.log('Email already exist');
          this.error = '';
          // this.message = 'Experience successfully added';
          this.isAddExperienceFormSubmitted = false;
          this.dismissAddExperienceModal();
          this.getExperienceList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving experience';
          this.isAddExperienceFormSubmitted = false;
        }
      }
    );
  }

  public updateExperience(data) {
    this.initUpdateExperienceModal();
    this.isUpdateExperienceFormSubmitted = true;
    data['current'] = data['current'] ? 'yes' : 'no';
    data['memberID'] = this.storageService.get('memberID');
    data['period'] = (this.monthList.indexOf(data['end_month']) - this.monthList.indexOf(data['start_month'])
      + ((parseInt(data['end_year'], 10) - parseInt(data['start_year'], 10)) * 12));
    if (data['period'] < 0) {
      this.error = 'To date must be greater than From date';
      this.isUpdateExperienceFormSubmitted = false;
      return;
    } else {
      data['period'] = Math.floor(data['period'] / 12).toString() + ' Years ' + (data['period'] % 12).toString() + ' Months';
    }
    // data['created_date'] = new Date().toUTCString();
    data['start_year'] = data['start_year'].toString();
    data['end_year'] = data['end_year'].toString();
    data['updated_date'] = new Date().toUTCString();
    this.apiService.updateExperience(data).subscribe(
      (response) => {
        this.error = '';
        // this.message = 'Experience successfully updated';
        this.isUpdateExperienceFormSubmitted = false;
        this.dismissUpdateExperienceModal();
        this.getExperienceList();
      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error, showing message as email already exist
          // console.log('Email already exist');
          this.error = '';
          // this.message = 'Experience successfully updated';
          this.isUpdateExperienceFormSubmitted = false;
          this.dismissUpdateExperienceModal();
          this.getExperienceList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving experience';
          this.isUpdateExperienceFormSubmitted = false;
        }
      }
    );
  }

  public deleteExperience(data) {
    this.initDeleteExperienceModal();
    this.isDeleteExperienceFormSubmitted = true;
    this.apiService.deleteExperience(data.expID).subscribe(
      (response) => {
        this.error = '';
        // this.message = 'Experience deleted successfully';
        this.isDeleteExperienceFormSubmitted = false;
        this.dismissDeleteExperienceModal();
        this.deleteExperienceFromList(data.expID);
        this.getExperienceList();
      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          this.error = '';
          // this.message = 'Experience deleted successfully';
          this.isDeleteExperienceFormSubmitted = false;
          this.dismissDeleteExperienceModal();
          this.deleteExperienceFromList(data.expID);
          this.getExperienceList();
        } else {
          this.error = 'Error occurred while deleting experience';
          this.isDeleteExperienceFormSubmitted = false;
        }
      }
    );
  }

  public initAddExperienceModal() {
    this.error = '';
    this.message = '';
    this.isAddExperienceFormSubmitted = false;
    this.addExperienceForm.patchValue(
      {
        start_month: this.monthList[new Date().getMonth()],
        start_year: new Date().getFullYear(),
        end_month: this.monthList[new Date().getMonth()],
        end_year: new Date().getFullYear(),
      }
    );
  }

  public initUpdateExperienceModal() {
    this.error = '';
    this.message = '';
    this.isUpdateExperienceFormSubmitted = false;
  }

  public initDeleteExperienceModal() {
    this.error = '';
    this.message = '';
    this.isDeleteExperienceFormSubmitted = false;
  }

  public dismissAddExperienceModal() {
    this.initAddExperienceModal();
    const button = <HTMLButtonElement> document.getElementById('addExperienceModalDismissButton');
    this.dismissModal(button);
  }

  public dismissUpdateExperienceModal() {
    this.initUpdateExperienceModal();
    const button = <HTMLButtonElement> document.getElementById('updateExperienceModalDismissButton');
    this.dismissModal(button);
  }

  public dismissDeleteExperienceModal() {
    this.initDeleteExperienceModal();
    const button = <HTMLButtonElement> document.getElementById('deleteExperienceModalDismissButton');
    this.dismissModal(button);
  }

  public dismissModal(button: HTMLButtonElement) {
    button.click();
  }

  public prepareUpdateModal(experience) {
    this.initUpdateExperienceModal();
    this.selectedIndustry = experience.industry;
    this.updateExperienceForm.patchValue(
      {
        expID: experience.expID,
        position: experience.position,
        career_level: experience.career_level,
        industry: experience.industry,
        employer: experience.employer,
        start_month: experience.start_month,
        start_year: parseInt(experience.start_year, 10),
        end_month: experience.end_month,
        end_year: parseInt(experience.end_year, 10),
        current: (experience.current === 'yes') ? true : false,
        description: experience.description,
        created_date: experience.created_date
      }
    );
    this.isPresent = (experience.current === 'yes') ? true : false;
    this.startMonth = experience.start_month;
    this.endMonth = experience.end_month;
  }

  public prepareDeleteModal(experience) {
    this.initDeleteExperienceModal();
    this.deleteExperienceForm.patchValue(
      {
        expID: experience.expID
      }
    );
  }

  public deleteExperienceFromList(expID) {
    for (let i = 0; i < this.experienceList.length; i++) {
      if (this.experienceList[i].expID === expID) {
        this.experienceList.splice(i, 1);
        break;
      }
    }
  }

  public updateExperienceCount() {
    this.profileService.setExperienceCount(this.experienceList.length);
  }

}
