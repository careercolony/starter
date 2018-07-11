import { ProfileService } from './../app-services/profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from './../app-services/storage.service';
import { ApiService } from './../app-services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-skill',
  templateUrl: './profile-skill.component.html',
  styleUrls: ['./profile-skill.component.css']
})
export class ProfileSkillComponent implements OnInit {

  private skill_list;
  private addSkillForm;
  private memberID;
  private isAddSkillFormSubmitted;
  private error;

  constructor(
    private storageService: StorageService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {
    this.memberID = this.storageService.get('memberID');
    this.addSkillForm = formBuilder.group({
      memberID: [this.memberID, Validators.required],
      skill_title: [null, Validators.required]
    });
  }

  ngOnInit() {

    this.isAddSkillFormSubmitted = false;
    this.apiService.getSkill(this.memberID)
      .subscribe(
        (response) => {
          if (response.length === 0) {
            const initData = {
              memberID: this.memberID,
              skill_title: []
            };
            this.apiService.initSkill(initData)
              .subscribe(
                (initResponse) => {
                  this.skill_list = initResponse[0]['skill_title'];
                },
                (initError) => {
                }
              );
            this.skill_list = [];
          } else {
            this.skill_list = response[0]['skill_title'];
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public addSkill(data) {

    this.error = '';
    this.isAddSkillFormSubmitted = true;
    this.apiService.addSkill(data)
    .subscribe(
      (response) => {
        this.isAddSkillFormSubmitted = false;
        this.skill_list.push(data['skill_title']);
        this.profileService.setSkillCount(this.skill_list.length);
        // this.skill_list = initResponse[0]['skill_title'];
        // this.getAllSkills();
      },
      (error) => {
        this.isAddSkillFormSubmitted = false;
        if (error.status === 200 || error.status === 201) {
          this.skill_list.push(data['skill_title']);
          this.profileService.setSkillCount(this.skill_list.length);
        } else {
          this.error = 'Error occured while adding skill';
        }
      }
    );
  }

  public getAllSkills() {
    this.apiService.getSkill(this.memberID)
    .subscribe(
      (response) => {
        this.skill_list = response[0]['skill_title'];
      },
      (error) => {
        console.log(error);
        this.error = 'Error occured while getting skill';
      }
    );
  }

  public deleteSkill(skill) {

    this.apiService.deleteSkill(this.memberID, skill)
      .subscribe(
        (response) => {
          this.skill_list.splice(this.skill_list.indexOf(skill), 1);
          this.profileService.setSkillCount(this.skill_list.length);
        },
        (error) => {
          if (error.status === 200 || error.status === 201) {
            this.skill_list.splice(this.skill_list.indexOf(skill), 1);
            this.profileService.setSkillCount(this.skill_list.length);
          } else {
            console.log(error);
          }
        }
      );
  }

}
