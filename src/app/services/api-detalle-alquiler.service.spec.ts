import { TestBed } from '@angular/core/testing';

import { ApiDetalleAlquilerService } from './api-detalle-alquiler.service';

describe('ApiDetalleAlquilerService', () => {
  let service: ApiDetalleAlquilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDetalleAlquilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
