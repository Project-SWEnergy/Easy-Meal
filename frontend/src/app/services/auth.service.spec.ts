import { TestBed } from '@angular/core/testing';
import axios from '../../../axios-config';
import { AuthService } from './auth.service';
import { MessageService } from './lib/message.service';
import MockAdapter from 'axios-mock-adapter';
import { User } from '../interfaces/authentication';

describe('AuthService', () => {
  let service: AuthService;
  let mockAxios: MockAdapter;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    // Setup TestBed
    mockMessageService = jasmine.createSpyObj('MessageService', ['error', 'log']);
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });
    service = TestBed.inject(AuthService);
    mockAxios = new MockAdapter(axios);

    // Spy on localStorage
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'removeItem');
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('isAuth', () => {
    it('should return true if user is authenticated', () => {
      spyOn(localStorage, 'getItem').and.callFake((key: string) => {
        switch (key) {
          case 'token':
            return JSON.stringify({ id: 1, role: 'user' }); // Example token data
          default:
            return null;
        }
      });
      expect(service.isAuth()).toBeTrue();
    });

    it('should return false if token is not set', () => {
      spyOn(localStorage, 'getItem').and.callFake((key: string) => null);
      expect(service.isAuth()).toBeFalse();
    });
  });

  describe('auth', () => {
    it('should authenticate user and store token', async () => {
      const userData: User = { id: 1, role: 'user' };
      mockAxios.onGet('authentication/setup').reply(200, { result: true, data: [userData] });

      await service.auth();

      expect(localStorage.setItem).toHaveBeenCalledWith('token', JSON.stringify(userData))
      expect(mockMessageService.error).not.toHaveBeenCalled();
    });

    it('should handle authentication errors', async () => {
      mockAxios.onGet('authentication/setup').reply(200, { result: false });

      await service.auth();

      expect(mockMessageService.error).toHaveBeenCalledWith('User not authenticated');
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should clear token on logout', async () => {
      mockAxios.onPost('authentication/signout').reply(200, { message: 'Logout successful' });

      await service.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(mockMessageService.log).toHaveBeenCalledWith('Logout successful');
    });

    it('should handle logout errors', async () => {
      mockAxios.onPost('authentication/signout').reply(200, { result: false });

      await service.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(mockMessageService.error).toHaveBeenCalledWith('Error during logout');
    });
  });

  it('should return true if user is a restaurant', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return JSON.stringify({ id: 1, role: 'restaurant' })
    });
    expect(service.isRestaurant()).toBeTrue();
  });

  it('should return true if user is a user', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return JSON.stringify({ id: 1, role: 'user' })
    });
    expect(service.isUser()).toBeTrue();
  });

  it('should delete token if does not implement User interface', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return JSON.stringify({ id: 1, role: 'invalid' })
    });

    expect(service.get()).toBeNull();
  });
});
