"""Contains views for registration app."""

import urllib
from json import loads

from django.shortcuts import redirect
from django.contrib import auth
from mytrip.settings import FACEBOOK_APP_ID as CLIENT_ID, FACEBOOK_API_SECRET as CLIENT_SECRET

from .models import CustomUser
from .helper import *

FACEBOOK_TOKEN_URL = ("https://graph.facebook.com/v2.10/oauth/access_token?"
                      "client_id={client_id}&redirect_uri={redirect_uri}&"
                      "client_secret={client_secret}&code={code}")
FACEBOOK_USER_URL = 'https://graph.facebook.com/me?access_token={token}'
FACEBOOK_REDIRECT_URL = 'http://triptrck.com/api/v1/auth/facebook_login/'
FACEBOOK_AUTH_URL = ('https://www.facebook.com/v2.10/dialog/oauth?'
                     'client_id={client_id}&redirect_uri={redirect_uri}')


def register(request):
    """
    Registration method for CustomUser registration.
    Args:
        request: http request.
    Returns:
        If new user gets successfully registered - returns HttpResponse(201).
        If not - returns HttpResponse(400).
    """

    if request.method == 'POST':
        data = loads(request.body.decode('utf-8'))
        email = data.get("email").lower()
        password = data.get("password")
        first_name = data.get("first_name")
        last_name = data.get("last_name")

        if not email or not password:
            return response_400_required

        if not CustomUser.email_validation(email):
            return response_400_invalid_format

        if CustomUser.get_by_email(email):
            return response_400_already_registered

        CustomUser.create(email=email, password=password,
                          first_name=first_name, last_name=last_name)
        return response_201_successfully_created


def login(request):
    """
    Login method for auth.
    Args:
        request: http request.
    Returns:
        If CustomUser gets successfully logged in - returns HttpResponse(200).
        If not - returns HttpResponse(400).
    """

    if request.method == 'POST':
        data = loads(request.body.decode('utf-8'))
        email = data.get("email").lower()
        password = data.get("password")

        user = auth.authenticate(username=email, password=password)
        if user:
            auth.login(request, user)
            response = response_200_login_successful
            response.set_cookie('user_id', user.id)
            return response
        return response_403_invalid_credentials


def logout(request):
    """
    Logout method for auth.
    Args:
        request: http request.
    Returns:
        If CustomUser gets successfully logged out - returns HttpResponse(200).
        If not - returns HttpResponse(400).
    """

    if request.method == 'GET':
        if request.user.is_authenticated:
            auth.logout(request)
            return response_200_logout_successful
        return response_400_not_logged_in


def facebook_auth(request):
    """
    Provides Facebook authentication.
    Args:
        request: http request.
    Returns:
        Redirect to Facebook login page
    """
    link = FACEBOOK_AUTH_URL.format(client_id=CLIENT_ID, redirect_uri=FACEBOOK_REDIRECT_URL)
    return redirect(link)


def facebook_login(request):
    """
        Provides Facebook user access.
        Args:
            request: http request with Facebook code.
        Returns:
            Redirect to home page
        """

    code = request.GET['code']
    link = FACEBOOK_TOKEN_URL.format(
        client_id=CLIENT_ID,
        redirect_uri=FACEBOOK_REDIRECT_URL,
        client_secret=CLIENT_SECRET,
        code=code)
    token_request = urllib.request.urlopen(link)
    token = loads(token_request.read().decode('utf-8')).get('access_token')
    user_request = urllib.request.urlopen(FACEBOOK_USER_URL.format(token=token))
    user_data = loads(user_request.read().decode('utf-8'))
    facebook_id = str(user_data['id'])
    user = CustomUser.get_by_facebook_id(facebook_id=facebook_id)
    if not user:
        first_name, last_name = user_data['name'].split()
        user = CustomUser.create(facebook_id=facebook_id, password=token,
                                 first_name=first_name, last_name=last_name)
    auth.login(request, user)
    return redirect('http://triptrck.com/')
