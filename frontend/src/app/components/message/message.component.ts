import { Component, inject } from '@angular/core';
import { MessageService } from '../../services/lib/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent {
  messages: { message: string; type: 'log' | 'error' }[];
  message_service = inject(MessageService);
  subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.message_service.notify().subscribe((messages) => {
      this.messages = messages;
    });
  }
}
