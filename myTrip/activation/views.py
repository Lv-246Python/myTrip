""" This activation module generates view for user activation"""

from django.shortcuts import redirect
from django.http import HttpResponse
from .models import HashUser


def activation(request):
    """Activation view activate user"""

    hash = request.GET.get('hash')
    if not hash:
        return HttpResponse(status=400)
    HashUser.activate(hash)
    return redirect('http:/triptrck.com/login')