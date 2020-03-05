import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewempresaComponent } from './newempresa.component';

describe('NewempresaComponent', () => {
  let component: NewempresaComponent;
  let fixture: ComponentFixture<NewempresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
