import { StorageService } from './../app-services/storage.service';
import { Router } from '@angular/router';
import { ApiService } from './../app-services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-starter-interest',
  templateUrl: './starter-interest.component.html',
  styleUrls: ['./starter-interest.component.css']
})
export class StarterInterestComponent implements OnInit {

  private interests = {};
  private isClassVisible = {};

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public toggleInterest(element) {

    if (this.interests[element]) {
      this.interests[element] = !this.interests[element];
    } else {
      this.interests[element] = true;
    }
  }

  public submitInterest() {

    let interestString = '[';
    for (const key in this.interests) {
      if (this.interests.hasOwnProperty(key)) {
          if (this.interests[key]) {
            interestString += key + ' ,';
          }
      }
    }
    interestString = interestString.replace(/ ,$/, ']');

    const body = {
      memberID: parseInt(this.storageService.get('memberID'), 10),
      email: this.storageService.get('email'),
      interest: interestString
    };
    this.apiService.updateInterest(body).subscribe(
      (response) => {
        this.router.navigateByUrl('');
      },
      (error) => {
        console.log(error);
        if (error.status === 201) {
          // This is ignorable error
          this.router.navigateByUrl('');
        }
      }
    );
  }

}
