import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AsyncPipe } from '@angular/common';
import { DarkModeService } from './services/dark-mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isLoggedIn$;
  constructor(public authService: AuthService, public darkModeService: DarkModeService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    // Setze dark-mode-Klasse nur initial, ohne erneut setDarkMode aufzurufen
    if (this.darkModeService.getDarkMode()) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}