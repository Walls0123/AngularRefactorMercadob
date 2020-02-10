import { TestBed } from '@angular/core/testing';

import { MetacolorService } from './metacolor.service';

describe('MetacolorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetacolorService = TestBed.get(MetacolorService);
    expect(service).toBeTruthy();
  });
});
