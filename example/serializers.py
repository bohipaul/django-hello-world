from rest_framework import serializers
from .models import Participant

class ParticipantSerializer(serializers.ModelSerializer):
    """Serializer pour le modèle Participant"""
    
    nom_complet = serializers.ReadOnlyField()
    
    class Meta:
        model = Participant
        fields = [
            'id',
            'nom',
            'prenom', 
            'email',
            'telephone',
            'entreprise',
            'poste',
            'date_inscription',
            'actif',
            'nom_complet'
        ]
        read_only_fields = ['id', 'date_inscription']
    
    def validate_email(self, value):
        """Validation personnalisée pour l'email"""
        if self.instance and self.instance.email == value:
            return value
        
        if Participant.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Un participant avec cet email existe déjà."
            )
        return value