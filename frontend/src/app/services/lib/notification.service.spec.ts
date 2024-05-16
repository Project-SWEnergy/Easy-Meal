import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { AuthService } from '../auth.service';
import { MessageService } from './message.service';
import axios from '../../../../axios-config';
import MockAdapter from 'axios-mock-adapter';
import { Notification } from '../../interfaces/notification';

describe('NotificationService', () => {
  let service: NotificationService;
  let mockAxios: MockAdapter;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuth', 'logout']);
    mockMessageService = jasmine.createSpyObj('MessageService', [
      'log',
      'error',
    ]);

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: MessageService, useValue: mockMessageService },
      ],
    });
    service = TestBed.inject(NotificationService);
    mockAuthService.isAuth.and.returnValue(true); // Assume user is always authenticated for simplicity
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch notifications and update BehaviorSubject', async () => {
    const notifications = [
      { id: 1, message: 'Test Notification', visualized: false },
    ];
    mockAxios.onGet('notifications').reply(200, {
      result: true,
      data: notifications,
    });

    service['updateMessages'](); // Manually trigger to avoid waiting for interval
    await new Promise((resolve) => setTimeout(resolve, 100)); // wait for promises to resolve

    service.get_all().subscribe((data) => {
      expect(data).toEqual(notifications as Notification[]);
    });
  });

  it('should handle error on notifications fetch', async () => {
    mockAxios.onGet('notifications').reply(200, {
      result: false,
    });

    service['updateMessages'](); // Manually trigger to avoid waiting for interval
    await new Promise((resolve) => setTimeout(resolve, 100)); // wait for promises to resolve

    expect(mockMessageService.error).toHaveBeenCalledWith(
      'Error fetching notifications',
    );
  });

  it('should handle error on notifications fetch', async () => {
    mockAxios.onGet('notifications').reply(401, {
      message: 'Unauthorized',
    });

    service['updateMessages'](); // Manually trigger to avoid waiting for interval
    await new Promise((resolve) => setTimeout(resolve, 100)); // wait for promises to resolve

    expect(mockAuthService.logout).toHaveBeenCalled();
  });

  it('should handle reading a notification correctly', async () => {
    const notificationId = 1;
    mockAxios.onPatch(`notifications/${notificationId}`).reply(200, {
      result: true,
    });

    const result = await service.read(notificationId);

    expect(result).toBeTrue();
    expect(mockMessageService.log).toHaveBeenCalledWith('Notification read');
  });

  it('should handle errors during reading notifications', async () => {
    const notificationId = 1;
    mockAxios
      .onPatch(`notifications/${notificationId}`)
      .reply(200, { result: false });

    const result = await service.read(notificationId);

    expect(result).toBeFalse();
    expect(mockMessageService.error).toHaveBeenCalled();
  });
});
