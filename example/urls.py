# example/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from example.views import index, test_frontend, test_direct, validate_fix, ParticipantViewSet, participant_stats, health_check

router = DefaultRouter()
router.register(r'participants', ParticipantViewSet)

urlpatterns = [
    path('', index, name='index'),
    path('health/', health_check, name='health-check'),
    path('test/', test_frontend, name='test-frontend'),
    path('direct/', test_direct, name='test-direct'),
    path('validate/', validate_fix, name='validate-fix'),
    path('api/', include(router.urls)),
    path('api/stats/', participant_stats, name='participant-stats'),
]