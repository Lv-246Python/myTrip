from django.conf.urls import url
from .views import CheckpointView

urlpatterns = [
    url(r'^$', CheckpointView.as_view(), name='checkpoint_view'),
    url(r'^(?P<checkpoint_id>\d+)/$', CheckpointView.as_view(), name='checkpoint_describe'),

]
