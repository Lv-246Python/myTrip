from django.conf.urls import url
from .views import LikesCheckpointView

urlpatterns = [url(r'^$', LikesCheckpointView.as_view(), name='like_check'),
               url(r'^(?P<like_id>\d+)/$', LikesCheckpointView.as_view(), name='like_ch')]
