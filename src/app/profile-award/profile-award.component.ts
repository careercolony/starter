import { ProfileService } from './../app-services/profile.service';
import { ApiService } from './../app-services/api.service';
import { StorageService } from './../app-services/storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-award',
  templateUrl: './profile-award.component.html',
  styleUrls: ['./profile-award.component.css']
})
export class ProfileAwardComponent implements OnInit {

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
  private awardList;

  private addAwardForm;
  private updateAwardForm;
  private deleteAwardForm;

  private error;
  private message;
  private startMonth;
  private startYear;

  private isAddAwardFormSubmitted;
  private isUpdateAwardFormSubmitted;
  private isDeleteAwardFormSubmitted;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private apiService: ApiService
  ) {
    this.memberID = this.storageService.get('memberID');

    this.addAwardForm = formBuilder.group({
      award_title: [null, Validators.required],
      issuer: [null, Validators.required],
      month: [null],
      year: [null, Validators.required],
      description: [null, Validators.required]
    });

    this.updateAwardForm = formBuilder.group({
      awID: [null, Validators.required],
      award_title: [null, Validators.required],
      issuer: [null, Validators.required],
      month: [null],
      year: [null, Validators.required],
      description: [true, Validators.required],
      created_date: [null]
    });

    this.deleteAwardForm = formBuilder.group({
      awID: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getAwardList();
  }

  public getAwardList() {
    this.apiService.getAward(this.memberID).subscribe(
      (response) => {
        this.awardList = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public addAward(data) {
    this.initAddAwardModal();
    this.isAddAwardFormSubmitted = true;
    data['year'] = data['year'].toString();
    data['created_date'] = new Date().toUTCString();
    data['updated_date'] = new Date().toUTCString();
    data['memberID'] = this.storageService.get('memberID');
    this.apiService.addAward(data).subscribe(
      (response) => {
        this.error = '';
        this.isAddAwardFormSubmitted = false;
        this.dismissAddAwardModal();
        this.getAwardList();
      },
      (error) => {
        if (error.status === 200) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error, showing message as email already exist
          // console.log('Email already exist');
          this.error = '';
          this.isAddAwardFormSubmitted = false;
          this.dismissAddAwardModal();
          this.getAwardList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving award';
          this.isAddAwardFormSubmitted = false;
        }
      }
    );
  }

  public updateAward(data) {
    this.initUpdateAwardModal();
    this.isUpdateAwardFormSubmitted = true;
    data['year'] = data['year'].toString();
    data['updated_date'] = new Date().toUTCString();
    data['memberID'] = this.memberID;
    this.apiService.updateAward(data).subscribe(
      (response) => {
        this.error = '';
        this.isUpdateAwardFormSubmitted = false;
        this.dismissUpdateAwardModal();
        this.getAwardList();
      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error
          this.error = '';
          this.isUpdateAwardFormSubmitted = false;
          this.dismissUpdateAwardModal();
          this.getAwardList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving award';
          this.isUpdateAwardFormSubmitted = false;
        }
      }
    );
  }

  public deleteAward(data) {
    this.initDeleteAwardModal();
    this.isDeleteAwardFormSubmitted = true;
    this.apiService.deleteAward(data.awID).subscribe(
      (response) => {
        this.error = '';
        // this.message = 'Award deleted successfully';
        this.isDeleteAwardFormSubmitted = false;
        this.dismissDeleteAwardModal();
        // this.deleteAwardFromList(data.expID);
        this.getAwardList();
      },
      (error) => {
        if (error.status === 200) {
          this.error = '';
          // this.message = 'Award deleted successfully';
          this.isDeleteAwardFormSubmitted = false;
          this.dismissDeleteAwardModal();
          // this.deleteAwardFromList(data.expID);
          this.getAwardList();
        } else {
          this.error = 'Error occurred while deleting award';
          this.isDeleteAwardFormSubmitted = false;
        }
      }
    );
  }

  public initAddAwardModal() {
    this.error = '';
    this.message = '';
    this.isAddAwardFormSubmitted = false;
    this.startMonth = this.monthList[new Date().getMonth()];
    this.startYear = new Date().getFullYear();
    this.addAwardForm.patchValue({
      year: this.startYear
    });
  }

  public initUpdateAwardModal() {
    this.error = '';
    this.message = '';
    this.isUpdateAwardFormSubmitted = false;
  }

  public initDeleteAwardModal() {
    this.error = '';
    this.message = '';
    this.isDeleteAwardFormSubmitted = false;
  }

  public dismissAddAwardModal() {
    this.initAddAwardModal();
    const button = <HTMLButtonElement> document.getElementById('addAwardModalDismissButton');
    this.dismissModal(button);
  }

  public dismissUpdateAwardModal() {
    this.initUpdateAwardModal();
    const button = <HTMLButtonElement> document.getElementById('updateAwardModalDismissButton');
    this.dismissModal(button);
  }

  public dismissDeleteAwardModal() {
    this.initDeleteAwardModal();
    const button = <HTMLButtonElement> document.getElementById('deleteAwardModalDismissButton');
    this.dismissModal(button);
  }

  public dismissModal(button: HTMLButtonElement) {
    button.click();
  }

  public prepareUpdateModal(award) {
    this.initUpdateAwardModal();
    this.updateAwardForm.patchValue(
      {
        awID: award.awID,
        award_title: award.award_title,
        issuer: award.issuer,
        year: award.year,
        description: award.description
      }
    );
    this.startMonth = award.month ? award.month : this.startMonth;
  }

  public prepareDeleteModal(award) {
    this.initDeleteAwardModal();
    this.deleteAwardForm.patchValue(
      {
        awID: award.awID
      }
    );
  }


}
