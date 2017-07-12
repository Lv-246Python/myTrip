from django.conf.urls import url
from .views import PhotoView

urlpatterns = [
    url(r'^$', PhotoView.as_view(), name='photos'),
    url(r'^(?P<photo_id>\d+)/$', PhotoView.as_view(), name='photo'),
]
