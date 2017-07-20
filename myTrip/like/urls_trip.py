from django.conf.urls import url
from .views import LikesTripView

urlpatterns = [url(r'^$', LikesTripView.as_view(), name='like_tr'),
               url(r'^(?P<like_id>\d+)/$', LikesTripView.as_view(), name='like_tr')]
