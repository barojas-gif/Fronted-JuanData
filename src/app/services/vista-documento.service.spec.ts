import { TestBed } from '@angular/core/testing';

import { VistaDocumentoService } from './vista-documento.service';

describe('VistaDocumentoService', () => {
  let service: VistaDocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VistaDocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
