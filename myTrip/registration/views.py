"""Contains views for registration app."""

from json import loads

from django.contrib import auth

from .models import CustomUser
from .helper import *


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

        CustomUser.create(email, password, first_name, last_name)
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
            return response_200_login_successful
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
