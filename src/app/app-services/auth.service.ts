import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated()); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private storageService: StorageService
  ) { }

  public isAuthenticated(): boolean {

    const memberID = this.storageService.get('memberID');
    if (memberID > 0) {
      return true;
    } else {
      return false;
    }
  }

  login() {
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
  }

}
