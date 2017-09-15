"""Module handle post's on facebook."""
import ast
import facebook
import requests
from django.http import HttpResponse

from trip.models import Trip


def postOnFacebook(request, trip_id):
    """Post on user's facebook wall using GraphAPI."""
    trip = Trip.get_by_id(trip_id)
    data = trip.to_dict()
    url = "http://triptrck.com:8000/trip/{}".format(trip_id)
    message = "Check this out!"
    access_token = request.COOKIES.get('facebook-token')
    if not access_token:
        return HttpResponse('login with facebook first', status=403)
    client = facebook.GraphAPI(access_token)
    client.put_object(
        request.user.facebook_id,
        "feed",
        message=message,
        link=url,
        name=data.get('title'),
        description=data.get('description')
        )
    return HttpResponse(status=200)


def get_fb_token(app_id, app_secret):
    """Getting facebook app_token."""
    payload = {'grant_type': 'client_credentials', 'client_id': app_id, 'client_secret': app_secret}
    request = requests.post('https://graph.facebook.com/oauth/access_token?', params=payload)
    token = ast.literal_eval(request.text).get("access_token")
    return token
