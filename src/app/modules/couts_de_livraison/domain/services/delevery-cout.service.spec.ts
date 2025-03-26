import { TestBed } from '@angular/core/testing';

import { DeleveryCoutService } from './delevery-cout.service';

describe('DeleveryCoutService', () => {
  let service: DeleveryCoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleveryCoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
