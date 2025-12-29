import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../../browser/TokenServices';
import { LoginRequest, LoginResponse } from '../../models/Login';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  // Mock login - accepts ANY email/password
  login(credentials: LoginRequest): Observable<LoginResponse> {
    // Simulate API delay
    return of(null).pipe(
      delay(500),
      // Return success for any credentials
      // You can also validate against mockUsers if needed
      switchMap(() => {
        const mockToken = this.generateMockToken(credentials.email);
        const response: LoginResponse = {
          accessToken: mockToken,
          user: {
            email: credentials.email,
            name: credentials.email.split('@')[0]
          }
        };
        
        // Save to localStorage
        this.tokenService.setAccessToken(response.accessToken);
        this.tokenService.setUser(response.user);
        
        return of(response);
      })
    );
  }

  // Mock logout
  logout(): void {
    this.tokenService.clearAccessToken();
    this.router.navigate(['/login']);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }

  // Get current user
  getCurrentUser(): any {
    return this.tokenService.getUser();
  }

  // Generate fake JWT-like token
  private generateMockToken(email: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      email, 
      iat: Date.now(),
      exp: Date.now() + 3600000 
    }));
    const signature = btoa('mock-signature');
    return `${header}.${payload}.${signature}`;
  }
}