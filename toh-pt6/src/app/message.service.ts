import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];

  add(message: string): void {
    this.messages.push(message);
  }

  getMessage(): string | undefined {
    return this.messages[0];
  }

  clear() {
    this.messages = [];
  }
}
