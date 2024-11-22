import { TestBed } from '@angular/core/testing';

import { LoginAuth2Guard } from './login-auth2.guard';

describe('LoginAuth2Guard', () => {
  let guard: LoginAuth2Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginAuth2Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
