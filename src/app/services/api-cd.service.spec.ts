import { TestBed } from '@angular/core/testing';

import { ApiCdService } from './api-cd.service';

describe('ApiCdService', () => {
  let service: ApiCdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
