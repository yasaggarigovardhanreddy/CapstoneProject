import { TestBed } from '@angular/core/testing';

import { AqiDataService } from './aqi-data.service';

describe('AqiDataService', () => {
  let service: AqiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AqiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
