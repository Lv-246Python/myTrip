"""Contains url maps."""

from django.conf.urls import url
from .views import login, auth, logout, register


urlpatterns = [
    url(r'^$', auth, name='auth'),
    url(r'^login/$', login, name='login'),
    url(r'^logout/$', logout, name='logout'),
    url(r'^register/$', register, name='register'),

]
