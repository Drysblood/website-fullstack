from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import CustomUser
from .serializers import (
    ProfileSerializer, ChangePasswordSerializer, AvatarUploadSerializer,
    TwoFASerializer, SettingsSerializer
)

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if not user.check_password(serializer.validated_data['old_password']):
            return Response({'old_password': 'Falsches Passwort!'}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({'detail': 'Passwort geändert.'})

class AvatarUploadView(generics.UpdateAPIView):
    serializer_class = AvatarUploadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class TwoFAView(generics.UpdateAPIView):
    serializer_class = TwoFASerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user.twofa_enabled = serializer.validated_data['enabled']
        user.twofa_type = serializer.validated_data['twofa_type']
        user.save()
        return Response({'detail': '2FA aktualisiert.'})

class SettingsView(generics.UpdateAPIView):
    serializer_class = SettingsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class DeleteAccountView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response({'detail': 'Account gelöscht.'}, status=status.HTTP_204_NO_CONTENT)