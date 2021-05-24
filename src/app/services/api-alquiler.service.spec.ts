import { TestBed } from '@angular/core/testing';

import { ApiAlquilerService } from './api-alquiler.service';

describe('ApiAlquilerService', () => {
  let service: ApiAlquilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAlquilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
