from django.conf.urls import url, include

from .views import activation

urlpatterns = [
    url(r'^$', activation, name='activation_view'),
]
