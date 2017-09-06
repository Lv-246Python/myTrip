from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^$', views.TripView.as_view()),
    url(r'^(?P<trip_id>\d+)/$', views.TripView.as_view()),
    url(r'^(?P<trip_id>\d+)/checkpoint/', include('checkpoint.urls')),
    url(r'^(?P<trip_id>\d+)/photo/', include('photo.urls')),
    url(r'^(?P<trip_id>\d+)/comment/', include('comment.urls')),
    url(r'^(?P<trip_id>\d+)/like/', include('like.urls')),
    url(r'^(?P<trip_id>\d+)/subscribe/', include('subscribe.urls'))
]
