import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterLogoutComponent } from './starter-logout.component';

describe('StarterLogoutComponent', () => {
  let component: StarterLogoutComponent;
  let fixture: ComponentFixture<StarterLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarterLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
