import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationLinkComponent } from './notification-link.component';
import { NotificationService } from '../../services/lib/notification.service';
import { of } from 'rxjs';
import { Notification } from '../../interfaces/notification';
import { provideRouter } from '@angular/router';

describe('NotificationLinkComponent', () => {
  let component: NotificationLinkComponent;
  let fixture: ComponentFixture<NotificationLinkComponent>;
  let mockNotificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    // Create a spy object for NotificationService with a mock 'get_all' method
    mockNotificationService = jasmine.createSpyObj('NotificationService', ['get_all']);
    const notifications = [
      { id: 1, visualized: false },
      { id: 2, visualized: false },
      { id: 3, visualized: true }
    ] as Notification[];
    mockNotificationService.get_all.and.returnValue(of(notifications));

    await TestBed.configureTestingModule({
      imports: [NotificationLinkComponent],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers initial data binding and ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct unread notifications count', () => {
    expect(component.unread_count).toEqual(2); // Expect 2 unread notifications
  });

  it('should update unread count based on notification service data', () => {
    // Simulate a change in notification data
    const updatedNotifications = [
      { id: 1, visualized: true },
      { id: 2, visualized: false },
      { id: 3, visualized: true }
    ] as Notification[];
    mockNotificationService.get_all.and.returnValue(of(updatedNotifications));
    component.ngOnInit(); // Re-initialize to fetch new notification data
    fixture.detectChanges();

    expect(component.unread_count).toEqual(1); // Now only 1 unread notification
  });
});
