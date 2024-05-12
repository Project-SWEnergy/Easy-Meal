import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isClientGuard } from './is-client.guard';

describe('isClientGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isClientGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
