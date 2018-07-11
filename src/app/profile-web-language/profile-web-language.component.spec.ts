import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWebLanguageComponent } from './profile-web-language.component';

describe('ProfileWebLanguageComponent', () => {
  let component: ProfileWebLanguageComponent;
  let fixture: ComponentFixture<ProfileWebLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileWebLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileWebLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
