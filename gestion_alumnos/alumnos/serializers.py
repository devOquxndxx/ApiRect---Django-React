from rest_framework import serializers
from .models import Alumno

class AlumnoSerializer(serializers.ModelSerializer):
    promedio = serializers.SerializerMethodField()
    
    class Meta:
        model = Alumno
        fields = ['id', 'nombre', 'numero_documento', 'nota1', 'nota2', 'nota3', 'promedio']
        
        
    def get_promedio(self, obj):
        return obj.promedio()