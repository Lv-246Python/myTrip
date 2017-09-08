"""Contains views for registration app."""

import uuid
from urllib.request import urlopen
from json import loads

import time
from django.shortcuts import redirect
from django.contrib import auth
from mytrip.settings import FACEBOOK_APP_ID as CLIENT_ID, \
    FACEBOOK_API_SECRET as CLIENT_SECRET, HOST, SECRET_KEY, JWT_ALGORITHM

from utils.mailer import email_sender
import jwt
from .models import CustomUser, HashUser
from .helper import *


FACEBOOK_TOKEN_URL = ("https://graph.facebook.com/v2.10/oauth/access_token?"
                      "client_id={client_id}&redirect_uri={redirect_uri}&"
                      "client_secret={client_secret}&code={code}")
FACEBOOK_USER_URL = 'https://graph.facebook.com/me?access_token={token}'
FACEBOOK_REDIRECT_URL = 'http://triptrck.com/api/v1/auth/facebook_login/'
FACEBOOK_AUTH_URL = ('https://www.facebook.com/v2.10/dialog/oauth?'
                     'client_id={client_id}&redirect_uri={redirect_uri}')

LOGIN_URL = HOST + 'login/'
MESSAGE_SUBJECT = 'tripTracker activation'

MESSAGE = """
    Hello, if you want to activate your account on TripTracker.com
    you need to click on this url:
        {url}
"""

RESTORE_PASS_URL = ("http://localhost:8000/restore-password/{token}/")


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

        user = CustomUser.create(email=email, password=password,
                                 first_name=first_name, last_name=last_name)
        if not user:
            return response_400_invalid_format
        hash = str(uuid.uuid4()).replace('-', '')
        HashUser.create(user, hash)
        link = LOGIN_URL + hash
        email_sender(subject=MESSAGE_SUBJECT,
                     message=MESSAGE.format(url=link),
                     to=email)
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
        if request.user.is_authenticated():
            auth.logout(request)
            response = response_200_logout_successful
            response.delete_cookie('user_id')
            return response
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

    code = request.GET.get('code')
    link = FACEBOOK_TOKEN_URL.format(
        client_id=CLIENT_ID,
        redirect_uri=FACEBOOK_REDIRECT_URL,
        client_secret=CLIENT_SECRET,
        code=code)
    token_request = urlopen(link)
    token = loads(token_request.read().decode('utf-8')).get('access_token')
    user_request = urlopen(FACEBOOK_USER_URL.format(token=token))
    user_data = loads(user_request.read().decode('utf-8'))
    facebook_id = str(user_data.get('id'))
    user = CustomUser.get_by_facebook_id(facebook_id=facebook_id)
    if not user:
        first_name, last_name = user_data.get('name').split()
        user = CustomUser.fb_create(facebook_id=facebook_id, password=token,
                                    first_name=first_name, last_name=last_name)
    auth.login(request, user)
    return redirect(HOST)


def activation(request):
    """Activation view activate user"""

    hash = request.GET.get('hash')
    if not hash:
        return HttpResponse(status=400)
    user = HashUser.get_user_by_hash(hash)
    if not user:
        return HttpResponse(status=400)
    user.activate()
    HashUser.objects.get(user=user).delete()
    return HttpResponse(status=200)


def restore(request, token=None):
    """Restore password"""

    if request.method == 'POST' and token:

        try:
            user_email = jwt.decode(token, SECRET_KEY, algorithms=[JWT_ALGORITHM])["email"]
        except jwt.ExpiredSignatureError:
            return HttpResponse('token lifetime expired', status=400)
        except jwt.InvalidTokenError:
            return HttpResponse('invalid token', status=400)

        user = CustomUser.get_by_email(user_email)
        data = loads(request.body.decode('utf-8'))
        password = data.get("password")
        if user:
            user.change_password(password)
            return HttpResponse(status=200)

    return HttpResponse(status=400)

def receive_email(request):
    """Receive email"""

    if request.method == 'POST':
        data = loads(request.body.decode('utf-8'))
        email = data.get("email").lower()
        user = CustomUser.get_by_email(email)
        if user:
            token_exp = time.time() + 60*15
            token = jwt.encode({'email': user.email,
                                'exp' : token_exp},
                               SECRET_KEY,
                               algorithm=JWT_ALGORITHM)
            email_sender(subject='restore password',
                         message=RESTORE_PASS_URL.format(token=token.decode("utf-8")),
                         to=email)
            return HttpResponse(status=200)
        return response_403_no_such_user
    return HttpResponse(status=400)
