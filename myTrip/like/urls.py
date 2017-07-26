from django.conf.urls import url
from .views import LikeView

urlpatterns = [url(r'^$', LikeView.as_view(), name='likes'),
               url(r'^(?P<like_id>\d+)/$', LikeView.as_view(), name='like_id')]
