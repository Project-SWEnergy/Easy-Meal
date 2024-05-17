import { Component, inject } from '@angular/core';
import { NotificationService } from '../../services/lib/notification.service';
import { Subscription } from 'rxjs';
import { Notification } from '../../interfaces/notification';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatButtonToggleModule],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.css',
})
export class NotificationPageComponent {
  notifications: Notification[] = [];
  filtered_notifications: Notification[] = [];
  notification_service = inject(NotificationService);
  subscription: Subscription;

  notificationType: 'read' | 'unread' = 'unread';

  ngOnInit(): void {
    this.subscription = this.notification_service
      .get_all()
      .subscribe((notifications) => {
        this.notifications = notifications;
        this.onTypeChange();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onTypeChange(): void {
    if (this.notificationType === 'read') {
      this.filtered_notifications = this.notifications.filter(
        (n) => n.visualized,
      );
    } else {
      this.filtered_notifications = this.notifications.filter(
        (n) => !n.visualized,
      );
      this.filtered_notifications = this.filtered_notifications.reverse();
    }
  }

  read_notification(notification_id: number): void {
    this.notification_service.read(notification_id);
  }
}
