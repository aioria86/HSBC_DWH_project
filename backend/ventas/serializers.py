from rest_framework import serializers
from .models import Cliente, Producto, Tiempo, Venta

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['id', 'nombre', 'segmento']

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'categoria']

class TiempoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tiempo
        fields = ['id', 'fecha', 'mes', 'año']

class VentaSerializer(serializers.ModelSerializer):
    cliente = ClienteSerializer()
    producto = ProductoSerializer()
    tiempo = TiempoSerializer()

    class Meta:
        model = Venta
        fields = ['id', 'cantidad', 'total', 'cliente', 'producto', 'tiempo']
