import { TestBed } from '@angular/core/testing';

import { ChatProvider } from './chat.service';

describe('ChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatProvider = TestBed.get(ChatProvider);
    expect(service).toBeTruthy();
  });
});
