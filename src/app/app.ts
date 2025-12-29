import { Component, signal, effect } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from "./core/layout/navbar/navbar";
import { Footer } from "./core/layout/footer/footer";
import { AuthService } from './core/services/auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isLoggedIn = signal(false);
  
  // Routes that should NOT show navbar/footer
  private readonly publicRoutes = ['/login'];

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    // Check auth immediately on init
    this.checkAuthStatus();
    
    // Listen to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkAuthStatus();
    });
  }

  private checkAuthStatus(): void {
    const currentRoute = this.router.url;
    const isPublicRoute = this.publicRoutes.some(route => 
      currentRoute.includes(route)
    );
    
    // If it's a public route, don't show navbar/footer
    if (isPublicRoute) {
      this.isLoggedIn.set(false);
    } else {
      this.isLoggedIn.set(this.auth.isLoggedIn());
    }
  }
}