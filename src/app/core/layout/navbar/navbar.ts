import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  isMenuOpen = false;
  isScrolled = false;
  isNavbarHidden = false;
  userName: string = '';
  isLoggedIn = false;

  private lastScrollTop = 0;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  private extractUserName(email: string): string {
  return email.split('@')[0];
}


  ngOnInit(): void {
    this.loadUserInfo();
  }

loadUserInfo(): void {
  const currentUser = this.authService.getCurrentUser();

  if (currentUser?.email) {
    this.userName = this.extractUserName(currentUser.email);
    this.isLoggedIn = true;
  }
}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 50;

    // Hide/show navbar on scroll
    if (scrollTop > this.lastScrollTop && scrollTop > 100) {
      this.isNavbarHidden = true;
    } else {
      this.isNavbarHidden = false;
    }
    this.lastScrollTop = scrollTop;
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userName = 'Guest';
    this.router.navigate(['/login']);
  }
}