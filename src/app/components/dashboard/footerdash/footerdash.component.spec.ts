import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterdashComponent } from './footerdash.component';

describe('FooterdashComponent', () => {
  let component: FooterdashComponent;
  let fixture: ComponentFixture<FooterdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
