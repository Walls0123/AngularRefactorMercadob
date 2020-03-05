import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlocalComponent } from './newlocal.component';

describe('NewlocalComponent', () => {
  let component: NewlocalComponent;
  let fixture: ComponentFixture<NewlocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewlocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
