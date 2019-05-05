import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });

    service = TestBed.get(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a message', () => {
    service.add('helton alves');

    expect(service.messages.length).toBe(1);
    expect(service.getMessage()).toEqual('helton alves');
  })

  it('should return first message', () => {
    service.add('Test message!');
    
    expect(service.getMessage()).toEqual('Test message!');
  });

  it('should to clear the list messages', () => {
    service.add('Test message!');
    
    expect(service.messages.length).toBe(1);

    service.clear();

    expect(service.messages.length).toBe(0);
  });
});
