import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterInterestComponent } from './starter-interest.component';

describe('StarterInterestComponent', () => {
  let component: StarterInterestComponent;
  let fixture: ComponentFixture<StarterInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarterInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
