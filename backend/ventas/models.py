from django.db import models

class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    segmento = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.nombre} ({self.segmento})"

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.nombre} - {self.categoria}"

class Tiempo(models.Model):
    fecha = models.DateField()
    mes = models.IntegerField()
    año = models.IntegerField()

    def __str__(self):
        return f"{self.fecha.strftime('%d/%m/%Y')}"

class Venta(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    tiempo = models.ForeignKey(Tiempo, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    total = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.cliente.nombre} compró {self.cantidad} de {self.producto.nombre} por {self.total}€"
