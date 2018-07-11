import { StorageService } from './../app-services/storage.service';
import { AuthService } from './../app-services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isLoggedIn$: Observable<boolean>;
  private disabled = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  public logout() {
    this.authService.logout();
    this.storageService.clear();
    this.router.navigateByUrl('');
  }

}
