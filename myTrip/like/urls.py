from django.conf.urls import url
from .views import LikeView

urlpatterns = [url(r'^$', LikeView.as_view(), name='like_view'),
               url(r'^(?P<like_id>\d+)/$', LikeView.as_view(), name='like_describe')]




               # url(r'^(?P<trip_id>\d+)/(?P<comment_id>\d+)/$', LikeView.as_view(), name='like_describe'),
               # url(r'^(?P<trip_id>\d+)/$', LikeView.post, name='like_describe'),
               # url(r'^(?P<trip_id>\d+)/$', LikeView.get, name='like_describe'),
               # url(r'^(?P<trip_id>\d+)/$', LikeView.delete, name='like_describe')]
