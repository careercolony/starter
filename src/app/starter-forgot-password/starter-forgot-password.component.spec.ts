import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterForgotPasswordComponent } from './starter-forgot-password.component';

describe('StarterForgotPasswordComponent', () => {
  let component: StarterForgotPasswordComponent;
  let fixture: ComponentFixture<StarterForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarterForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
