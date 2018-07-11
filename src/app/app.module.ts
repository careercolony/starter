import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StarterHomeComponent } from './starter-home/starter-home.component';
import { StarterSignupStepsComponent } from './starter-signup-steps/starter-signup-steps.component';
import { StarterEmailConfirmationComponent } from './starter-email-confirmation/starter-email-confirmation.component';
import { StarterInterestComponent } from './starter-interest/starter-interest.component';
import { StarterBuzzComponent } from './starter-buzz/starter-buzz.component';
import { StarterForgotPasswordComponent } from './starter-forgot-password/starter-forgot-password.component';
import { StarterLogoutComponent } from './starter-logout/starter-logout.component';
import { StarterSignupComponent } from './starter-signup/starter-signup.component';
import { StarterLoginComponent } from './starter-login/starter-login.component';

import { GeolocationService } from './thirdparty-services/geolocation.service';
import { IndustryService } from './thirdparty-services/industry.service';
import { CountryService } from './thirdparty-services/country.service';
import { ApiService } from './app-services/api.service';
import { StorageService } from './app-services/storage.service';
import { CipherService } from './app-services/cipher.service';
import { AuthService } from './app-services/auth.service';
import { AuthGuardService } from './app-services/auth-guard.service';
import { EmailService } from './app-services/email.service';
import { ProfileService } from './app-services/profile.service';
import { ElasticsearchService } from './elasticsearch.service';
import { ImageUploadService }  from './app-services/image-upload.service'   


import { FormWizardModule } from './modules/form-wizard/form-wizard.module';
import { Slim } from './thirdparty-services/slim-image/slim.angular2';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';

import { BuzzComponent } from './buzz/buzz.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileExperienceComponent } from './profile-experience/profile-experience.component';
import { ProfileEducationComponent } from './profile-education/profile-education.component';
import { ProfileSkillComponent } from './profile-skill/profile-skill.component';
import { ProfileCertificationComponent } from './profile-certification/profile-certification.component';
import { ProfileProjectComponent } from './profile-project/profile-project.component';
import { ProfileAwardComponent } from './profile-award/profile-award.component';
import { ProfilePublicationComponent } from './profile-publication/profile-publication.component';
import { ProfileWebProfileComponent } from './profile-web-profile/profile-web-profile.component';
import { ProfileWebLanguageComponent } from './profile-web-language/profile-web-language.component';
import { ProfilePortfolioComponent } from './profile-portfolio/profile-portfolio.component';
import { RelativeTimePipe } from './app-services/relative-time.pipe';
import { CapitalizePipe } from './app-services/capitalize.pipe';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { AnimationComponent } from './animation/animation.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StarterHomeComponent,
    StarterSignupStepsComponent,
    StarterEmailConfirmationComponent,
    StarterInterestComponent,
    StarterBuzzComponent,
    StarterForgotPasswordComponent,
    StarterLogoutComponent,
    StarterSignupComponent,
    StarterLoginComponent,
    BuzzComponent,
    ProfileComponent,
    ProfileExperienceComponent,
    ProfileEducationComponent,
    ProfileSkillComponent,
    ProfileCertificationComponent,
    ProfileProjectComponent,
    ProfileAwardComponent,
    ProfilePublicationComponent,
    ProfileWebProfileComponent,
    ProfileWebLanguageComponent,
    ProfilePortfolioComponent,
    RelativeTimePipe,
    CapitalizePipe,
    ProfileImageComponent,
    Slim,
    AnimationComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormWizardModule,
    Ng2DeviceDetectorModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: StarterHomeComponent},
      {path: 'buzz', component: BuzzComponent, canActivate: [AuthGuardService]},
      {path: 'signup', component: StarterSignupComponent},
      {path: 'login', component: StarterLoginComponent},
      {path: 'interest', component: StarterInterestComponent},
      {path: 'logout', component: StarterLogoutComponent},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService],
        children: [
          {path: 'experience', component: ProfileExperienceComponent, canActivate: [AuthGuardService]},
          {path: 'education', component: ProfileEducationComponent, canActivate: [AuthGuardService]},
          {path: 'skills', component: ProfileSkillComponent, canActivate: [AuthGuardService]},
          {path: 'portfolio', component: ProfilePortfolioComponent, canActivate: [AuthGuardService]},
          {path: 'certification', component: ProfileCertificationComponent, canActivate: [AuthGuardService]},
          {path: 'project', component: ProfileProjectComponent, canActivate: [AuthGuardService]},
          {path: 'award', component: ProfileAwardComponent, canActivate: [AuthGuardService]},
          {path: 'publication', component: ProfilePublicationComponent, canActivate: [AuthGuardService]},
          {path: 'web-profile', component: ProfileWebProfileComponent, canActivate: [AuthGuardService]},
          {path: 'language', component: ProfileWebLanguageComponent, canActivate: [AuthGuardService]},
          {path: 'image', component: ProfileImageComponent, canActivate: [AuthGuardService]}
      ]},
      {path: 'email-verification', component: StarterEmailConfirmationComponent, canActivate: [AuthGuardService]},
      {path: 'email-verification/:option', component: StarterEmailConfirmationComponent, canActivate: [AuthGuardService]},
      {path: 'email-verification/:option/:id/:mail', component: StarterEmailConfirmationComponent},
      {path: 'forgot-pass', component: StarterForgotPasswordComponent},
      {path: 'signup-steps', component: StarterSignupStepsComponent, canActivate: [AuthGuardService] }
      /*
      children:[
        {path:'experience', component:ProfileExperienceComponent},
        {path:'education', component:ProfileEducationComponent},
        {path:'skills', component:ProfileSkillComponent},
        {path:'portfolio', component:ProfilePortfolioComponent},
        {path:'certification', component:ProfileCertificationComponent},
        {path:'project', component:ProfileProjectComponent},
        {path:'award', component:ProfileAwardComponent},
        {path:'publication', component:ProfilePublicationComponent},
        {path:'web-profile', component:ProfileWebProfileComponent},
        {path:'language', component:ProfileWebLanguageComponent}
      ]},
      */
    ])
  ],
  providers: [
    GeolocationService,
    IndustryService,
    CountryService,
    ApiService,
    StorageService,
    CipherService,
    AuthService,
    AuthGuardService,
    EmailService,
    ProfileService,
    ElasticsearchService,
    ImageUploadService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
