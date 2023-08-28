import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { shoeResolver } from './shoe.resolver';

describe('shoeResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => shoeResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
