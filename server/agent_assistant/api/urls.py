from django.conf.urls import include, url
from django.contrib import admin
from django.urls import reverse_lazy

from . import views

app_name= 'api'


urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^say-hi', views.say_hi, name='say_hi')
]
