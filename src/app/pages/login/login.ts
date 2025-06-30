import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, LoginRequest } from '../../services/auth.service';
// import AuthService from '../../services/auth.service'; // Uncomment and adjust if AuthService is a default export

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Entfernt: Automatische Weiterleitung bei isAuthenticated
    // Formular initialisieren
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  /**
   * Login Submit Handler
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.error = '';

      const credentials: LoginRequest = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.isLoading = false;
          // User-Daten sind bereits im Login-Response enthalten und gespeichert
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.isLoading = false;
          this.error = 'Login fehlgeschlagen.';
        }
      });
    } else {
      // Formular ungültig - Fehler anzeigen
      this.markFormGroupTouched();
    }
  }

  /**
   * Markiert alle Formular-Felder als berührt (für Validierung)
   */
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Hilfsfunktion für Template - prüft ob Feld Fehler hat
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.hasError(errorType) && field.touched);
  }

  /**
   * Hilfsfunktion für Template - gibt Fehlermeldung zurück
   */
  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${fieldName === 'username' ? 'Benutzername' : 'Passwort'} ist erforderlich`;
    }
    
    if (field?.hasError('minlength')) {
      return 'Passwort muss mindestens 6 Zeichen haben';
    }
    
    return '';
  }
}
