import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaldetailsComponent } from './localdetails.component';

describe('LocaldetailsComponent', () => {
  let component: LocaldetailsComponent;
  let fixture: ComponentFixture<LocaldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
