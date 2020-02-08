import { TestBed } from '@angular/core/testing';

import { SeacrchService } from './seacrch.service';

describe('SeacrchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeacrchService = TestBed.get(SeacrchService);
    expect(service).toBeTruthy();
  });
});
