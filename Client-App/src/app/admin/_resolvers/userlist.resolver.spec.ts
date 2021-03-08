import { TestBed } from '@angular/core/testing';

import { UserlistResolver } from './userlist.resolver';

describe('UserlistResolver', () => {
  let resolver: UserlistResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserlistResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
