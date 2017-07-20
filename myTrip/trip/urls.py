from django.conf.urls import url, include
from . import views
import checkpoint.urls as checkpoint_urls

urlpatterns = [
    url(r'^$', views.TripView.as_view()),
    url(r'^(?P<trip_id>\d+)/$', views.TripView.as_view()),
    url(r'^(?P<trip_id>\d+)/checkpoint/', include('checkpoint.urls')),
    url(r'^(?P<trip_id>\d+)/photo/', include('photo.urls')),
    url(r'^(?P<trip_id>\d+)/comment/', include('comment.urls')),

]
