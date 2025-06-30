from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from core.models import News, Project, Service, Kontakt
from core.serializers import NewsSerializer, ProjectSerializer, ServiceSerializer, KontaktSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from core.models import CustomUser

class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all().order_by('-created')
    serializer_class = NewsSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class KontaktViewSet(viewsets.ModelViewSet):
    queryset = Kontakt.objects.all()
    serializer_class = KontaktSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        # Rolle bestimmen (z.B. admin, staff, user)
        if user.is_superuser:
            role = 'admin'
        elif user.is_staff:
            role = 'staff'
        else:
            role = 'user'
        data['user'] = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'role': role,
            'avatar': user.avatar.url if user.avatar else None,
            'twofa_enabled': getattr(user, 'twofa_enabled', False),
            'language': getattr(user, 'language', 'de'),
            'notifications_enabled': getattr(user, 'notifications_enabled', True),
            'dark_mode': getattr(user, 'dark_mode', False),
        }
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

login_view = MyTokenObtainPairView.as_view()

@api_view(['GET'])
def profile_view(request):
    return Response({'detail': 'Profile-Endpoint Platzhalter'})

@api_view(['GET'])
def dashboard_view(request):
    return Response({'detail': 'Dashboard-Endpoint Platzhalter'})

@api_view(['POST'])
def register_view(request):
    return Response({'detail': 'Register-Endpoint Platzhalter'})

@api_view(['POST'])
def change_password_view(request):
    return Response({'detail': 'Change Password-Endpoint Platzhalter'})

@api_view(['POST'])
def avatar_upload_view(request):
    return Response({'detail': 'Avatar Upload-Endpoint Platzhalter'})

@api_view(['POST'])
def twofa_view(request):
    return Response({'detail': '2FA-Endpoint Platzhalter'})

@api_view(['GET', 'POST'])
def settings_view(request):
    return Response({'detail': 'Settings-Endpoint Platzhalter'})
