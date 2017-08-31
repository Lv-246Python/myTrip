from django.conf.urls import url, include
from .views import ProfileView

urlpatterns = [
    url(r'^$', ProfileView.as_view(), name='profile'),
    url(r'^(?P<user_id>\d+)$', ProfileView.as_view(), name='profile_by_id')
]
