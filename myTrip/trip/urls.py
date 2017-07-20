from django.conf.urls import url, include
from .views import TripView

urlpatterns = [
    url(r'^$', TripView.as_view(), name='trip_view'),
    url(r'^(?P<trip_id>\d+)/$', TripView.as_view(), name='trip_describe'),
    url(r'^(?P<trip_id>\d+)/like/', include('like.urls_trip')),
    url(r'^(?P<trip_id>\d+)/checkpoint/', include('checkpoint.urls')),
    url(r'^(?P<trip_id>\d+)/photo/', include('photo.urls')),
    url(r'^(?P<trip_id>\d+)/comment/', include('comment.urls'))
]
