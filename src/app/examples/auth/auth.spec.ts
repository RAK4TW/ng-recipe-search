import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Auth } from '../auth/auth';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
