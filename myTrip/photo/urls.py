from django.conf.urls import url
from .views import PhotoView
urlpatterns = [
    url(r'^$', PhotoView.as_view(), name='photo'),
    url(r'^(?P<photo_id>\d+)/$', PhotoView.as_view(), name='photo_id'),
]
