import { TestBed } from '@angular/core/testing';

import { FileStorageService } from './file-storage.service';

describe('FileStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileStorageService = TestBed.get(FileStorageService);
    expect(service).toBeTruthy();
  });
});
