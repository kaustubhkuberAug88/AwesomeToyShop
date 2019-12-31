import { TestBed, async, inject } from '@angular/core/testing';

import { ToyEditGuard } from './toy-edit.guard';

describe('ToyEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToyEditGuard]
    });
  });

  it('should ...', inject([ToyEditGuard], (guard: ToyEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
