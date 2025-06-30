from rest_framework import serializers
from .models import News, Project, Service, Kontakt
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class KontaktSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kontakt
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 'avatar',
            'twofa_enabled', 'twofa_type', 'language', 'notifications_enabled', 'dark_mode'
        ]

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])

class AvatarUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['avatar']

class TwoFASerializer(serializers.Serializer):
    enabled = serializers.BooleanField()
    twofa_type = serializers.ChoiceField(choices=[('email', 'E-Mail'), ('google', 'Google')])

class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['language', 'notifications_enabled', 'dark_mode']