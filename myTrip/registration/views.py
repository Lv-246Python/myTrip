"""Contains views for registration app."""

from json import loads

from django.http import HttpResponse
from django.contrib import auth
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

from .models import CustomUser


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
        email = data["email"]
        password = data["password"]

        if not email or not password:
            return HttpResponse("Email and password must be set.", status=400)

        if not CustomUser.get_by_email(email):
            try:
                validate_email(email)
                CustomUser.create(email, password)
                return HttpResponse("User successfully created.", status=201)
            except ValidationError:
                return HttpResponse("This email is not valid format.", status=400)
        return HttpResponse("This email is already registered.", status=400)

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
        email = data["email"].lower()
        password = data["password"]

        user = auth.authenticate(username=email, password=password)
        if user:
            auth.login(request, user)
            return HttpResponse("Login successfull.", status=200)
        return HttpResponse('Email or password invalid', status=403)

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
            return HttpResponse("Logout successfull.", status=200)
        return HttpResponse("You're not logged in.", status=400)
