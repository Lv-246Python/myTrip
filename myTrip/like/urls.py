from django.conf.urls import url
from .views import LikesCheckpointView, LikesCommentView, LikesPhotoView, LikesTripView

urlpatterns = [
    url(r'^checkpoint/$', LikesCheckpointView.as_view(), name='like_checkpoint'),
    url(r'^checkpoint/(?P<like_id>\d+)/$', LikesCheckpointView.as_view(), name='like_id'),

    url(r'^comment/$', LikesCommentView.as_view(), name='like_view'),
    url(r'^comment/(?P<like_id>\d+)/$', LikesCommentView.as_view(), name='like_id'),

    url(r'^photo/$', LikesPhotoView.as_view(), name='like_photo'),
    url(r'^photo/(?P<like_id>\d+)/$', LikesPhotoView.as_view(), name='like_id'),

    url(r'^trip/$', LikesTripView.as_view(), name='like_trip'),
    url(r'^trip/(?P<like_id>\d+)/$', LikesTripView.as_view(), name='like_id')
]
