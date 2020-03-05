import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderdashComponent } from './headerdash.component';

describe('HeaderdashComponent', () => {
  let component: HeaderdashComponent;
  let fixture: ComponentFixture<HeaderdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
