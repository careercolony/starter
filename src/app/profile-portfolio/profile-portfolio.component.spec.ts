import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWebPortfolioComponent } from './profile-web-portfolio.component';

describe('ProfileWebPortfolioComponent', () => {
  let component: ProfileWebPortfolioComponent;
  let fixture: ComponentFixture<ProfileWebPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileWebPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileWebPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
