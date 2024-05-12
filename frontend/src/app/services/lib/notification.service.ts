import { Injectable, inject } from '@angular/core';
import { Notification } from '../../interfaces/notification';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import axios from '../../../../axios-config';
import { MessageService } from './message.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  auth = inject(AuthService);

  constructor() {
    this.initExpirationCheck();
  }

  ms = inject(MessageService);
  messages = new BehaviorSubject<Notification[]>([]);
  private checkInterval = 1000;

  private initExpirationCheck(): void {
    timer(0, this.checkInterval).subscribe(() => {
      this.updateMessages();
    });
  }

  private updateMessages(): void {
    if (!this.auth.isAuth()) {
      return;
    }

    axios
      .get('notifications')
      .then((res) => {
        if (res && res.data && res.data.result) {
          this.messages.next(res.data.data);
        } else {
          throw new Error();
        }
      })
      .catch((_) => {
        this.ms.error('Error fetching notifications');
      });
  }

  get_all(): Observable<Notification[]> {
    return this.messages.asObservable();
  }

  async read(notification_id: number): Promise<boolean> {
    return axios
      .patch('notifications/' + notification_id)
      .then((res) => {
        if (res && res.data && res.data.result) {
          this.updateMessages();
          this.ms.log('Notification read');
          return true;
        } else {
          throw new Error()
        }
      })
      .catch((err) => {
        this.ms.error('Error reading notification');
        return false;
      });
  }
}
