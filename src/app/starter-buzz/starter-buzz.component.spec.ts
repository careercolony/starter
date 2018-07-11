import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterBuzzComponent } from './starter-buzz.component';

describe('StarterBuzzComponent', () => {
  let component: StarterBuzzComponent;
  let fixture: ComponentFixture<StarterBuzzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarterBuzzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterBuzzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
