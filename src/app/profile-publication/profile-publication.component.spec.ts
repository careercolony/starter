import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePublicationComponent } from './profile-publication.component';

describe('ProfilePublicationComponent', () => {
  let component: ProfilePublicationComponent;
  let fixture: ComponentFixture<ProfilePublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
