"""This registration app-module generates views for register and auth pages."""

from json import loads
from django.contrib import auth as authentication
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render

from .models import CustomUser


def auth(request):
    """Login page"""

    return render(request, '')

def logout(request):
    """Logout method"""

    authentication.logout(request)
    return redirect('')

def login(request):
    """Login method for authentication"""

    if request.method == 'POST':
        data = loads(request.body.decode('utf-8'))
        email = data.get('email').strip().lower()
        password = data.get('password').strip()

        user = authentication.authenticate(username=email, password=password)
        if user:
            authentication.login(request, user)
            return JsonResponse({'success': True, 'message': '/'})

        return HttpResponse('Email and/or password invalid', status=403)

    return HttpResponse(status=400)

def register(request):
    """Registration method for CustomUser registration"""

    if request.method == 'POST':
        json = {
            'error': {},
            'message': {},
            'success': False,
        }

        data = loads(request.body.decode('utf-8'))
        email = data.get('email')

        try:
            validate_email(email)
            try:
                CustomUser.objects.get(email=email)
                json['error'] = "This email is already registered."
            except CustomUser.DoesNotExist:
                user = CustomUser()
                user.email, user.first_name, user.last_name = email, data.get(
                    'firstName'), data.get('lastName')
                user.set_password(data.get('password'))

                user.save()
                json['success'] = True

        except ValidationError:
            json['error'] = "The email address you've entered is not valid"

        return JsonResponse(json)

    return render(request, '')
