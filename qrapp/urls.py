from . import views
from django.urls import path

urlpatterns = (
    path('', views.index, name='home'),
    path('info', views.info, name='info'),
    path('error', views.error, name='error'),
    path('result', views.result, name='result'),
    path('printinfo', views.printinfo, name='printinfo'),
    path('getDataPhoto', views.getDataPhoto, name='getDataPhoto'),
)
