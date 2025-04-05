from django.urls import path
from . import views

urlpatterns = [
    path('generate_response/', views.generate_response, name='generate_response'),
]