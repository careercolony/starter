import { ProfileService } from './../app-services/profile.service';
import { ApiService } from './../app-services/api.service';
import { StorageService } from './../app-services/storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-portfolio',
  templateUrl: './profile-portfolio.component.html',
  styleUrls: ['./profile-portfolio.component.css']
})
export class ProfilePortfolioComponent implements OnInit {

  private mediaTypeList = [
    'photo',
    'video',
    'pdf'
  ];

  private memberID;
  private portfolioList = [];
  private loadComplete;

  private addPortfolioForm;
  private updatePortfolioForm;
  private deletePortfolioForm;

  private error;
  private message;
  private selectedMediaType;

  private isAddPortfolioFormSubmitted;
  private isUpdatePortfolioFormSubmitted;
  private isDeletePortfolioFormSubmitted;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private apiService: ApiService
  ) {
    this.memberID = this.storageService.get('memberID');

    this.addPortfolioForm = formBuilder.group({
      media_type: [null, Validators.required],
      media_title: [null, Validators.required],
      media_description: [null, Validators.required],
      media: [null, Validators.required]
    });

    this.updatePortfolioForm = formBuilder.group({
      mediaID: [null, Validators.required],
      media_type: [null, Validators.required],
      media_title: [null, Validators.required],
      media_description: [null, Validators.required],
      media: [null, Validators.required]
    });

    this.deletePortfolioForm = formBuilder.group({
      mediaID: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getPortfolioList();
  }

  public getPortfolioList() {
    this.apiService.getPortfolio(this.memberID).subscribe(
      (response) => {
        this.portfolioList = response;
        this.loadComplete = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public addPortfolio(data) {
    this.initAddPortfolioModal();
    this.isAddPortfolioFormSubmitted = true;
    data['reference_to'] = '';
    data['memberID'] = this.storageService.get('memberID');
    this.apiService.addPortfolio(data).subscribe(
      (response) => {
        this.error = '';
        this.isAddPortfolioFormSubmitted = false;
        this.dismissAddPortfolioModal();
        this.getPortfolioList();
      },
      (error) => {
        if (error.status === 200) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error, showing message as email already exist
          // console.log('Email already exist');
          this.error = '';
          this.isAddPortfolioFormSubmitted = false;
          this.dismissAddPortfolioModal();
          this.getPortfolioList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving portfolio';
          this.isAddPortfolioFormSubmitted = false;
        }
      }
    );
  }

  public updatePortfolio(data) {
    this.initUpdatePortfolioModal();
    this.isUpdatePortfolioFormSubmitted = true;
    data['reference_to'] = '';
    data['memberID'] = this.memberID;
    this.apiService.updatePortfolio(data).subscribe(
      (response) => {
        this.error = '';
        this.isUpdatePortfolioFormSubmitted = false;
        this.dismissUpdatePortfolioModal();
        this.getPortfolioList();
      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error
          this.error = '';
          this.isUpdatePortfolioFormSubmitted = false;
          this.dismissUpdatePortfolioModal();
          this.getPortfolioList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving portfolio';
          this.isUpdatePortfolioFormSubmitted = false;
        }
      }
    );
  }

  public deletePortfolio(data) {
    this.initDeletePortfolioModal();
    this.isDeletePortfolioFormSubmitted = true;
    this.apiService.deletePortfolio(data.mediaID).subscribe(
      (response) => {
        this.error = '';
        // this.message = 'Portfolio deleted successfully';
        this.isDeletePortfolioFormSubmitted = false;
        this.dismissDeletePortfolioModal();
        // this.deletePortfolioFromList(data.expID);
        this.getPortfolioList();
      },
      (error) => {
        if (error.status === 200) {
          this.error = '';
          // this.message = 'Portfolio deleted successfully';
          this.isDeletePortfolioFormSubmitted = false;
          this.dismissDeletePortfolioModal();
          // this.deletePortfolioFromList(data.expID);
          this.getPortfolioList();
        } else {
          this.error = 'Error occurred while deleting portfolio';
          this.isDeletePortfolioFormSubmitted = false;
        }
      }
    );
  }

  public initAddPortfolioModal() {
    this.error = '';
    this.message = '';
    this.isAddPortfolioFormSubmitted = false;
  }

  public initUpdatePortfolioModal() {
    this.error = '';
    this.message = '';
    this.isUpdatePortfolioFormSubmitted = false;
  }

  public initDeletePortfolioModal() {
    this.error = '';
    this.message = '';
    this.isDeletePortfolioFormSubmitted = false;
  }

  public dismissAddPortfolioModal() {
    this.initAddPortfolioModal();
    const button = <HTMLButtonElement> document.getElementById('addPortfolioModalDismissButton');
    this.dismissModal(button);
  }

  public dismissUpdatePortfolioModal() {
    this.initUpdatePortfolioModal();
    const button = <HTMLButtonElement> document.getElementById('updatePortfolioModalDismissButton');
    this.dismissModal(button);
  }

  public dismissDeletePortfolioModal() {
    this.initDeletePortfolioModal();
    const button = <HTMLButtonElement> document.getElementById('deletePortfolioModalDismissButton');
    this.dismissModal(button);
  }

  public dismissModal(button: HTMLButtonElement) {
    button.click();
  }

  public prepareUpdateModal(portfolio) {
    this.initUpdatePortfolioModal();
    this.selectedMediaType = portfolio.media_type;
    this.updatePortfolioForm.patchValue(
      {
        mediaID: portfolio.mediaID,
        media_type: portfolio.media_type,
        media_title: portfolio.media_title,
        media_description: portfolio.media_description,
        media: portfolio.media,
      }
    );
  }

  public prepareDeleteModal(portfolio) {
    this.initDeletePortfolioModal();
    this.deletePortfolioForm.patchValue(
      {
        mediaID: portfolio.mediaID
      }
    );
  }

  public setMediaType(mediaType) {
    this.selectedMediaType = mediaType;
    this.addPortfolioForm.patchValue(
      {
        media_type: this.selectedMediaType
      }
    );
  }

}
