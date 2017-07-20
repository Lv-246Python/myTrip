from django.conf.urls import url
from .views import LikesPhotoView

urlpatterns = [url(r'^$', LikesPhotoView.as_view(), name='like_ph'),
               url(r'^(?P<like_id>\d+)/$', LikesPhotoView.as_view(), name='like_ph')]
