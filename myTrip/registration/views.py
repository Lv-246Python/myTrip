"""This registration app-module generates views for register and auth pages."""

from json import loads
from django.contrib import auth as authentication
from django.http import HttpResponse

from .models import CustomUser


def register(request):
    """
    Registration method for CustomUser registration.
    Args:
        request: http request.
    Returns:
        If new user gets successfully registered - returns HttpResponse(201).
        If not - returns HttpResponse(406 or 400).
    """

    if request.method == 'POST':
        data = loads(request.body.decode('utf-8'))
        email = data["email"]
        password = data["password"]

        if CustomUser.get_by_email(email):
            CustomUser.create(email, password)
            return HttpResponse(status=201)
        return HttpResponse(status=406)

    return HttpResponse(status=400)


def login(request):
    """
    Login method for auth.
    Args:
        request: http request.
    Returns:
        If new user gets successfully logged in - returns HttpResponse(200).
        If not - returns HttpResponse(400).
    """

    if request.method == 'POST':
        data = loads(request.body.decode('utf-8'))
        email = data["email"].lower()
        password = data["password"]

        user = authentication.authenticate(username=email, password=password)
        if user is not None:
            authentication.login(request, user)
            return HttpResponse(status=200)

        return HttpResponse('Email or password invalid', status=403)

    return HttpResponse(status=400)
