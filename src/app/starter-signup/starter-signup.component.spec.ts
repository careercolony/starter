import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterSignupComponent } from './starter-signup.component';

describe('StarterSignupComponent', () => {
  let component: StarterSignupComponent;
  let fixture: ComponentFixture<StarterSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarterSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
