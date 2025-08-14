# example/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from example.views import index, test_frontend, ParticipantViewSet, participant_stats

router = DefaultRouter()
router.register(r'participants', ParticipantViewSet)

urlpatterns = [
    path('', index, name='index'),
    path('test/', test_frontend, name='test-frontend'),
    path('api/', include(router.urls)),
    path('api/stats/', participant_stats, name='participant-stats'),
]