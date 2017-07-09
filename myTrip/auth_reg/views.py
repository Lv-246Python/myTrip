"""This module contains views for Registration and Authentication."""
import json

from django.http import JsonResponse, HttpResponse
from django.contrib import auth
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.views.generic.base import View

from .models import CustomUser


class RegisterView(View):
    """
    .
    """

    def get(self, request):
        return JsonResponse(status=200)

    def post(self, request):
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
            json['error'] = "The email address you've entered has not a valid format"

        return JsonResponse(json)


class LoginView(View):
    """
    .
    """

    def get(self, request):
        return HttpResponse(status=400)

    def post(self, request):
        data = loads(request.body.decode('utf-8'))
        email = data.get('email').strip().lower()
        password = data.get('password').strip()
        user = auth.authenticate(username=username, password=password)

        if user:
            authentication.login(request, user)
            return JsonResponse({'success': True, 'message': '/'})

        return HttpResponse('Email and/or password invalid', status=403)
