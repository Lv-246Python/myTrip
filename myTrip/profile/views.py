"""Module generate view for photo requests."""

import json

from django.views.generic.base import View
from django.http import JsonResponse, HttpResponse

from registration.models import CustomUser
from .models import Profile


class ProfileView(View):
    """Class that handle HTTP requests."""

    def get(self, request, user_id=None):
        """GET request handler. Can return profile
         logged user or by given user_id."""
        if user_id:
            profile = Profile.get_by_id(user_id)
            return JsonResponse(profile.to_dict(), status=200)
        profile = Profile.get_by_id(request.user.id)
        if not profile:
            return HttpResponse(status=204)
        return JsonResponse(profile.to_dict(), status=200)

    def put(self, request):
        """PUT request handler. Select logged
         user profile and update it."""
        profile = Profile.get_by_id(request.user.id)
        if not profile:
            return HttpResponse(status=403)
        user = CustomUser.objects.get(id=request.user.id)
        update_data = json.loads(request.body.decode('utf-8'))
        user.update(first_name=update_data.get('first_name'),
                    last_name=update_data.get('last_name'))
        profile.update(
            avatar=update_data.get('avatar'),
            age=update_data.get('age'),
            gender=update_data.get('gender'),
            hobbies=update_data.get('hobbies'),
            facebook=update_data.get('facebook'),
            instagram=update_data.get('instagram'),
            google=update_data.get('google'))
        data = profile.to_dict()
        return JsonResponse(data, status=200)
