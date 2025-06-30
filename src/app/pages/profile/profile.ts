import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DarkModeService } from '../../services/dark-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit, OnDestroy {
  user: any = {
    id: null,
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    avatar_url: '',
    address: '', // NEU
    // ggf. weitere Felder wie bio, phone etc.
  };
  showPasswordModal = false;
  show2FAModal = false;
  showAvatarModal = false;
  showEditProfileModal = false;
  newPassword = '';
  confirmPassword = '';
  twoFAType: 'email' | 'google' | null = null;
  avatarFile: File | null = null;
  avatarPreview: string | null = null;
  darkMode: boolean = false;
  private darkModeSub?: Subscription;

  editFirstName = '';
  editLastName = '';
  editEmail = '';
  editAddress = '';

  constructor(private authService: AuthService, public darkModeService: DarkModeService) {}

  ngOnInit() {
    this.loadUser();
    this.darkModeSub = this.darkModeService.darkMode$.subscribe(mode => {
      this.darkMode = mode;
    });
  }

  ngOnDestroy() {
    this.darkModeSub?.unsubscribe();
  }

  loadUser() {
    this.user = this.authService.getCurrentUser();
  }

  openPasswordModal() {
    this.showPasswordModal = true;
  }
  closePasswordModal() {
    this.showPasswordModal = false;
    this.newPassword = '';
    this.confirmPassword = '';
  }
  changePassword() {
    // Hier Backend-Call für Passwort-Änderung
    this.closePasswordModal();
  }

  open2FAModal() {
    this.show2FAModal = true;
  }
  close2FAModal() {
    this.show2FAModal = false;
    this.twoFAType = null;
  }
  enable2FA() {
    // Hier Backend-Call für 2FA-Aktivierung
    this.close2FAModal();
  }

  openAvatarModal() {
    this.showAvatarModal = true;
  }
  closeAvatarModal() {
    this.showAvatarModal = false;
    this.avatarFile = null;
    this.avatarPreview = null;
  }
  onAvatarSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatarFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => this.avatarPreview = e.target.result;
      reader.readAsDataURL(file);
    }
  }
  uploadAvatar() {
    // Hier Backend-Call für Avatar-Upload
    this.closeAvatarModal();
  }

  openEditProfileModal() {
    this.editFirstName = this.user.first_name;
    this.editLastName = this.user.last_name;
    this.editEmail = this.user.email;
    this.editAddress = this.user.address || '';
    this.showEditProfileModal = true;
  }
  closeEditProfileModal() {
    this.showEditProfileModal = false;
  }
  saveProfileEdit() {
    // Hier würdest du einen Backend-Call machen, z.B. this.authService.updateProfile(...)
    this.user.first_name = this.editFirstName;
    this.user.last_name = this.editLastName;
    this.user.email = this.editEmail;
    this.user.address = this.editAddress;
    this.showEditProfileModal = false;
    // Optional: Backend-Update und ggf. Feedback anzeigen
  }

  toggleDarkMode() {
    this.darkModeService.setDarkMode(this.darkMode);
  }
}
