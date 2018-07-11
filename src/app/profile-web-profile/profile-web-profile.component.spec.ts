import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWebProfileComponent } from './profile-web-profile.component';

describe('ProfileWebProfileComponent', () => {
  let component: ProfileWebProfileComponent;
  let fixture: ComponentFixture<ProfileWebProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileWebProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileWebProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
