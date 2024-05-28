import { TestBed } from '@angular/core/testing';

import { UserStateFacade } from './user-state.facade';

describe('UserStateFacade', () => {
  let service: UserStateFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStateFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
