import { TestBed } from '@angular/core/testing';

import { InvestissementService } from './investissement.service';

describe('InvestissementService', () => {
  let service: InvestissementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestissementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
