import { TestBed } from '@angular/core/testing';

import { MapingModelService } from './maping-model.service';

describe('MapingModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapingModelService = TestBed.get(MapingModelService);
    expect(service).toBeTruthy();
  });
});
