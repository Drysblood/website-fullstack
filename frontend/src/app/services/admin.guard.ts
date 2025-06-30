import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Beispiel: Prüfe, ob User eingeloggt und Admin ist
  if (authService.isAuthenticated() && authService.getCurrentUser()?.role === 'admin') {
    return true;
  }
  router.navigate(['/login']);
  return false;
};