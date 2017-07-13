from django.conf.urls import url
from .views import CommentView
urlpatterns = [
    url(r'^$', CommentView.as_view(), name='comment_view'),
    url(r'^(?P<trip_id>\d+)/(?P<comment_id>\d+)/$', CommentView.as_view(), name='comment_describe'),

]
