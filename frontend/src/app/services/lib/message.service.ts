import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private static timeout = 3000; // Message timeout period
  private static messages: {
    message: string;
    type: 'log' | 'error';
    timeout: Date;
  }[] = [];
  private static messagesSubject = new BehaviorSubject<
    { message: string; type: 'log' | 'error' }[]
  >([]);
  private static checkInterval = 1000; // Interval to check for expired messages

  constructor() {
    // Initialize checking for message expiration
    this.initExpirationCheck();
  }

  private initExpirationCheck(): void {
    timer(0, MessageService.checkInterval).subscribe(() => {
      this.updateMessages();
    });

    // while (this.messages.length > 0) {
    //  let ms = this.messages[0].timeout.getTime() - new Date().getTime();
    //  timer(ms).subscribe(() => {
    //   this.updateMessages();
    //  })
    // }
    // timer = false
  }

  private updateMessages(): void {
    const now = new Date();
    MessageService.messages = MessageService.messages.filter(
      (m) => m.timeout > now,
    );

    MessageService.messagesSubject.next(
      MessageService.messages.map((m) => ({
        message: m.message,
        type: m.type,
      })),
    );
  }

  log(message: string): void {
    const timeout = new Date(new Date().getTime() + MessageService.timeout);
    MessageService.messages.push({ message, type: 'log', timeout });
    // if (timer == false) {
    // timer = true
    // this.initExpirationCheck()
    // }
    this.updateMessages(); // Optionally update immediately upon adding
  }

  error(message: string): void {
    const timeout = new Date(new Date().getTime() + MessageService.timeout);
    MessageService.messages.push({ message, type: 'error', timeout });
    this.updateMessages(); // Optionally update immediately upon adding
  }

  notify(): Observable<{ message: string; type: 'log' | 'error' }[]> {
    return MessageService.messagesSubject.asObservable();
  }
}
