import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterLoginComponent } from './starter-login.component';

describe('StarterLoginComponent', () => {
  let component: StarterLoginComponent;
  let fixture: ComponentFixture<StarterLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarterLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
