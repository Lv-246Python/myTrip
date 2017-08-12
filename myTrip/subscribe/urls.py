from django.conf.urls import url

from .views import SubscribeView

urlpatterns = [
    url(r'^$', SubscribeView.as_view()),
    url(r'^(?P<subscribe_id>\d+)/$', SubscribeView.as_view())
]
