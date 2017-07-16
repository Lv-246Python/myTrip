from django.conf.urls import url, include
from .views import PhotoView

urlpatterns = [
    url(r'^$', PhotoView.as_view(), name='photos'),
    url(r'^(?P<photo_id>\d+)/$', PhotoView.as_view(), name='photo'),
    url(r'^(?P<photo_id>\d+)/like/', include('like.urls'))
]
