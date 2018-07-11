import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterSignupStepsComponent } from './starter-signup-steps.component';

describe('StarterSignupStepsComponent', () => {
  let component: StarterSignupStepsComponent;
  let fixture: ComponentFixture<StarterSignupStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarterSignupStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterSignupStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
