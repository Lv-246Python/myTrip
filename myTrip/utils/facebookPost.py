"""Module handle post's on facebook."""
import ast
import requests
from django.http import HttpResponse

from trip.models import Trip

def get_fb_token(app_id, app_secret):
    """Getting facebook app_token."""
    payload = {'grant_type': 'client_credentials', 'client_id': app_id, 'client_secret': app_secret}
    request = requests.post('https://graph.facebook.com/oauth/access_token?', params=payload)
    token = ast.literal_eval(request.text).get("access_token")
    return token
