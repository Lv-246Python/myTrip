"""myTrip URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
<<<<<<< e7864a61d4a9eb231462cbbc89928f3e141e85c3

from django.conf.urls import url, include

urlpatterns = [
    url(r'^api/v1/comment/', include('comment.urls')),
=======
from django.conf.urls import url,include

urlpatterns = [
>>>>>>> edit urls
    url(r'^trip/', include('create_trip.urls')),
]
