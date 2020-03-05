import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestiondashComponent } from './gestiondash.component';

describe('GestiondashComponent', () => {
  let component: GestiondashComponent;
  let fixture: ComponentFixture<GestiondashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestiondashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestiondashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
