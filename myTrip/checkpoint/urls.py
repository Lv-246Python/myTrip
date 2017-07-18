from django.conf.urls import url, include

from .views import CheckpointView

urlpatterns = [
    url(r'^$', CheckpointView.as_view(), name='checkpoint_view'),
    url(r'^(?P<checkpoint_id>\d+)/$', CheckpointView.as_view(), name='checkpoint_describe'),
    url(r'^(?P<checkpoint_id>\d+)/photo/', include('photo.urls')),
    url(r'^(?P<checkpoint_id>\d+)/comment/', include('comment.urls')),

]
