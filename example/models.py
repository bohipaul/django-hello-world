from django.db import models
from django.core.validators import EmailValidator
from django.utils import timezone

class Participant(models.Model):
    """Modèle pour stocker les informations des participants"""
    
    nom = models.CharField(max_length=100, verbose_name="Nom")
    prenom = models.CharField(max_length=100, verbose_name="Prénom")
    email = models.EmailField(
        unique=True, 
        validators=[EmailValidator()],
        verbose_name="Email"
    )
    telephone = models.CharField(
        max_length=20, 
        blank=True, 
        null=True,
        verbose_name="Téléphone"
    )
    entreprise = models.CharField(
        max_length=200, 
        blank=True, 
        null=True,
        verbose_name="Entreprise"
    )
    poste = models.CharField(
        max_length=100, 
        blank=True, 
        null=True,
        verbose_name="Poste"
    )
    date_inscription = models.DateTimeField(
        default=timezone.now,
        verbose_name="Date d'inscription"
    )
    actif = models.BooleanField(default=True, verbose_name="Actif")
    
    class Meta:
        verbose_name = "Participant"
        verbose_name_plural = "Participants"
        ordering = ['-date_inscription']
    
    def __str__(self):
        return f"{self.prenom} {self.nom} ({self.email})"
    
    @property
    def nom_complet(self):
        return f"{self.prenom} {self.nom}"