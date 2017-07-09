from django.conf.urls import url
from .views import LikeView

urlpatterns = [url(r'^$', LikeView.as_view(), name='like_view'),
               url(r'^(?P<like_id>LikeView\d+)/$', LikeView.as_view(), name='like_describe')]
