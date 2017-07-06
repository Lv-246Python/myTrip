from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$',views.Trip.as_view()),
    url(r'^(?P<id>\w{0,50})/$', views.Trip.as_view()),
]