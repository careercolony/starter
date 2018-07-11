import { ProfileService } from './../app-services/profile.service';
import { ApiService } from './../app-services/api.service';
import { StorageService } from './../app-services/storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-project',
  templateUrl: './profile-project.component.html',
  styleUrls: ['./profile-project.component.css']
})
export class ProfileProjectComponent implements OnInit {

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
  private projectList;

  private addProjectForm;
  private updateProjectForm;
  private deleteProjectForm;

  private error;
  private message;
  private startMonth;
  private endMonth;
  private startYear;
  private endYear;

  private isAddProjectFormSubmitted;
  private isUpdateProjectFormSubmitted;
  private isDeleteProjectFormSubmitted;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private apiService: ApiService
  ) {
    this.memberID = this.storageService.get('memberID');

    this.addProjectForm = formBuilder.group({
      project_name: [null, Validators.required],
      project_url: [null, Validators.required],
      start_month: [null],
      start_year: [null, Validators.required],
      end_month: [null],
      end_year: [null, Validators.required],
      description: [null, Validators.required]
    });

    this.updateProjectForm = formBuilder.group({
      projID: [null, Validators.required],
      project_name: [null, Validators.required],
      project_url: [null, Validators.required],
      start_month: [null],
      start_year: [null, Validators.required],
      end_month: [null],
      end_year: [null, Validators.required],
      description: [true, Validators.required],
      created_date: [null]
    });

    this.deleteProjectForm = formBuilder.group({
      projID: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getProjectList();
  }

  public getProjectList() {
    this.apiService.getProject(this.memberID).subscribe(
      (response) => {
        this.projectList = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public addProject(data) {
    this.initAddProjectModal();
    this.isAddProjectFormSubmitted = true;
    if (parseInt(data['start_year'], 10) > parseInt(data['end_year'], 10)) {
      this.error = 'To year must be greater than From year';
      this.isAddProjectFormSubmitted = false;
      return;
    } else if (parseInt(data['start_year'], 10) === parseInt(data['end_year'], 10)) {
      if (this.monthList.indexOf(data['start_month']) > this.monthList.indexOf(data['end_month'])) {
        this.error = 'To year must be greater than From year';
        this.isAddProjectFormSubmitted = false;
      }
    }
    data['start_year'] = data['start_year'].toString();
    data['end_year'] = data['end_year'].toString();
    data['created_date'] = new Date().toUTCString();
    data['updated_date'] = new Date().toUTCString();
    data['memberID'] = this.storageService.get('memberID');
    this.apiService.addProject(data).subscribe(
      (response) => {
        this.error = '';
        this.isAddProjectFormSubmitted = false;
        this.dismissAddProjectModal();
        this.getProjectList();
      },
      (error) => {
        if (error.status === 200) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error, showing message as email already exist
          // console.log('Email already exist');
          this.error = '';
          this.isAddProjectFormSubmitted = false;
          this.dismissAddProjectModal();
          this.getProjectList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving project';
          this.isAddProjectFormSubmitted = false;
        }
      }
    );
  }

  public updateProject(data) {
    this.initUpdateProjectModal();
    this.isUpdateProjectFormSubmitted = true;
    if (parseInt(data['start_year'], 10) > parseInt(data['end_year'], 10)) {
      this.error = 'To year must be greater than From year';
      this.isUpdateProjectFormSubmitted = false;
      return;
    } else if (parseInt(data['start_year'], 10) === parseInt(data['end_year'], 10)) {
      if (this.monthList.indexOf(data['start_month']) > this.monthList.indexOf(data['end_month'])) {
        this.error = 'To year must be greater than From year';
        this.isUpdateProjectFormSubmitted = false;
      }
    }
    data['start_year'] = data['start_year'].toString();
    data['end_year'] = data['end_year'].toString();
    data['updated_date'] = new Date().toUTCString();
    data['memberID'] = this.memberID;
    this.apiService.updateProject(data).subscribe(
      (response) => {
        this.error = '';
        this.isUpdateProjectFormSubmitted = false;
        this.dismissUpdateProjectModal();
        this.getProjectList();
      },
      (error) => {
        if (error.status === 200 || error.status === 201) {
          // HTTP response was 200 but still if there is any error,
          // assuming it is json parser error
          this.error = '';
          this.isUpdateProjectFormSubmitted = false;
          this.dismissUpdateProjectModal();
          this.getProjectList();
        } else {
          // this.message = '';
          this.error = 'Error occurred while saving project';
          this.isUpdateProjectFormSubmitted = false;
        }
      }
    );
  }

  public deleteProject(data) {
    this.initDeleteProjectModal();
    this.isDeleteProjectFormSubmitted = true;
    this.apiService.deleteProject(data.projID).subscribe(
      (response) => {
        this.error = '';
        // this.message = 'Project deleted successfully';
        this.isDeleteProjectFormSubmitted = false;
        this.dismissDeleteProjectModal();
        // this.deleteProjectFromList(data.expID);
        this.getProjectList();
      },
      (error) => {
        if (error.status === 200) {
          this.error = '';
          // this.message = 'Project deleted successfully';
          this.isDeleteProjectFormSubmitted = false;
          this.dismissDeleteProjectModal();
          // this.deleteProjectFromList(data.expID);
          this.getProjectList();
        } else {
          this.error = 'Error occurred while deleting project';
          this.isDeleteProjectFormSubmitted = false;
        }
      }
    );
  }

  public initAddProjectModal() {
    this.error = '';
    this.message = '';
    this.isAddProjectFormSubmitted = false;
    this.startMonth = this.monthList[new Date().getMonth()];
    this.endMonth = this.monthList[new Date().getMonth()];
    this.startYear = new Date().getFullYear();
    this.endYear = new Date().getFullYear();
    this.addProjectForm.patchValue({
      start_year: this.startYear,
      end_year: this.endYear
    });
  }

  public initUpdateProjectModal() {
    this.error = '';
    this.message = '';
    this.isUpdateProjectFormSubmitted = false;
  }

  public initDeleteProjectModal() {
    this.error = '';
    this.message = '';
    this.isDeleteProjectFormSubmitted = false;
  }

  public dismissAddProjectModal() {
    this.initAddProjectModal();
    const button = <HTMLButtonElement> document.getElementById('addProjectModalDismissButton');
    this.dismissModal(button);
  }

  public dismissUpdateProjectModal() {
    this.initUpdateProjectModal();
    const button = <HTMLButtonElement> document.getElementById('updateProjectModalDismissButton');
    this.dismissModal(button);
  }

  public dismissDeleteProjectModal() {
    this.initDeleteProjectModal();
    const button = <HTMLButtonElement> document.getElementById('deleteProjectModalDismissButton');
    this.dismissModal(button);
  }

  public dismissModal(button: HTMLButtonElement) {
    button.click();
  }

  public prepareUpdateModal(project) {
    this.initUpdateProjectModal();
    this.updateProjectForm.patchValue(
      {
        projID: project.projID,
        project_name: project.project_name,
        project_url: project.project_url,
        // start_month: project.projID,
        start_year: project.start_year,
        // end_month: project.projID,
        end_year: project.end_year,
        description: project.description
      }
    );
    this.startMonth = project.start_month ? project.start_month : this.startMonth;
    this.endMonth = project.end_month ? project.end_month : this.endMonth;
  }

  public prepareDeleteModal(project) {
    this.initDeleteProjectModal();
    this.deleteProjectForm.patchValue(
      {
        projID: project.projID
      }
    );
  }


}
