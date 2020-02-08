import { TestBed } from '@angular/core/testing';

import { ProccessdataService } from './proccessdata.service';

describe('ProccessdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProccessdataService = TestBed.get(ProccessdataService);
    expect(service).toBeTruthy();
  });
});
