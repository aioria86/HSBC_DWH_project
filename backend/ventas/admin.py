from django.contrib import admin
from .models import Cliente, Producto, Tiempo, Venta

admin.site.register(Cliente)
admin.site.register(Producto)
admin.site.register(Tiempo)
admin.site.register(Venta)
