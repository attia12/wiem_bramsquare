import { TestBed } from '@angular/core/testing';

import { TypesDinvestissementService } from './types-dinvestissement.service';

describe('TypesDinvestissementService', () => {
  let service: TypesDinvestissementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypesDinvestissementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
