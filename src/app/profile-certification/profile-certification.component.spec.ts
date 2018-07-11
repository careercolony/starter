import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCertificationComponent } from './profile-certification.component';

describe('ProfileCertificationComponent', () => {
  let component: ProfileCertificationComponent;
  let fixture: ComponentFixture<ProfileCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
