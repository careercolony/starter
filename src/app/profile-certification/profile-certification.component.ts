import { ProfileService } from './../app-services/profile.service';
import { ApiService } from './../app-services/api.service';
import { StorageService } from './../app-services/storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-certification',
  templateUrl: './profile-certification.component.html',
  styleUrls: ['./profile-certification.component.css']
})
export class ProfileCertificationComponent implements OnInit {

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
  private certificationList;

  private addCertificationForm;
  private updateCertificationForm;
  private deleteCertificationForm;

  private error;
  private message;
  private startMonth;
  private endMonth;
  private startYear;
  private endYear;

  private isAddCertificationFormSubmitted;
  private isUpdateCertificationFormSubmitted;
  private isDeleteCertificationFormSubmitted;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private apiService: ApiService
  ) {
    this.memberID = this.storageService.get('memberID');

    this.addCertificationForm = formBuilder.group({
      cert_name: [null, Validators.required],
      licence: [null, Validators.required],
      cert_authority: [null, Validators.required],
      cert_url: [null, Validators.required],
      start_month: [null],
      start_year: [null, Validators.required],
      end_month: [null],
      end_year: [null, Validators.required],
      expires: [true, Validators.required]
    });

    this.updateCertificationForm = formBuilder.group({
      certID: [null, Validators.required],
      cert_name: [null, Validators.required],
      licence: [null, Validators.required],
      cert_authority: [null, Validators.required],
      cert_url: [null, Validators.required],
      start_month: [null],
      start_year: [null, Validators.required],
      end_month: [null],
      end_year: [null, Validators.required],
      expires: [true, Validators.required],
      created_date: [null]
    });

    this.deleteCertificationForm = formBuilder.group({
      certID: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getCertificationList();
  }

  public getCertificationList() {
    this.apiService.getCertification(this.memberID).subscribe(
      (response) => {
        this.certificationList = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public addCertification(data) {
    this.initAddCertificationModal();
    this.isAddCertificationFormSubmitted = true;
    if (parseInt(data['start_year'], 10) > parseInt(data['end_year'], 10)) {
      this.error = 'To year must be greater than From year';
      this.isAddCertificationFormSubmitted = false;
      return;
    } else if (parseInt(data['start_year'], 10) === parseInt(data['end_year'], 10)) {
      if (this.monthList.indexOf(data['start_month']) > this.monthList.indexOf(data['end_month'])) {
        this.error = 'To year must be greater than From year';
        this.isAddCertificationFormSubmitted = false;
      }
    }
    data['start_year'] = data['start_year'].toString();
    data['end_year'] = data['end_year'].toString();
    data['created_date'] = new Date().toUTCString();
    data['updated_date'] = new Date().toUTCString();
    data['expires'] = data['expires'] ? 1 : 0;
    data['memberID'] = this.storageService.get('memberID');
    this.apiService.addCertification(data).subscribe(
      (response) => {
        this.error = '';
        this.isAddCertificationFormSubmitted = false;
        this.dismissAddCertificationModal();
        this.getCertificationList();
      },
      (error) => {
        if (error.status === 200) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error, showing message as email already exist
          // console.log('Email already exist');
          this.error = '';
          this.isAddCertificationFormSubmitted = false;
          this.dismissAddCertificationModal();
          this.getCertificationList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving certification';
          this.isAddCertificationFormSubmitted = false;
        }
      }
    );
  }

  public updateCertification(data) {
    this.initUpdateCertificationModal();
    this.isUpdateCertificationFormSubmitted = true;
    if (parseInt(data['start_year'], 10) > parseInt(data['end_year'], 10)) {
      this.error = 'To year must be greater than From year';
      this.isUpdateCertificationFormSubmitted = false;
      return;
    } else if (parseInt(data['start_year'], 10) === parseInt(data['end_year'], 10)) {
      if (this.monthList.indexOf(data['start_month']) > this.monthList.indexOf(data['end_month'])) {
        this.error = 'To year must be greater than From year';
        this.isUpdateCertificationFormSubmitted = false;
      }
    }
    data['start_year'] = data['start_year'].toString();
    data['end_year'] = data['end_year'].toString();
    data['updated_date'] = new Date().toUTCString();
    data['memberID'] = this.memberID;
    this.apiService.updateCertification(data).subscribe(
      (response) => {
        this.error = '';
        this.isUpdateCertificationFormSubmitted = false;
        this.dismissUpdateCertificationModal();
        this.getCertificationList();
      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error
          this.error = '';
          this.isUpdateCertificationFormSubmitted = false;
          this.dismissUpdateCertificationModal();
          this.getCertificationList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving certification';
          this.isUpdateCertificationFormSubmitted = false;
        }
      }
    );
  }

  public deleteCertification(data) {
    this.initDeleteCertificationModal();
    this.isDeleteCertificationFormSubmitted = true;
    this.apiService.deleteCertification(data.certID).subscribe(
      (response) => {
        this.error = '';
        // this.message = 'Certification deleted successfully';
        this.isDeleteCertificationFormSubmitted = false;
        this.dismissDeleteCertificationModal();
        // this.deleteCertificationFromList(data.expID);
        this.getCertificationList();
      },
      (error) => {
        if (error.status === 200) {
          this.error = '';
          // this.message = 'Certification deleted successfully';
          this.isDeleteCertificationFormSubmitted = false;
          this.dismissDeleteCertificationModal();
          // this.deleteCertificationFromList(data.expID);
          this.getCertificationList();
        } else {
          this.error = 'Error occurred while deleting certification';
          this.isDeleteCertificationFormSubmitted = false;
        }
      }
    );
  }

  public initAddCertificationModal() {
    this.error = '';
    this.message = '';
    this.isAddCertificationFormSubmitted = false;
    this.startMonth = this.monthList[new Date().getMonth()];
    this.endMonth = this.monthList[new Date().getMonth()];
    this.startYear = new Date().getFullYear();
    this.endYear = new Date().getFullYear();
    this.addCertificationForm.patchValue({
      start_year: this.startYear,
      end_year: this.endYear
    });
  }

  public initUpdateCertificationModal() {
    this.error = '';
    this.message = '';
    this.isUpdateCertificationFormSubmitted = false;
  }

  public initDeleteCertificationModal() {
    this.error = '';
    this.message = '';
    this.isDeleteCertificationFormSubmitted = false;
  }

  public dismissAddCertificationModal() {
    this.initAddCertificationModal();
    const button = <HTMLButtonElement> document.getElementById('addCertificationModalDismissButton');
    this.dismissModal(button);
  }

  public dismissUpdateCertificationModal() {
    this.initUpdateCertificationModal();
    const button = <HTMLButtonElement> document.getElementById('updateCertificationModalDismissButton');
    this.dismissModal(button);
  }

  public dismissDeleteCertificationModal() {
    this.initDeleteCertificationModal();
    const button = <HTMLButtonElement> document.getElementById('deleteCertificationModalDismissButton');
    this.dismissModal(button);
  }

  public dismissModal(button: HTMLButtonElement) {
    button.click();
  }

  public prepareUpdateModal(certification) {
    this.initUpdateCertificationModal();
    this.updateCertificationForm.patchValue(
      {
        certID: certification.certID,
        created_date: certification.created_date,
        cert_name: certification.cert_name,
        licence: certification.licence,
        cert_authority: certification.cert_authority,
        cert_url: certification.cert_url,
        start_year: certification.start_year,
        end_year: certification.end_year,
        expires: certification.expires
      }
    );
    this.startMonth = certification.start_month ? certification.start_month : this.startMonth;
    this.endMonth = certification.end_month ? certification.end_month : this.endMonth;
  }

  public prepareDeleteModal(certification) {
    this.initDeleteCertificationModal();
    this.deleteCertificationForm.patchValue(
      {
        certID: certification.certID
      }
    );
  }


}
