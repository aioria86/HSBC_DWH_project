from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token  # 👈 agrega esta línea

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('ventas.urls')),
    path('api/auth/', obtain_auth_token),  # 👈 esta línea permite obtener token con POST
]
