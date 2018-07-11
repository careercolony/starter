import { ProfileService } from './../app-services/profile.service';
import { ApiService } from './../app-services/api.service';
import { StorageService } from './../app-services/storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-web-profile',
  templateUrl: './profile-web-profile.component.html',
  styleUrls: ['./profile-web-profile.component.css']
})
export class ProfileWebProfileComponent implements OnInit {

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

  private memberID;
  private webpList;

  private addWebpForm;
  private updateWebpForm;
  private deleteWebpForm;

  private error;
  private message;
  private startMonth;
  private startYear;

  private isAddWebpFormSubmitted;
  private isUpdateWebpFormSubmitted;
  private isDeleteWebpFormSubmitted;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private apiService: ApiService
  ) {
    this.memberID = this.storageService.get('memberID');

    this.addWebpForm = formBuilder.group({
      profile_url: [null, Validators.required]
    });

    this.updateWebpForm = formBuilder.group({
      webpID: [null, Validators.required],
      profile_url: [null, Validators.required],
      created_date: [null]
    });

    this.deleteWebpForm = formBuilder.group({
      webpID: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getWebpList();
  }

  public getWebpList() {
    this.apiService.getWebp(this.memberID).subscribe(
      (response) => {
        this.webpList = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public addWebp(data) {
    this.initAddWebpModal();
    this.isAddWebpFormSubmitted = true;
    data['created_date'] = new Date().toUTCString();
    data['updated_date'] = new Date().toUTCString();
    data['memberID'] = this.storageService.get('memberID');
    this.apiService.addWebp(data).subscribe(
      (response) => {
        this.error = '';
        this.isAddWebpFormSubmitted = false;
        this.dismissAddWebpModal();
        this.getWebpList();
      },
      (error) => {
        if (error.status === 200) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error, showing message as email already exist
          // console.log('Email already exist');
          this.error = '';
          this.isAddWebpFormSubmitted = false;
          this.dismissAddWebpModal();
          this.getWebpList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving web profile';
          this.isAddWebpFormSubmitted = false;
        }
      }
    );
  }

  public updateWebp(data) {
    this.initUpdateWebpModal();
    this.isUpdateWebpFormSubmitted = true;
    data['updated_date'] = new Date().toUTCString();
    data['memberID'] = this.memberID;
    this.apiService.updateWebp(data).subscribe(
      (response) => {
        this.error = '';
        this.isUpdateWebpFormSubmitted = false;
        this.dismissUpdateWebpModal();
        this.getWebpList();
      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error
          this.error = '';
          this.isUpdateWebpFormSubmitted = false;
          this.dismissUpdateWebpModal();
          this.getWebpList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving web profile';
          this.isUpdateWebpFormSubmitted = false;
        }
      }
    );
  }

  public deleteWebp(data) {
    this.initDeleteWebpModal();
    this.isDeleteWebpFormSubmitted = true;
    this.apiService.deleteWebp(data.webpID).subscribe(
      (response) => {
        this.error = '';
        // this.message = 'Webp deleted successfully';
        this.isDeleteWebpFormSubmitted = false;
        this.dismissDeleteWebpModal();
        // this.deleteWebpFromList(data.expID);
        this.getWebpList();
      },
      (error) => {
        if (error.status === 200) {
          this.error = '';
          // this.message = 'Webp deleted successfully';
          this.isDeleteWebpFormSubmitted = false;
          this.dismissDeleteWebpModal();
          // this.deleteWebpFromList(data.expID);
          this.getWebpList();
        } else {
          this.error = 'Error occurred while deleting web profile';
          this.isDeleteWebpFormSubmitted = false;
        }
      }
    );
  }

  public initAddWebpModal() {
    this.error = '';
    this.message = '';
    this.isAddWebpFormSubmitted = false;
  }

  public initUpdateWebpModal() {
    this.error = '';
    this.message = '';
    this.isUpdateWebpFormSubmitted = false;
  }

  public initDeleteWebpModal() {
    this.error = '';
    this.message = '';
    this.isDeleteWebpFormSubmitted = false;
  }

  public dismissAddWebpModal() {
    this.initAddWebpModal();
    const button = <HTMLButtonElement> document.getElementById('addWebpModalDismissButton');
    this.dismissModal(button);
  }

  public dismissUpdateWebpModal() {
    this.initUpdateWebpModal();
    const button = <HTMLButtonElement> document.getElementById('updateWebpModalDismissButton');
    this.dismissModal(button);
  }

  public dismissDeleteWebpModal() {
    this.initDeleteWebpModal();
    const button = <HTMLButtonElement> document.getElementById('deleteWebpModalDismissButton');
    this.dismissModal(button);
  }

  public dismissModal(button: HTMLButtonElement) {
    button.click();
  }

  public prepareUpdateModal(webp) {
    this.initUpdateWebpModal();
    this.updateWebpForm.patchValue(
      {
        webpID: webp.webpID,
        profile_url: webp.profile_url
      }
    );
  }

  public prepareDeleteModal(webp) {
    this.initDeleteWebpModal();
    this.deleteWebpForm.patchValue(
      {
        webpID: webp.webpID
      }
    );
  }


}

