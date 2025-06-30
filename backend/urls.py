"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include
from backend import views
from rest_framework.routers import DefaultRouter
from backend.views import NewsViewSet, ProjectViewSet, ServiceViewSet, KontaktViewSet

router = DefaultRouter()
router.register(r'news', NewsViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'service', ServiceViewSet)
router.register(r'kontakt', KontaktViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', views.login_view),
    path('api/profile/', views.profile_view),
    path('api/dashboard/', views.dashboard_view),
    path('api/', include(router.urls)),
]
urlpatterns += [
    path('api/auth/', include('rest_framework.urls')),
    path('api/register/', views.register_view),
    path('api/change-password/', views.change_password_view),
    path('api/avatar-upload/', views.avatar_upload_view),
    path('api/twofa/', views.twofa_view),
    path('api/settings/', views.settings_view),
]

