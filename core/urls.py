from django.urls import path
from .views import (
    ProfileView, ChangePasswordView, AvatarUploadView,
    TwoFAView, SettingsView, DeleteAccountView
)

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('profile/avatar/', AvatarUploadView.as_view(), name='avatar-upload'),
    path('profile/2fa/', TwoFAView.as_view(), name='twofa'),
    path('profile/settings/', SettingsView.as_view(), name='settings'),
    path('profile/delete/', DeleteAccountView.as_view(), name='delete-account'),
]