# example/views.py
from datetime import datetime
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Participant
from .serializers import ParticipantSerializer

def index(request):
    context = {
        'current_time': datetime.now()
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