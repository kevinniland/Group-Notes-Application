import { TestBed } from '@angular/core/testing';

import { AuthProvider } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthProvider = TestBed.get(AuthProvider);
    expect(service).toBeTruthy();
  });
});
