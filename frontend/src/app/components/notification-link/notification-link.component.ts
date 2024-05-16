import { Component, Input, inject } from '@angular/core';
import { NotificationService } from '../../services/lib/notification.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notification-link',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './notification-link.component.html',
  styleUrl: './notification-link.component.css',
})
export class NotificationLinkComponent {
  @Input() notification_link: string;

  unread_count = 0;
  notification_service = inject(NotificationService);

  ngOnInit(): void {
    this.notification_service.get_all().subscribe((notifications) => {
      this.unread_count = notifications.filter((n) => !n.visualized).length;
    });
  }
}
