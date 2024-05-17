import { Component, inject } from '@angular/core';
import { MessageService } from '../../services/lib/message.service';

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

  ngOnInit(): void {
    this.message_service.notify().subscribe((messages) => {
      this.messages = messages;
    });
  }
}
