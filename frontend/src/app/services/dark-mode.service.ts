import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(this.getInitialMode());
  darkMode$ = this.darkModeSubject.asObservable();

  private getInitialMode(): boolean {
    return localStorage.getItem('darkMode') === 'true';
  }

  setDarkMode(enabled: boolean) {
    this.darkModeSubject.next(enabled);
    if (enabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', enabled ? 'true' : 'false');
  }

  toggleDarkMode() {
    this.setDarkMode(!this.darkModeSubject.value);
  }

  getDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}
