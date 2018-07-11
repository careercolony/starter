import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAwardComponent } from './profile-award.component';

describe('ProfileAwardComponent', () => {
  let component: ProfileAwardComponent;
  let fixture: ComponentFixture<ProfileAwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
