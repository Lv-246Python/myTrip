"""Contains url maps."""

from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^login/$', views.login, name='login_view'),
    url(r'^logout/$', views.logout, name='logout_view'),
    url(r'^register/$', views.register, name='register_view'),
    url(r'^facebook_login/$', views.facebook_login, name='facebook_login_view'),
    url(r'^facebook_auth/$', views.facebook_auth, name='facebook_auth_view'),
    url(r'^activation$', views.activation, name='activation_view'),
    url(r'^restore-password/$', views.receive_email, name='receive-email'),
    url(r'^restore-password/(?P<token>[\w\.-]+)/$', views.restore, name='restore-password')
]
