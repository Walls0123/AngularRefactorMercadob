import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginreservationComponent } from './loginreservation.component';

describe('LoginreservationComponent', () => {
  let component: LoginreservationComponent;
  let fixture: ComponentFixture<LoginreservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginreservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
