import { environment } from './../../environments/environment';
import { CipherService } from './../app-services/cipher.service';
import { EmailService } from './../app-services/email.service';
import { StorageService } from './../app-services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

const DOMAIN = environment.domain;

@Component({
  selector: 'app-starter-email-confirmation',
  templateUrl: './starter-email-confirmation.component.html',
  styleUrls: ['./starter-email-confirmation.component.css']
})
export class StarterEmailConfirmationComponent implements OnInit {

  private email;
  private memberID;
  private emailVerificationStatus;
  private verification;
  private mailResent;

  constructor(
    private storageService: StorageService,
    private cipherService: CipherService,
    private emailService: EmailService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.mailResent = false;
    this.email = this.storageService.get('email');
    this.memberID = this.storageService.get('memberID');
    this.route.params.subscribe( params => {
      if (params.option === 'verify') {
        this.verification = true;
        this.verifyEmail(params.id, params.mail);
      } else if (params.option === 'notify') {
        this.verification = false;
        this.sendVerificationEmail();
      } else {
        this.verification = false;
        // this.sendVerificationEmail();
      }
    });
  }

  public resendVerificationEmail() {
    this.sendVerificationEmail();
    this.mailResent = true;
  }

  public sendVerificationEmail() {

    const subject = 'Career colony verification email';
    const verificationLink = DOMAIN + '/email-verification/verify/' + this.memberID + '/' + this.email;
    const body = `Click this link to verify your account - ${verificationLink}`;
    this.emailService.sendEmail(this.email, subject, body);
  }

  public verifyEmail(id, mail) {

    const memberID = id;
    const email = mail;

    if (memberID > -1) {
      // Email verified
      this.emailVerificationStatus = 'Email verification successful';
      this.mailResent = false;
      this.storageService.store('memberID', memberID);
      this.storageService.store('email', email);
      this.router.navigateByUrl('/interest');
    } else {
      // Email not verified
      this.emailVerificationStatus = 'Email verification failed';
      this.mailResent = false;
    }
  }
}
