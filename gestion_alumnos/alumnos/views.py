from django.shortcuts import render
from rest_framework import viewsets
from .models import Alumno
from .serializers import AlumnoSerializer
# Create your views here.


class AlumnoViewSet(viewsets.ModelViewSet):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer
    