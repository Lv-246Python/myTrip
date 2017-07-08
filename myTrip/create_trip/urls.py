from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$',views.TripView.as_view()),
    url(r'^(?P<trip_id>\w{0,50})/$', views.TripView.as_view()),
]