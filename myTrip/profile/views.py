"""This module contains Class Based View for profile application."""
import json
from django.http import HttpResponse, JsonResponse
from django.views.generic.base import View

from registration.models import CustomUser
from .models import Profile

class ProfileView(View):
    """Comments view handles GET, POST, PUT, DELETE requests."""

    def get(self, request, user_id):
        """Handles GET request"""
        if request.user.id == profile.user.id:
            profile = Profile.get_by_id(user_id)
            if profile:
                profile = profile.to_dict()
                return JsonResponse(profile, status=200, safe=False)
            return HttpResponse(status=404)

    def put(self, request, user_id):
        """Handles PUT request."""
        profile = Profile.get_by_id(user_id)
        if not profile:
            return HttpResponse(status=404)
        if request.user.id == profile.user.id:
            data = json.loads(request.body.decode('utf-8'))
            Profile.edit(data)
            return HttpResponse(status=200)
        return HttpResponse(status=403)

