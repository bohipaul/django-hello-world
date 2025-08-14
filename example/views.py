# example/views.py
from datetime import datetime
from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Participant
from .serializers import ParticipantSerializer
import os

def test_frontend(request):
    """Vue de test pour diagnostiquer le frontend"""
    test_file = os.path.join(settings.BASE_DIR, 'test-frontend.html')
    with open(test_file, 'r', encoding='utf-8') as f:
        return HttpResponse(f.read(), content_type='text/html')

def index(request):
    # Vérifier si l'application frontend (dist) existe
    static_index = os.path.join(settings.BASE_DIR, 'static', 'index.html')
    
    if os.path.exists(static_index):
        # Servir l'application frontend
        with open(static_index, 'r', encoding='utf-8') as f:
            return HttpResponse(f.read(), content_type='text/html')
    else:
        # Fallback vers le template Django traditionnel
        participants = Participant.objects.filter(actif=True).order_by('-date_inscription')
        context = {
            'current_time': datetime.now(),
            'participants': participants
        }
        return render(request, 'example/index.html', context)

class ParticipantViewSet(viewsets.ModelViewSet):
    """ViewSet pour gérer les opérations CRUD sur les participants"""
    
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    
    def get_queryset(self):
        queryset = Participant.objects.all()
        actif = self.request.query_params.get('actif')
        if actif is not None:
            queryset = queryset.filter(actif=actif.lower() == 'true')
        return queryset

@api_view(['GET'])
def participant_stats(request):
    """Endpoint pour obtenir des statistiques sur les participants"""
    total = Participant.objects.count()
    actifs = Participant.objects.filter(actif=True).count()
    
    return Response({
        'total': total,
        'actifs': actifs,
        'inactifs': total - actifs
    })