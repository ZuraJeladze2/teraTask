import { TestBed } from '@angular/core/testing';

import { TableFacade } from './table.facade';

describe('TableFacade', () => {
  let service: TableFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
