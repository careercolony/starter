import { ProfileService } from './../app-services/profile.service';
import { ApiService } from './../app-services/api.service';
import { StorageService } from './../app-services/storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-web-language',
  templateUrl: './profile-web-language.component.html',
  styleUrls: ['./profile-web-language.component.css']
})
export class ProfileWebLanguageComponent implements OnInit {

  private fluencyList = [
    'Starter',
    'Intermediate',
    'Advanced'
  ];

  private memberID;
  private languageList;

  private addLanguageForm;
  private updateLanguageForm;
  private deleteLanguageForm;

  private error;
  private message;
  private selectedFluency;

  private isAddLanguageFormSubmitted;
  private isUpdateLanguageFormSubmitted;
  private isDeleteLanguageFormSubmitted;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private apiService: ApiService
  ) {
    this.memberID = this.storageService.get('memberID');

    this.addLanguageForm = formBuilder.group({
      language: [null, Validators.required],
      fluency: [null]
    });

    this.updateLanguageForm = formBuilder.group({
      langID: [null, Validators.required],
      language: [null, Validators.required],
      fluency: [null]
    });

    this.deleteLanguageForm = formBuilder.group({
      langID: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getLanguageList();
  }

  public getLanguageList() {
    this.apiService.getLanguage(this.memberID).subscribe(
      (response) => {
        this.languageList = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public addLanguage(data) {
    this.initAddLanguageModal();
    this.isAddLanguageFormSubmitted = true;
    data['memberID'] = this.storageService.get('memberID');
    this.apiService.addLanguage(data).subscribe(
      (response) => {
        this.error = '';
        this.isAddLanguageFormSubmitted = false;
        this.dismissAddLanguageModal();
        this.getLanguageList();
      },
      (error) => {
        if (error.status === 200) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error, showing message as email already exist
          // console.log('Email already exist');
          this.error = '';
          this.isAddLanguageFormSubmitted = false;
          this.dismissAddLanguageModal();
          this.getLanguageList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving language';
          this.isAddLanguageFormSubmitted = false;
        }
      }
    );
  }

  public updateLanguage(data) {
    this.initUpdateLanguageModal();
    this.isUpdateLanguageFormSubmitted = true;
    data['memberID'] = this.memberID;
    this.apiService.updateLanguage(data).subscribe(
      (response) => {
        this.error = '';
        this.isUpdateLanguageFormSubmitted = false;
        this.dismissUpdateLanguageModal();
        this.getLanguageList();
      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error
          this.error = '';
          this.isUpdateLanguageFormSubmitted = false;
          this.dismissUpdateLanguageModal();
          this.getLanguageList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving language';
          this.isUpdateLanguageFormSubmitted = false;
        }
      }
    );
  }

  public deleteLanguage(data) {
    this.initDeleteLanguageModal();
    this.isDeleteLanguageFormSubmitted = true;
    this.apiService.deleteLanguage(data.langID).subscribe(
      (response) => {
        this.error = '';
        // this.message = 'Language deleted successfully';
        this.isDeleteLanguageFormSubmitted = false;
        this.dismissDeleteLanguageModal();
        // this.deleteLanguageFromList(data.expID);
        this.getLanguageList();
      },
      (error) => {
        if (error.status === 200) {
          this.error = '';
          // this.message = 'Language deleted successfully';
          this.isDeleteLanguageFormSubmitted = false;
          this.dismissDeleteLanguageModal();
          // this.deleteLanguageFromList(data.expID);
          this.getLanguageList();
        } else {
          this.error = 'Error occurred while deleting language';
          this.isDeleteLanguageFormSubmitted = false;
        }
      }
    );
  }

  public initAddLanguageModal() {
    this.error = '';
    this.message = '';
    this.isAddLanguageFormSubmitted = false;
    this.selectedFluency = this.fluencyList[0];
    this.addLanguageForm.patchValue(
      {
        fluency: this.selectedFluency
      }
    );
  }

  public initUpdateLanguageModal() {
    this.error = '';
    this.message = '';
    this.isUpdateLanguageFormSubmitted = false;
  }

  public initDeleteLanguageModal() {
    this.error = '';
    this.message = '';
    this.isDeleteLanguageFormSubmitted = false;
  }

  public dismissAddLanguageModal() {
    this.initAddLanguageModal();
    const button = <HTMLButtonElement> document.getElementById('addLanguageModalDismissButton');
    this.dismissModal(button);
  }

  public dismissUpdateLanguageModal() {
    this.initUpdateLanguageModal();
    const button = <HTMLButtonElement> document.getElementById('updateLanguageModalDismissButton');
    this.dismissModal(button);
  }

  public dismissDeleteLanguageModal() {
    this.initDeleteLanguageModal();
    const button = <HTMLButtonElement> document.getElementById('deleteLanguageModalDismissButton');
    this.dismissModal(button);
  }

  public dismissModal(button: HTMLButtonElement) {
    button.click();
  }

  public prepareUpdateModal(language) {
    this.initUpdateLanguageModal();
    this.selectedFluency = language.fluency ? language.fluency : this.fluencyList[0];
    this.updateLanguageForm.patchValue(
      {
        langID: language.langID,
        language: language.language,
        fluency: this.selectedFluency
      }
    );
  }

  public prepareDeleteModal(language) {
    this.initDeleteLanguageModal();
    this.deleteLanguageForm.patchValue(
      {
        langID: language.langID
      }
    );
  }

}
