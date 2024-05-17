import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IsRestaurantGuard } from './is-restaurant.guard';
import { AuthService } from '../services/auth.service';

describe('IsRestaurantGuard', () => {
  let guard: IsRestaurantGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Mock services
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isRestaurant',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Set up TestBed
    TestBed.configureTestingModule({
      providers: [
        IsRestaurantGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    // Inject services and guard
    guard = TestBed.inject(IsRestaurantGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow the restaurant user to activate the route', () => {
    // Create dummy arguments for canActivate
    let _: any;
    authService.isRestaurant.and.returnValue(true);

    const result = guard.canActivate(_, _);
    expect(result).toBeTrue();
  });

  it('should not allow the non-restaurant user to activate the route', () => {
    let _: any;
    authService.isRestaurant.and.returnValue(false);

    const result = guard.canActivate(_, _);
    expect(result).toBeFalse();
  });

  it('should navigate to an error or login page if not a restaurant', () => {
    let _: any;
    authService.isRestaurant.and.returnValue(false);
    guard.canActivate(_, _);
    expect(router.navigate).toHaveBeenCalledWith(['ristoratore/login']);
  });
});
