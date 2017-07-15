"""Contains url maps."""

from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^login/$', views.login, name='login_view'),
    url(r'^logout/$', views.logout, name='logout_view'),
    url(r'^register/$', views.register, name='register_view'),

]
