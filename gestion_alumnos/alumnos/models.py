from django.db import models

# Create your models here.
class Alumno(models.Model):
    nombre = models.CharField(max_length=100)
    numero_documento = models.CharField(max_length=20, unique=True)
    nota1 = models.DecimalField(max_digits=5, decimal_places=2)
    nota2 = models.DecimalField(max_digits=5, decimal_places=2)
    nota3 = models.DecimalField(max_digits=5, decimal_places=2)

    def promedio(self):
        return (self.nota1 + self.nota2 + self.nota3) / 3
    
    def __str__(self):
        return self.nombre
    
    class Meta:
        db_table = 'alumnos'
    