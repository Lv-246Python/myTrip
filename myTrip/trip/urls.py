from django.conf.urls import url
from .views import TripView

urlpatterns = [
    url(r'^$', TripView.as_view(), name='trip_view'),
    url(r'^(?P<trip_id>\d+)/$', TripView.as_view(), name='trip_describe')
]
