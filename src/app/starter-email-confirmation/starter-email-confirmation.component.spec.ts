import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterEmailConfirmationComponent } from './starter-email-confirmation.component';

describe('StarterEmailConfirmationComponent', () => {
  let component: StarterEmailConfirmationComponent;
  let fixture: ComponentFixture<StarterEmailConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarterEmailConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterEmailConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
