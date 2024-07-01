import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './route.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      isAuthenticated: false // Default value
    });

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
  });

  function setAuthState(isAuthenticated: boolean) {
    Object.defineProperty(authService, 'isAuthenticated', {
      get: () => isAuthenticated,
      configurable: true
    });
  }

  it('should allow the authenticated user to access', () => {
    setAuthState(true);

    expect(authGuard.canActivate()).toBe(true);
  });

  it('should not allow the unauthenticated user to access and redirect to login', () => {
    setAuthState(false);

    expect(authGuard.canActivate()).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
