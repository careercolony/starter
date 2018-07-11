import { ProfileService } from './../app-services/profile.service';
import { ApiService } from './../app-services/api.service';
import { StorageService } from './../app-services/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-education',
  templateUrl: './profile-education.component.html',
  styleUrls: ['./profile-education.component.css']
})
export class ProfileEducationComponent implements OnInit {

  private addEducationForm: FormGroup;
  private updateEducationForm: FormGroup;
  private deleteEducationForm: FormGroup;

  private isAddEducationFormSubmitted = false;
  private isUpdateEducationFormSubmitted = false;
  private isDeleteEducationFormSubmitted = false;

  private educationList;
  private error;
  private message;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private apiService: ApiService,
    private profileService: ProfileService
  ) {
    this.addEducationForm = formBuilder.group({
      school_name: [null, Validators.required],
      degree: [null, Validators.required],
      field_of_study: [null, Validators.required],
      start_year: [null, Validators.required],
      end_year: [null, Validators.required],
      activities: [null, Validators.required]
    });

    this.updateEducationForm = formBuilder.group({
      eduID: [null, Validators.required],
      created_date: [null, Validators.required],
      school_name: [null, Validators.required],
      degree: [null, Validators.required],
      field_of_study: [null, Validators.required],
      start_year: [null, Validators.required],
      end_year: [null, Validators.required],
      activities: [null, Validators.required]
    });

    this.deleteEducationForm = formBuilder.group({
      eduID: [null, Validators.required]
    });
  }

  ngOnInit() {

    this.getEducationList();
  }

  public getEducationList() {
    this.apiService.getEducation(this.storageService.get('memberID')).subscribe(
      (response) => {
        this.educationList = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public addEducation(data) {
    this.initAddEducationModal();
    this.isAddEducationFormSubmitted = true;
    if (parseInt(data['start_year'], 10) > parseInt(data['end_year'], 10)) {
      this.error = 'To year must be greater than From year';
      this.isAddEducationFormSubmitted = false;
      return;
    }
    data['start_year'] = data['start_year'].toString();
    data['end_year'] = data['end_year'].toString();
    data['created_date'] = new Date().toUTCString();
    data['updated_date'] = new Date().toUTCString();
    data['memberID'] = this.storageService.get('memberID');
    this.apiService.addEducation(data).subscribe(
      (response) => {
        this.error = '';
        // this.message = 'Experience successfully added';
        this.isAddEducationFormSubmitted = false;
        this.dismissAddEducationModal();
        this.getEducationList();
      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error, showing message as email already exist
          // console.log('Email already exist');
          this.error = '';
          // this.message = 'Experience successfully added';
          this.isAddEducationFormSubmitted = false;
          this.dismissAddEducationModal();
          this.getEducationList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving education';
          this.isAddEducationFormSubmitted = false;
        }
      }
    );
  }

  public updateEducation(data) {
    this.initUpdateEducationModal();
    this.isUpdateEducationFormSubmitted = true;
    if (parseInt(data['start_year'], 10) > parseInt(data['end_year'], 10)) {
      this.error = 'To year must be greater than From year';
      this.isUpdateEducationFormSubmitted = false;
      return;
    }
    // data['created_date'] = new Date().toUTCString();
    data['start_year'] = data['start_year'].toString();
    data['end_year'] = data['end_year'].toString();
    data['updated_date'] = new Date().toUTCString();
    data['memberID'] = this.storageService.get('memberID');
    this.apiService.updateEducation(data).subscribe(
      (response) => {
        this.error = '';
        // this.message = 'Experience successfully added';
        this.isUpdateEducationFormSubmitted = false;
        this.dismissUpdateEducationModal();
        this.getEducationList();
      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error, showing message as email already exist
          // console.log('Email already exist');
          this.error = '';
          // this.message = 'Experience successfully added';
          this.isUpdateEducationFormSubmitted = false;
          this.dismissUpdateEducationModal();
          this.getEducationList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving education';
          this.isUpdateEducationFormSubmitted = false;
        }
      }
    );
  }

  public deleteEducation(data) {
    this.initDeleteEducationModal();
    this.isDeleteEducationFormSubmitted = true;
    this.apiService.deleteEducation(data.eduID).subscribe(
      (response) => {
        this.error = '';
        // this.message = 'Experience deleted successfully';
        this.isDeleteEducationFormSubmitted = false;
        this.dismissDeleteEducationModal();
        // this.deleteEducationFromList(data.expID);
        this.getEducationList();
      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          this.error = '';
          // this.message = 'Experience deleted successfully';
          this.isDeleteEducationFormSubmitted = false;
          this.dismissDeleteEducationModal();
          // this.deleteEducationFromList(data.expID);
          this.getEducationList();
        } else {
          this.error = 'Error occurred while deleting education';
          this.isDeleteEducationFormSubmitted = false;
        }
      }
    );
  }

  public initAddEducationModal() {
    this.error = '';
    this.message = '';
    this.isAddEducationFormSubmitted = false;
    this.addEducationForm.patchValue(
      {
        start_year: new Date().getFullYear(),
        end_year: new Date().getFullYear()
      }
    );
  }

  public initUpdateEducationModal() {
    this.error = '';
    this.message = '';
    this.isUpdateEducationFormSubmitted = false;
  }

  public initDeleteEducationModal() {
    this.error = '';
    this.message = '';
    this.isDeleteEducationFormSubmitted = false;
  }

  public dismissAddEducationModal() {
    this.initAddEducationModal();
    const button = <HTMLButtonElement> document.getElementById('addEducationModalDismissButton');
    this.dismissModal(button);
  }

  public dismissUpdateEducationModal() {
    this.initUpdateEducationModal();
    const button = <HTMLButtonElement> document.getElementById('updateEducationModalDismissButton');
    this.dismissModal(button);
  }

  public dismissDeleteEducationModal() {
    this.initDeleteEducationModal();
    const button = <HTMLButtonElement> document.getElementById('deleteEducationModalDismissButton');
    this.dismissModal(button);
  }

  public dismissModal(button: HTMLButtonElement) {
    button.click();
  }

  public prepareUpdateModal(education) {
    this.initUpdateEducationModal();
    this.updateEducationForm.patchValue(
      {
        eduID: education.eduID,
        created_date: education.created_date,
        school_name: education.school_name,
        degree: education.degree,
        field_of_study: education.field_of_study,
        activities: education.activities,
        start_year: parseInt(education.start_year, 10),
        end_year: parseInt(education.end_year, 10)
      }
    );
  }

  public prepareDeleteModal(education) {
    this.initDeleteEducationModal();
    this.deleteEducationForm.patchValue(
      {
        eduID: education.eduID
      }
    );
  }


}
