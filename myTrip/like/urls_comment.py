from django.conf.urls import url
from .views import LikesCommentView

urlpatterns = [url(r'^$', LikesCommentView.as_view(), name='like_com'),
               url(r'^(?P<like_id>\d+)/$', LikesCommentView.as_view(), name='like_co')]
