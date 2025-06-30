from django.db import models
from django.contrib.auth.models import AbstractUser

class News(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

class Project(models.Model):
    name = models.CharField(max_length=200)
    applications = models.TextField(blank=True)
    version = models.CharField(max_length=50, blank=True)
    imageUrl = models.URLField(blank=True)
    link = models.URLField(blank=True)
    github = models.URLField(blank=True)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

class Service(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    imageUrl = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    stack = models.CharField(max_length=200, blank=True, null=True)
    buyUrl = models.URLField(blank=True, null=True)
    features = models.TextField(blank=True, null=True)
    discount = models.IntegerField(blank=True, null=True)

class Kontakt(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

class CustomUser(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    twofa_enabled = models.BooleanField(default=False)
    twofa_type = models.CharField(max_length=20, choices=[('email', 'E-Mail'), ('google', 'Google')], null=True, blank=True)
    language = models.CharField(max_length=10, default='de')
    notifications_enabled = models.BooleanField(default=True)
    dark_mode = models.BooleanField(default=False)
    # weitere Felder nach Bedarf

# Stelle sicher, dass du in settings.py folgendes ergänzt:
# AUTH_USER_MODEL = 'core.CustomUser'